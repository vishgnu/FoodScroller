/**
 * The loop.
 *
 * Pure functions. No React import, no module-level mutable state, no clock,
 * no storage, no network. Everything depends only on its arguments, which is
 * what makes the three invariants unit-testable without a browser.
 *
 * The invariants (plan.md "Module contracts", progression-spec.md
 * "Reachability invariants"):
 *
 *   1. At least 40% of any 20 served posts fall OUTSIDE the affinity window.
 *      No tag can capture the feed.
 *   2. No artId repeats within 20 posts.
 *   3. After an engagement, at least 2 of the next 5 posts share a tag with
 *      the engaged post (SC-004, FR-010).
 *
 * Precedence when two of them cannot all be satisfied at once — stated here
 * because it is a real design decision and not an accident:
 *   invariant 1 (the floor) > invariant 3 (the response) > invariant 2
 *   (artId freshness, which relaxes its window before anything else gives).
 * The corpus is sized so the relaxation does not trigger in practice; the
 * tests assert that.
 */

import { CORPUS, type PostTemplate } from './corpus';
import { AFFINITY_WINDOW, type Post, type SessionState, type Tag } from './types';

/** The window the off-affinity floor is measured over. */
export const FLOOR_WINDOW = 20;
/** At least this many of any FLOOR_WINDOW served posts are off-affinity. */
export const FLOOR_MIN_OFF = 8; // 40% of 20
/** No artId may repeat inside this many posts. */
export const ART_REPEAT_WINDOW = 20;
/** An engagement must be answered inside this many posts... */
export const RESPONSE_WINDOW = 5;
/** ...by at least this many posts sharing a tag with the engaged post. */
export const RESPONSE_MIN = 2;

/** Nominal probability of serving an affinity match when free to choose. */
const ON_AFFINITY_P = 0.6;

/**
 * On-affinity budget inside the trailing FLOOR_WINDOW. A free choice stops
 * at FREE_ON_CAP so that two on-affinity slots are always held in reserve for
 * a response obligation; an obligation may spend up to OBLIGATION_ON_CAP.
 * Both leave at least FLOOR_MIN_OFF off-affinity posts in the window.
 */
const FREE_ON_CAP = FLOOR_WINDOW - FLOOR_MIN_OFF - 3; // 9
const OBLIGATION_ON_CAP = FLOOR_WINDOW - FLOOR_MIN_OFF - 1; // 11

/** How far the artId freshness window will relax before giving up on it. */
const ART_WINDOW_RELAXATION: readonly number[] = [ART_REPEAT_WINDOW, 12, 6, 0];

/**
 * One post as it was actually served, with the two facts about the moment of
 * serving that cannot be recovered afterwards: whether it was off-affinity,
 * and what the affinity window was. The generator needs both to hold its own
 * invariants, and the tests read them to check it did.
 */
export interface Served {
  post: Post;
  offAffinity: boolean;
  affinity: readonly Tag[];
}

export interface NextPostOptions {
  /** Per-session salt. Same seed + same history => same feed. */
  seed?: number;
  /** Absolute serve index, used for the post id. Defaults to history.length. */
  index?: number;
}

/* ------------------------------------------------------------------ rng */

function mix(n: number): number {
  let x = n | 0;
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
  x = x ^ (x >>> 16);
  return (x >>> 0) / 4294967296;
}

function rand(seed: number, index: number, salt: number): number {
  return mix(
    (Math.imul(seed | 0, 0x9e3779b1) ^
      Math.imul(index | 0, 0x85ebca6b) ^
      Math.imul(salt | 0, 0xc2b2ae35)) |
      0,
  );
}

/* -------------------------------------------------------------- helpers */

/** A post is off-affinity when it shares no tag at all with the window. */
export function isOffAffinity(
  tags: readonly Tag[],
  affinity: readonly Tag[],
): boolean {
  if (affinity.length === 0) return true;
  return !tags.some((tag) => affinity.includes(tag));
}

function sameAffinity(a: readonly Tag[], b: readonly Tag[]): boolean {
  return a.length === b.length && a.every((tag, i) => tag === b[i]);
}

function countOnAffinity(history: readonly Served[]): number {
  let on = 0;
  for (let i = Math.max(0, history.length - (FLOOR_WINDOW - 1)); i < history.length; i += 1) {
    const entry = history[i];
    if (entry && !entry.offAffinity) on += 1;
  }
  return on;
}

function recentArtIds(history: readonly Served[], window: number): ReadonlySet<string> {
  const ids = new Set<string>();
  for (let i = Math.max(0, history.length - window); i < history.length; i += 1) {
    const entry = history[i];
    if (entry) ids.add(entry.post.artId);
  }
  return ids;
}

/**
 * How many posts have been served since the affinity window last changed —
 * i.e. since the most recent engagement — and how many of them answered it.
 */
function responseProgress(
  history: readonly Served[],
  affinity: readonly Tag[],
  target: Tag,
): { since: number; matched: number } {
  let since = 0;
  let matched = 0;
  for (let i = history.length - 1; i >= 0; i -= 1) {
    const entry = history[i];
    if (!entry || !sameAffinity(entry.affinity, affinity)) break;
    since += 1;
    if (entry.post.tags.includes(target)) matched += 1;
  }
  return { since, matched };
}

function choose(
  pool: readonly PostTemplate[],
  history: readonly Served[],
  seed: number,
  index: number,
): PostTemplate | undefined {
  for (const window of ART_WINDOW_RELAXATION) {
    const blocked = recentArtIds(history, window);
    const fresh = pool.filter((template) => !blocked.has(template.artId));
    if (fresh.length > 0) {
      const pickIndex = Math.floor(rand(seed, index, window + 7) * fresh.length);
      return fresh[Math.min(pickIndex, fresh.length - 1)];
    }
  }
  return undefined;
}

function toPost(template: PostTemplate, index: number): Post {
  return {
    id: `post-${String(index)}`,
    artId: template.artId,
    tags: [...template.tags],
    handle: template.handle,
    caption: template.caption,
    sound: template.sound,
    baseLikes: template.baseLikes,
    sponsored: template.sponsored,
  };
}

/* ----------------------------------------------------------------- core */

/**
 * Serve the next post, together with the serve-time facts the next call and
 * the tests need. This is the real entry point; `nextPost` is the contract
 * wrapper around it.
 */
export function serveNext(
  state: SessionState,
  history: readonly Served[],
  options: NextPostOptions = {},
): Served {
  const seed = options.seed ?? 0;
  const index = options.index ?? history.length;
  const affinity = state.affinity;

  const onInWindow = countOnAffinity(history);
  const target = affinity.length > 0 ? affinity[affinity.length - 1] : undefined;

  // Invariant 3: is there an unanswered engagement, and how urgent is it?
  let obligation = false;
  if (target !== undefined) {
    const { since, matched } = responseProgress(history, affinity, target);
    obligation = since < RESPONSE_WINDOW && matched < RESPONSE_MIN;
  }

  // Invariant 1: the floor decides what is even allowed.
  const cap = obligation ? OBLIGATION_ON_CAP : FREE_ON_CAP;
  const onAllowed = affinity.length > 0 && onInWindow < cap;

  const wantOn =
    onAllowed && (obligation || rand(seed, index, 1) < ON_AFFINITY_P);

  let template: PostTemplate | undefined;

  if (wantOn && target !== undefined) {
    // Answer the engagement with its own tag first, then any affinity tag.
    template =
      choose(
        CORPUS.filter((t) => t.tags.includes(target)),
        history,
        seed,
        index,
      ) ??
      choose(
        CORPUS.filter((t) => !isOffAffinity(t.tags, affinity)),
        history,
        seed,
        index,
      );
  }

  if (!template) {
    template = choose(
      CORPUS.filter((t) => isOffAffinity(t.tags, affinity)),
      history,
      seed,
      index,
    );
  }

  // Last resort: the corpus is sized so this is unreachable, but a feed that
  // stalls is worse than a feed that repeats. FR-001 has no escape hatch.
  template ??= choose(CORPUS, history, seed, index) ?? CORPUS[0];

  /* c8 ignore next */
  if (!template) throw new Error('corpus is empty');

  const post = toPost(template, index);
  return {
    post,
    offAffinity: isOffAffinity(post.tags, affinity),
    affinity: [...affinity],
  };
}

/**
 * The module contract: `nextPost(state, history): Post`.
 * Deterministic in its arguments.
 */
export function nextPost(
  state: SessionState,
  history: readonly Served[],
  options?: NextPostOptions,
): Post {
  return serveNext(state, history, options).post;
}

/* -------------------------------------------------------- state changes */

export const INITIAL_STATE: SessionState = {
  seen: 0,
  engaged: new Set<string>(),
  affinity: [],
};

/**
 * Toggle the engagement on a post. A second tap un-engages rather than
 * double-counting (spec Story 2 scenario 3); un-engaging does not rewrite the
 * affinity window, because that window is a record of what was recently
 * engaged, not a running total (progression-spec.md).
 */
export function toggleEngagement(state: SessionState, post: Post): SessionState {
  const engaged = new Set(state.engaged);
  if (engaged.has(post.id)) {
    engaged.delete(post.id);
    return { ...state, engaged };
  }
  engaged.add(post.id);
  const primary = post.tags[0];
  const affinity =
    primary === undefined
      ? state.affinity
      : [...state.affinity, primary].slice(-AFFINITY_WINDOW);
  return { ...state, engaged, affinity };
}

/** `seen` is how many posts have passed. It steers nothing in phase 1. */
export function markSeen(state: SessionState, seen: number): SessionState {
  return seen > state.seen ? { ...state, seen } : state;
}

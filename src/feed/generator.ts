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
 * On-affinity budget inside the trailing FLOOR_WINDOW. A free choice stops at
 * FREE_ON_CAP so that on-affinity slots are always held in reserve for a
 * response obligation; an obligation may spend up to OBLIGATION_ON_CAP. Both
 * leave at least FLOOR_MIN_OFF off-affinity posts in the window, which is how
 * invariant 1 is a guarantee rather than a tendency.
 *
 * Pool depth note: OBLIGATION_ON_CAP + 1 is the most on-affinity posts that
 * can appear in any 20, so every tag needs at least that many templates in
 * the corpus or invariant 2 has to start relaxing its window. The corpus
 * carries 12 per tag for exactly this reason.
 */
const FREE_ON_CAP = FLOOR_WINDOW - FLOOR_MIN_OFF - 5; // 7
const OBLIGATION_ON_CAP = FLOOR_WINDOW - FLOOR_MIN_OFF; // 12

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
  /** The engaged set as it stood when this post was served. */
  engaged: ReadonlySet<string>;
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

/**
 * An engagement still waiting to be answered: `tags` are the engaged post's
 * own tags, `needed` is how many more matching posts it wants, and
 * `slotsLeft` counts the serves still inside its five-post window, this one
 * included. `slotsLeft - needed` is its slack; at zero it must be answered now.
 */
interface Obligation {
  tags: readonly Tag[];
  needed: number;
  slotsLeft: number;
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

function postById(history: readonly Served[], id: string): Post | undefined {
  for (let i = history.length - 1; i >= 0; i -= 1) {
    const entry = history[i];
    if (entry?.post.id === id) return entry.post;
  }
  return undefined;
}

/**
 * Reconstruct every engagement still inside its response window, purely from
 * the serve-time snapshots in the history. A tap is visible as an id that was
 * not in the engaged set at the previous serve and is at the next one — which
 * is exact even when the player scrolled back to tap an older post, and even
 * when the affinity window happens to come out unchanged.
 *
 * Nothing extra is stored to make this work: the obligation is *derived*, not
 * recorded, so the state vocabulary in docs/progression-spec.md stays
 * exhaustive.
 *
 * Engagements overlap — a player tapping often has several windows open at
 * once — and a post carrying two tags can answer two of them.
 */
function outstandingObligations(
  history: readonly Served[],
  state: SessionState,
): Obligation[] {
  const now = history.length;
  const obligations: Obligation[] = [];

  for (let b = Math.max(0, now - RESPONSE_WINDOW + 1); b <= now; b += 1) {
    const at = b === now ? state.engaged : history[b]?.engaged;
    if (!at) continue;
    const before = b === 0 ? undefined : history[b - 1]?.engaged;

    for (const id of at) {
      if (before?.has(id) === true) continue;
      if (b === 0 && before === undefined) break; // nothing was served yet
      const post = postById(history, id);
      if (!post) continue;

      let matched = 0;
      for (let i = b; i < now; i += 1) {
        const entry = history[i];
        if (entry?.post.tags.some((tag) => post.tags.includes(tag)) === true) matched += 1;
      }

      const needed = RESPONSE_MIN - matched;
      const slotsLeft = b + RESPONSE_WINDOW - now;
      if (needed > 0 && slotsLeft > 0) {
        obligations.push({ tags: post.tags, needed, slotsLeft });
      }
    }
  }

  return obligations;
}

/** How much a template would do for the outstanding obligations. */
function obligationScore(
  template: PostTemplate,
  obligations: readonly Obligation[],
): number {
  let score = 0;
  for (const obligation of obligations) {
    if (!template.tags.some((tag) => obligation.tags.includes(tag))) continue;
    const slack = obligation.slotsLeft - obligation.needed;
    score += slack <= 0 ? 100 : Math.max(1, 10 - slack);
  }
  return score;
}

/**
 * Pick from `pool`, artId freshness first and score second: the freshest
 * window that has any candidate at all is the one that gets to choose, so
 * invariant 2 only ever gives ground after everything else has.
 */
function choose(
  pool: readonly PostTemplate[],
  history: readonly Served[],
  seed: number,
  index: number,
  score: (template: PostTemplate) => number = () => 0,
): PostTemplate | undefined {
  for (const window of ART_WINDOW_RELAXATION) {
    const blocked = recentArtIds(history, window);
    const fresh = pool.filter((template) => !blocked.has(template.artId));
    if (fresh.length === 0) continue;

    let best = -Infinity;
    for (const template of fresh) best = Math.max(best, score(template));
    const top = fresh.filter((template) => score(template) === best);

    const pickIndex = Math.floor(rand(seed, index, window + 7) * top.length);
    return top[Math.min(pickIndex, top.length - 1)];
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
  const obligations = outstandingObligations(history, state);

  // Invariant 1 decides what is even allowed; invariant 3 decides what is
  // wanted inside that. An obligation can often be answered by an
  // off-affinity post — the engaged post's second tag need not be in the
  // affinity window — so the two pull against each other far less than they
  // look like they should.
  // The tighter the deadline, the more of the on-affinity budget the
  // obligation may spend. Holding the last slots back for urgent responses is
  // what stops a relaxed one from eating the budget a critical one will need.
  let cap = FREE_ON_CAP;
  if (obligations.length > 0) {
    let minSlack = Infinity;
    for (const o of obligations) minSlack = Math.min(minSlack, o.slotsLeft - o.needed);
    cap = OBLIGATION_ON_CAP - Math.max(0, Math.min(3, minSlack));
  }
  const onAllowed = affinity.length > 0 && onInWindow < cap;

  const offPool = CORPUS.filter((t) => isOffAffinity(t.tags, affinity));
  const onPool = CORPUS.filter((t) => !isOffAffinity(t.tags, affinity));

  let template: PostTemplate | undefined;

  if (obligations.length > 0) {
    // Answer the taps first, from whichever half of the corpus the floor
    // still allows.
    // Among templates that answer the same obligations, take the one that
    // does NOT spend on-affinity budget: an engaged post's second tag often
    // lives outside the affinity window, so the response and the floor can
    // both be paid out of the same post.
    template = choose(
      onAllowed ? CORPUS : offPool,
      history,
      seed,
      index,
      (t) =>
        obligationScore(t, obligations) * 4 +
        (isOffAffinity(t.tags, affinity) ? 1 : 0),
    );
  } else if (onAllowed && rand(seed, index, 1) < ON_AFFINITY_P) {
    template = choose(onPool, history, seed, index);
  }

  template ??= choose(offPool, history, seed, index);

  // Last resort: the corpus is sized so this is unreachable, but a feed that
  // stalls is worse than a feed that repeats. FR-001 has no escape hatch.
  template ??= choose(CORPUS, history, seed, index) ?? CORPUS[0];

  if (!template) throw new Error('corpus is empty');

  const post = toPost(template, index);
  return {
    post,
    offAffinity: isOffAffinity(post.tags, affinity),
    affinity: [...affinity],
    engaged: state.engaged,
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

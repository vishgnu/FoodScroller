/**
 * The three generator invariants, proved without a browser.
 *
 *   1. 40% off-affinity floor over any 20-post window.
 *   2. No artId repeat within 20 posts.
 *   3. At least 2 of the next 5 posts share a tag after an engagement.
 *
 * Owned by `engineer` for phase 1; `tester` owns tests from here on.
 */

import { describe, expect, it } from 'vitest';
import { CORPUS } from '../src/feed/corpus';
import {
  ART_REPEAT_WINDOW,
  FLOOR_MIN_OFF,
  FLOOR_WINDOW,
  INITIAL_STATE,
  RESPONSE_MIN,
  RESPONSE_WINDOW,
  isOffAffinity,
  nextPost,
  serveNext,
  toggleEngagement,
  type Served,
} from '../src/feed/generator';
import { AFFINITY_WINDOW, type Post, type SessionState } from '../src/feed/types';

interface Run {
  served: Served[];
  /** For each engagement: the post engaged and the serve index it happened at. */
  engagements: { post: Post; atIndex: number }[];
}

/** Deterministic 0..1 stream, so a failing run is always reproducible. */
function stream(seed: number): () => number {
  let s = (seed | 0) || 1;
  return () => {
    s = (Math.imul(s, 1103515245) + 12345) | 0;
    return ((s >>> 0) % 1_000_000) / 1_000_000;
  };
}

/**
 * Walk the feed exactly the way the app does: serve a post, then let the
 * policy decide whether the player taps it before the next post is served.
 */
function simulate(
  count: number,
  seed: number,
  policy: (index: number, roll: number) => 'none' | 'engage' | 'engage-older',
): Run {
  const roll = stream(seed + 991);
  let state: SessionState = INITIAL_STATE;
  const served: Served[] = [];
  const engagements: { post: Post; atIndex: number }[] = [];

  for (let i = 0; i < count; i += 1) {
    const entry = serveNext(state, served, { seed, index: i });
    served.push(entry);

    const action = policy(i, roll());
    if (action === 'none') continue;

    // 'engage-older' models the player scrolling back and tapping a post that
    // is no longer the newest one.
    const target =
      action === 'engage-older' && served.length > 4
        ? served[served.length - 4]
        : entry;
    if (!target || state.engaged.has(target.post.id)) continue;

    state = toggleEngagement(state, target.post);
    engagements.push({ post: target.post, atIndex: served.length - 1 });
  }

  return { served, engagements };
}

const POLICIES: {
  name: string;
  policy: (index: number, roll: number) => 'none' | 'engage' | 'engage-older';
}[] = [
  { name: 'never engages', policy: () => 'none' },
  { name: 'engages every post', policy: () => 'engage' },
  { name: 'engages ~30% of posts', policy: (_i, r) => (r < 0.3 ? 'engage' : 'none') },
  { name: 'engages every 7th post', policy: (i) => (i % 7 === 0 ? 'engage' : 'none') },
  {
    name: 'engages, sometimes scrolling back',
    policy: (_i, r) => (r < 0.15 ? 'engage-older' : r < 0.45 ? 'engage' : 'none'),
  },
];

const SEEDS = [0, 1, 7, 42, 1337, 20_260_921];

describe('corpus', () => {
  it('has enough distinct artIds for the no-repeat window', () => {
    const ids = new Set(CORPUS.map((t) => t.artId));
    expect(ids.size).toBe(CORPUS.length);
    expect(ids.size).toBeGreaterThan(ART_REPEAT_WINDOW);
  });

  it('is visibly placeholder copy (FR-005)', () => {
    for (const template of CORPUS) {
      expect(template.caption.startsWith('[PLACEHOLDER]')).toBe(true);
      expect(template.handle.startsWith('@placeholder.')).toBe(true);
      expect(template.sound.startsWith('PLACEHOLDER audio ·')).toBe(true);
    }
  });
});

describe('invariant 1 — 40% off-affinity floor over any 20-post window', () => {
  for (const { name, policy } of POLICIES) {
    for (const seed of SEEDS) {
      it(`holds for 600 posts (${name}, seed ${String(seed)})`, () => {
        const { served } = simulate(600, seed, policy);
        for (let end = FLOOR_WINDOW; end <= served.length; end += 1) {
          const window = served.slice(end - FLOOR_WINDOW, end);
          const off = window.filter((entry) => entry.offAffinity).length;
          expect(off, `window ending at ${String(end)}`).toBeGreaterThanOrEqual(
            FLOOR_MIN_OFF,
          );
        }
      });
    }
  }

  it('is not satisfied trivially — the feed does serve affinity matches', () => {
    const { served } = simulate(600, 42, () => 'engage');
    const on = served.filter((entry) => !entry.offAffinity).length;
    expect(on).toBeGreaterThan(120);
  });
});

describe('invariant 2 — no artId repeat within 20 posts', () => {
  for (const { name, policy } of POLICIES) {
    for (const seed of SEEDS) {
      it(`holds for 600 posts (${name}, seed ${String(seed)})`, () => {
        const { served } = simulate(600, seed, policy);
        for (let i = 0; i < served.length; i += 1) {
          const current = served[i]?.post.artId;
          const before = served
            .slice(Math.max(0, i - ART_REPEAT_WINDOW), i)
            .map((entry) => entry.post.artId);
          expect(before, `at post ${String(i)}`).not.toContain(current);
        }
      });
    }
  }
});

describe('invariant 3 — at least 2 of the next 5 posts share a tag after an engagement', () => {
  for (const { name, policy } of POLICIES) {
    if (name === 'never engages') continue;
    for (const seed of SEEDS) {
      it(`holds for 600 posts (${name}, seed ${String(seed)})`, () => {
        const { served, engagements } = simulate(600, seed, policy);
        expect(engagements.length).toBeGreaterThan(0);

        for (const { post, atIndex } of engagements) {
          const next = served.slice(atIndex + 1, atIndex + 1 + RESPONSE_WINDOW);
          if (next.length < RESPONSE_WINDOW) continue; // ran off the end of the run
          const shared = next.filter((entry) =>
            entry.post.tags.some((tag) => post.tags.includes(tag)),
          ).length;
          expect(
            shared,
            `engagement on ${post.id} (${post.tags.join('/')}) at ${String(atIndex)}`,
          ).toBeGreaterThanOrEqual(RESPONSE_MIN);
        }
      });
    }
  }
});

describe('purity and state vocabulary', () => {
  it('nextPost is deterministic in its arguments', () => {
    const a = nextPost(INITIAL_STATE, [], { seed: 5, index: 3 });
    const b = nextPost(INITIAL_STATE, [], { seed: 5, index: 3 });
    expect(a).toEqual(b);
  });

  it('different seeds produce different feeds', () => {
    const a = simulate(40, 1, () => 'none').served.map((e) => e.post.artId);
    const b = simulate(40, 2, () => 'none').served.map((e) => e.post.artId);
    expect(a).not.toEqual(b);
  });

  it('a feed that was engaged with differs from one that was not (SC-005)', () => {
    const quiet = simulate(60, 42, () => 'none').served.map((e) => e.post.artId);
    const loud = simulate(60, 42, (i) => (i % 5 === 0 ? 'engage' : 'none')).served.map(
      (e) => e.post.artId,
    );
    expect(loud).not.toEqual(quiet);
  });

  it('every served post id is unique (FR-012 identity)', () => {
    const { served } = simulate(400, 7, (_i, r) => (r < 0.4 ? 'engage' : 'none'));
    const ids = new Set(served.map((e) => e.post.id));
    expect(ids.size).toBe(served.length);
  });

  it('affinity is a FIFO window of at most 5 primary tags', () => {
    let state: SessionState = INITIAL_STATE;
    const { served } = simulate(30, 3, () => 'none');
    for (const entry of served) {
      state = toggleEngagement(state, entry.post);
      expect(state.affinity.length).toBeLessThanOrEqual(AFFINITY_WINDOW);
    }
    const tail = served.slice(-AFFINITY_WINDOW).map((e) => e.post.tags[0]);
    expect([...state.affinity]).toEqual(tail);
  });

  it('a second tap un-engages rather than double-counting (Story 2 scenario 3)', () => {
    const first = serveNext(INITIAL_STATE, [], { seed: 1 });
    const engaged = toggleEngagement(INITIAL_STATE, first.post);
    expect(engaged.engaged.has(first.post.id)).toBe(true);
    const undone = toggleEngagement(engaged, first.post);
    expect(undone.engaged.has(first.post.id)).toBe(false);
    expect(undone.affinity).toEqual(engaged.affinity);
  });

  it('off-affinity means sharing no tag at all with the window', () => {
    expect(isOffAffinity(['noodles'], [])).toBe(true);
    expect(isOffAffinity(['noodles', 'cursed'], ['cursed'])).toBe(false);
    expect(isOffAffinity(['noodles'], ['cheese', 'dessert'])).toBe(true);
  });
});

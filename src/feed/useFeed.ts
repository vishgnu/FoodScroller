/**
 * The feed's runtime state. The only stateful thing in the app.
 *
 * All of it lives in memory for this tab and this visit. Nothing is written
 * to localStorage, sessionStorage, IndexedDB, cookies, or the network —
 * FR-008 is absolute, and there is deliberately no code here that could.
 */

import { useCallback, useMemo, useRef, useState } from 'react';
import {
  INITIAL_STATE,
  markSeen,
  serveNext,
  toggleEngagement,
  type Served,
} from './generator';
import type { Post, SessionState } from './types';

/**
 * How many posts are kept at once (FR-013). Dropping from the front is what
 * stops a long session degrading; 200 is far past any session the success
 * criteria measure, so in practice nothing is ever released.
 */
export const RETAINED = 200;

/**
 * How far ahead of the active post the feed is generated — the headroom a
 * fling has.
 *
 * The scroll range *is* the generated range, so running out of it clamps the
 * scroll at `scrollHeight - clientHeight`: the momentum is gone and the feed
 * arrests at the generated bottom (issue #9). Growing inside the scroll
 * handler cannot rescue that, because the browser clamps as it applies the
 * scroll, which is before any handler of ours runs. The headroom has to
 * already be there, which is why it is grown ahead of the scroll instead —
 * at mount, on resize, and on every post the player passes.
 *
 * It is sized in pixels rather than posts, because a fling is a pixel
 * quantity and a post is one viewport: the same 40-notch wheel burst
 * (~9,600px) is 12 posts on a 844px-tall phone and 32 on a 300px-tall
 * landscape one. The budget is twice the burst that filed the defect.
 *
 * The lookahead is spent out of RETAINED, so every post of headroom is a
 * post the player can no longer scroll back to: 175 posts of history at
 * 844px tall, 132 at the shortest viewport. Both are far past anything the
 * success criteria measure.
 */
export const FLING_HEADROOM_PX = 20_000;
/** Floor, for a viewport tall enough that the pixel budget asks for less. */
export const LOOKAHEAD_MIN = 16;
/** Ceiling, so the shortest viewport cannot eat the retained history. */
export const LOOKAHEAD_MAX = 72;

/** Posts of headroom for a viewport this many CSS pixels tall. */
export function lookaheadFor(viewport: number): number {
  if (!(viewport > 0)) return LOOKAHEAD_MIN;
  const posts = Math.ceil(FLING_HEADROOM_PX / viewport);
  return Math.min(LOOKAHEAD_MAX, Math.max(LOOKAHEAD_MIN, posts));
}

/** Rendered window: active ± this. Everything else is a gap in the spacer. */
export const RENDER_RADIUS = 3;

interface FeedState {
  /** The retained posts. `served[0]` is absolute index `released`. */
  served: Served[];
  /** How many posts have been released from the front. */
  released: number;
  session: SessionState;
  /** Absolute index of the post filling the viewport. */
  active: number;
  /** Posts of headroom to keep ahead of `active`, sized for the viewport. */
  lookahead: number;
}

function grow(state: FeedState, seed: number): FeedState {
  const wanted = state.active + state.lookahead;
  if (state.released + state.served.length > wanted) return state;

  const served = [...state.served];
  let released = state.released;

  while (released + served.length <= wanted) {
    served.push(
      serveNext(state.session, served, { seed, index: released + served.length }),
    );
  }

  if (served.length > RETAINED) {
    released += served.length - RETAINED;
    served.splice(0, served.length - RETAINED);
  }

  return { ...state, served, released };
}

export interface FeedView {
  /** Absolute number of posts that exist so far. The list is this tall. */
  total: number;
  /** Absolute index of the first retained post. */
  released: number;
  active: number;
  engaged: ReadonlySet<string>;
  /** The post at an absolute index, or undefined if it has been released. */
  at: (index: number) => Post | undefined;
  /**
   * The post filling the viewport, and how tall that viewport is. The height
   * is what sizes the lookahead, so passing it on mount and on resize is how
   * the headroom exists before the first fling rather than after it.
   */
  setActive: (index: number, viewport: number) => void;
  toggle: (post: Post) => void;
}

export function useFeed(): FeedView {
  // One salt per visit, so two people do not get a byte-identical feed. It is
  // a constant, not player state: nothing reads it back and nothing stores it.
  const seed = useRef(Math.floor(Math.random() * 0x7fffffff)).current;

  const [state, setState] = useState<FeedState>(() =>
    grow(
      {
        served: [],
        released: 0,
        session: INITIAL_STATE,
        active: 0,
        lookahead: LOOKAHEAD_MIN,
      },
      seed,
    ),
  );

  const setActive = useCallback(
    (index: number, viewport: number) => {
      setState((previous) => {
        const lookahead = lookaheadFor(viewport);
        // Nothing moved and the viewport is the same size: grow() alone,
        // which returns the state it was given when there is nothing to add,
        // so an unchanged feed does not re-render.
        if (index === previous.active && lookahead === previous.lookahead) {
          return grow(previous, seed);
        }
        return grow(
          {
            ...previous,
            active: index,
            lookahead,
            session:
              index === previous.active
                ? previous.session
                : markSeen(previous.session, index + 1),
          },
          seed,
        );
      });
    },
    [seed],
  );

  const toggle = useCallback(
    (post: Post) => {
      setState((previous) => {
        const session = toggleEngagement(previous.session, post);

        // The queued posts the player has not reached yet are discarded and
        // served again under the new affinity. Without this the answer to a
        // tap would arrive only after the existing lookahead had gone by,
        // which is well past the five posts SC-004 allows.
        //
        // The cut is at the furthest post the player has actually reached,
        // not at the one they tapped: FR-012 says a post that has been seen
        // is the same post when scrolled back to, and that outranks
        // answering a tap made on a post they had already scrolled past.
        const frontier = Math.max(previous.active, previous.session.seen - 1);
        const keep = Math.max(0, frontier - previous.released + 1);
        const served = previous.served.slice(0, keep);

        return grow({ ...previous, session, served }, seed);
      });
    },
    [seed],
  );

  const at = useCallback(
    (index: number): Post | undefined =>
      state.served[index - state.released]?.post,
    [state.served, state.released],
  );

  return useMemo(
    () => ({
      total: state.released + state.served.length,
      released: state.released,
      active: state.active,
      engaged: state.session.engaged,
      at,
      setActive,
      toggle,
    }),
    [state, at, setActive, toggle],
  );
}

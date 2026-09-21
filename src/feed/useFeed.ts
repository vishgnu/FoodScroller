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
 * How far ahead of the active post the feed is generated. Two forces set it:
 * too small and a fling finds nothing there, too large and an engagement
 * cannot be answered inside five posts because five posts already exist.
 */
const LOOKAHEAD = 8;

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
}

function grow(state: FeedState, seed: number): FeedState {
  const wanted = state.active + LOOKAHEAD;
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
  setActive: (index: number) => void;
  toggle: (post: Post) => void;
}

export function useFeed(): FeedView {
  // One salt per visit, so two people do not get a byte-identical feed. It is
  // a constant, not player state: nothing reads it back and nothing stores it.
  const seed = useRef(Math.floor(Math.random() * 0x7fffffff)).current;

  const [state, setState] = useState<FeedState>(() =>
    grow({ served: [], released: 0, session: INITIAL_STATE, active: 0 }, seed),
  );

  const setActive = useCallback(
    (index: number) => {
      setState((previous) => {
        if (index === previous.active) return previous;
        return grow(
          {
            ...previous,
            active: index,
            session: markSeen(previous.session, index + 1),
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

/**
 * The schema every other lane writes content against.
 *
 * Shapes here are the module contract in
 * `specs/001-endless-food-feed/plan.md` — changing one is a breaking change
 * for `writer` and `graphics`, not an implementation detail.
 */

import type { ArtId } from '../assets/index';

export type Tag =
  | 'noodles'
  | 'cheese'
  | 'dessert'
  | 'cursed'
  | 'healthy'
  | 'meat'
  | 'drink'
  | 'breakfast';

/** Every tag, in a fixed order. Used by the generator to build its pools. */
export const TAGS: readonly Tag[] = [
  'noodles',
  'cheese',
  'dessert',
  'cursed',
  'healthy',
  'meat',
  'drink',
  'breakfast',
];

export interface Post {
  /** Unique per served post, stable while retained. */
  id: string;
  /** Key into the art registry owned by `graphics`. */
  artId: ArtId;
  /** At least one; tags[0] is primary. */
  tags: Tag[];
  /** Fictional creator handle, PLACEHOLDER. */
  handle: string;
  /** PLACEHOLDER copy. */
  caption: string;
  /** Fictional audio credit line, PLACEHOLDER. */
  sound: string;
  /** Inflated social proof — displayed, never simulated. */
  baseLikes: number;
  /** Renders the `zest` treatment. */
  sponsored: boolean;
}

/**
 * The whole state vocabulary (docs/progression-spec.md, "The state
 * vocabulary"). It is exhaustive: state not listed there does not exist.
 * Nothing here is ever written to localStorage, sessionStorage, IndexedDB,
 * cookies, or the network. FR-008 is absolute.
 */
export interface SessionState {
  /** How many posts have passed. Recorded; changes nothing in phase 1. */
  seen: number;
  /** Post ids the player has engaged with. */
  engaged: ReadonlySet<string>;
  /** Last 5 engaged primary tags, FIFO. The only state that steers the feed. */
  affinity: readonly Tag[];
}

/** The affinity window length. Older engagements fall out entirely. */
export const AFFINITY_WINDOW = 5;

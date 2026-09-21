/**
 * The art registry. Owned by the `graphics` lane — `engineer` does not edit
 * this file once `graphics` is in play.
 *
 * Contract (specs/001-endless-food-feed/plan.md):
 *
 *   export type ArtId = string;
 *   export interface ArtEntry { id: ArtId; tags: Tag[]; Component: React.FC }
 *   export const ART: readonly ArtEntry[];
 *
 * Each illustration is 9:16, viewBox `0 0 1080 1920`, draws only palette
 * tokens, and contains no text at all.
 *
 * `id` matches an `artId` in `src/feed/corpus.ts`. An artId with no entry here
 * renders the neutral stand-in field in `src/components/PostCard.tsx`
 * instead — that is a supported state (FR-003, spec Story 4 scenario 3), so
 * `graphics` can land illustrations one at a time without breaking the feed.
 *
 * Phase 1 ships THREE placeholders so the app builds and runs. They are
 * deliberately crude. Replacing them is the `graphics` lane's first job.
 */

import type { FC } from 'react';
import type { Tag } from '../feed/types';
import { ColdGlass } from './posts/ColdGlass';
import { MeltedSlab } from './posts/MeltedSlab';
import { StackedBowl } from './posts/StackedBowl';

export type ArtId = string;

export interface ArtEntry {
  id: ArtId;
  tags: Tag[];
  Component: FC;
}

export const ART: readonly ArtEntry[] = [
  // PLACEHOLDER — graphics lane replaces this.
  { id: 'noodle-tower', tags: ['noodles'], Component: StackedBowl },
  // PLACEHOLDER — graphics lane replaces this.
  { id: 'cheese-pull', tags: ['cheese'], Component: MeltedSlab },
  // PLACEHOLDER — graphics lane replaces this.
  { id: 'layered-drink', tags: ['drink'], Component: ColdGlass },
];

const BY_ID = new Map(ART.map((entry) => [entry.id, entry]));

/** The registered illustration for an artId, or undefined if none is authored yet. */
export function artFor(id: ArtId): ArtEntry | undefined {
  return BY_ID.get(id);
}

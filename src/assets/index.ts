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
 * `id` matches an `artId` in `src/feed/corpus.ts`. An artId with no entry
 * here renders the neutral stand-in field in `src/components/PostCard.tsx`
 * instead. That path is still supported — it is what lets a future artId
 * land before its art does — but nothing reaches it any more: all 81 artIds
 * in the corpus are registered below.
 *
 * The three crude phase-1 placeholders are gone. Nothing is hand-drawn
 * per post: every entry is a recipe in `art/recipes.ts` composed by
 * `art/Composition.tsx` out of a vessel, a food form, garnishes, a field
 * treatment and a palette pair. See `art/recipes.ts` for why that is a
 * table and not 81 files.
 *
 * Style-guide version: docs/art-style-guide.md v1 "Doomfeed".
 */

import { createElement, type FC } from 'react';
import type { Tag } from '../feed/types';
import { Composition } from './art/Composition';
import { RECIPES } from './art/recipes';

export type ArtId = string;

export interface ArtEntry {
  id: ArtId;
  tags: Tag[];
  Component: FC;
}

export const ART: readonly ArtEntry[] = RECIPES.map((recipe) => ({
  id: recipe.id,
  tags: recipe.tags,
  Component: (() => createElement(Composition, { r: recipe })) as FC,
}));

const BY_ID = new Map(ART.map((entry) => [entry.id, entry]));

/** The registered illustration for an artId, or undefined if none is authored yet. */
export function artFor(id: ArtId): ArtEntry | undefined {
  return BY_ID.get(id);
}

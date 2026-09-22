/**
 * Playtest mode — strips the placeholder markers without removing them.
 *
 * FR-005 requires post copy to be visibly identifiable as placeholder, so
 * unfinished writing is never mistaken for finished and the missing `writer`
 * lane (#2) stays visible instead of quietly becoming permanent. That marker
 * is right for every reader of this repository.
 *
 * It is wrong for exactly one audience: a playtester. SC-006 measures whether
 * the feed pulls a player forward, and "[PLACEHOLDER]" on every caption
 * breaks the immersion that criterion exists to measure — we would be reading
 * the pull with a handbrake on, and blaming the game for our own bookkeeping.
 *
 * So the markers stay in `corpus.ts`, which is the source of truth, and are
 * stripped at render time only when the build explicitly asks:
 *
 *     npm run playtest
 *
 * `npm run dev` and `npm run build` are unaffected and still show them.
 */

export const PLAYTEST = import.meta.env.VITE_PLAYTEST === '1';

const MARKERS: readonly RegExp[] = [
  /^\[PLACEHOLDER\]\s*/,
  /^PLACEHOLDER audio · /,
];

/**
 * The string as a player should see it. Identity outside playtest mode, so
 * the default build cannot lose its markers by accident.
 */
export function display(text: string): string {
  if (!PLAYTEST) return text;
  let out = text;
  for (const marker of MARKERS) out = out.replace(marker, '');
  return out.replace(/^@placeholder\./, '@');
}

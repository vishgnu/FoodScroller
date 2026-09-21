/**
 * The eight palette tokens, as the art layer is allowed to see them.
 *
 * `pulse` is deliberately absent from this type. It is reserved for the
 * engagement action (docs/art-style-guide.md, palette + anchor 6), so an
 * illustration cannot name it even by accident — the compiler refuses.
 *
 * No colour literal appears here or anywhere else under `src/assets/`.
 * Every fill and stroke resolves through `var(--token)` to
 * `src/styles/tokens.css`, which is the only file that holds a hex.
 */

/** The seven tokens an illustration may draw with. */
export type Token = 'void' | 'surface' | 'ink' | 'muted' | 'zest' | 'mint' | 'grape';

/** A token as a CSS value. The only way this module emits a colour. */
export function c(token: Token): string {
  return `var(--${token})`;
}

/**
 * The single shading step (anchor 3). One light source, top-left at 45°, so
 * every form carries exactly one shadow, always `void`, always at this
 * opacity, always on the lower-right. There is no second step and no
 * highlight — a highlight would be a second step.
 */
export const SHADE = 0.26;

/**
 * Stroke weight (anchor 2). 2px on the 24px icon grid, scaled to this canvas
 * by the ratio the phone actually renders at (1080 units across ≈ 475px at
 * 390px wide), never optically adjusted per shape. One value, everywhere.
 */
export const STROKE = 5;

/**
 * Corner radii (anchor 4). 8, 16, 24. Nothing between, nothing outside.
 */
export const R_CHIP = 8;
export const R_CARD = 16;
export const R_SHEET = 24;

/** Canvas. 9:16 at the authored intrinsic size. */
export const W = 1080;
export const H = 1920;

/**
 * Where the subject sits. Chosen against the gameplay crop, not the
 * authoring canvas: at 390×844 with `slice` and the media drift at its
 * widest, only x ∈ [133, 947] is on screen, the action rail covers x > 842
 * and the caption stack covers x < 404, y > 1254. The subject box below
 * clears both (art guide, "Environments and backgrounds", foreground rule).
 */
export const SUBJECT_X = 480;
export const SUBJECT_Y = 810;

/** Half-extent of the subject box in local coordinates. */
export const REACH = 330;

/**
 * Global subject zoom. The feed is meant to be loud and full-bleed, and a
 * subject authored to fit the 1080-wide canvas reads small once the phone
 * crops it to 887 units, so this pushes it back out to the edge of what the
 * quiet zones allow.
 *
 * With the anchor at 480 it puts the subject's usable local range at
 * x ∈ [-340, 324]: the right bound is where the action rail starts and is a
 * legibility limit, measured rather than guessed; the left bound is only a
 * crop limit at the drift's widest, so it is the looser of the two.
 */
export const ZOOM = 1.08;

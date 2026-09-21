/**
 * The composer. One illustration = one field treatment + one subject, and
 * the subject = one vessel × one food form × up to two garnishes × one
 * palette pair. 81 recipes, 81 compositions, no hand-drawn files.
 *
 * Exactly two layers, marked in the markup so the rule is checkable rather
 * than asserted: `data-layer="field"` and `data-layer="subject"`
 * (art guide, "Environments and backgrounds"; anchor 5).
 *
 * Everything inside is a palette token via `var(--…)`. No hex, no text, no
 * `pulse` — the `Token` type does not contain it.
 */

import { FIELDS, type FieldCtx } from './fields';
import { FORMS } from './forms';
import { GARNISH } from './garnish';
import { seeded } from './geom';
import type { Ctx } from './kit';
import { H, SUBJECT_X, SUBJECT_Y, W, ZOOM, c } from './tokens';
import { VESSELS } from './vessels';
import type { Recipe } from './recipes';

/** Build the field layer's context: one tone, one seeded stream. */
function fieldCtx(r: Recipe): FieldCtx {
  return { tone: c(r.tone), rand: seeded(`${r.id}:field`) };
}

/** The palette pair and the seeded stream a recipe hands to its parts. */
function context(r: Recipe, override?: string): Ctx {
  return {
    food: override ?? c(r.food),
    vessel: override ?? c(r.vesselColour),
    accent: override ?? c(r.accent),
    field: c(r.base),
    cursed: r.cursed === true,
    rand: seeded(r.id),
  };
}

function Subject({ r, ctx }: { r: Recipe; ctx: Ctx }) {
  const vessel = VESSELS[r.vessel];
  const [g1, g2] = r.garnish;
  return (
    <>
      {vessel.back(ctx)}
      {FORMS[r.form](ctx)}
      {vessel.front(ctx)}
      {GARNISH[g1](ctx)}
      {GARNISH[g2](ctx)}
    </>
  );
}

export function Composition({ r }: { r: Recipe }) {
  const ctx = context(r);
  const scale = Math.round((r.scale ?? 1) * ZOOM * 100) / 100;
  const transform = [
    `translate(${(SUBJECT_X + (r.dx ?? 0)).toString()} ${(SUBJECT_Y + (r.dy ?? 0)).toString()})`,
    `scale(${scale.toString()})`,
    r.tilt === undefined ? '' : `rotate(${r.tilt.toString()})`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <svg viewBox={`0 0 ${W.toString()} ${H.toString()}`} preserveAspectRatio="xMidYMid slice" role="presentation">
      <g data-layer="field">
        <rect width={W} height={H} fill={c(r.base)} />
        {FIELDS[r.field](fieldCtx(r))}
      </g>

      <g data-layer="subject" transform={transform}>
        {/*
          The `cursed` tell: the same subject printed once out of register
          underneath itself. It is the subject, not a third layer — same
          group, same shading, just wrong.
        */}
        {r.ghost !== undefined && (
          <g transform="translate(22 18)" opacity={0.42}>
            <Subject r={r} ctx={context(r, c(r.ghost))} />
          </g>
        )}
        <Subject r={r} ctx={ctx} />
      </g>
    </svg>
  );
}

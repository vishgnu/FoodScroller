/**
 * The drawing kit every part is built from.
 *
 * Two rules are enforced here rather than remembered per shape:
 *   - the single shading step is always `void` at `SHADE`, always on the
 *     lower-right, because the light is always top-left at 45° (anchor 3);
 *   - stroke weight is always `STROKE`, never adjusted by eye (anchor 2).
 */

import type { ReactElement } from 'react';
import { crescent, ellipseShade, lShade, n } from './geom';
import { SHADE, STROKE, c } from './tokens';

/**
 * What a part is handed: the palette pair the recipe chose, the accent, a
 * seeded number stream, and whether this one is meant to look wrong.
 */
export interface Ctx {
  /** Primary — the food itself. */
  food: string;
  /** Secondary — the vessel, the crust, the second half of the pair. */
  vessel: string;
  /** Accent — garnish, detail, the one thing that pops. */
  accent: string;
  /** The field colour behind the subject, for knocking shapes out of it. */
  field: string;
  /** `cursed` illustrations are wrong on purpose. */
  cursed: boolean;
  /** Deterministic per artId. Never random at runtime. */
  rand: () => number;
}

/** Anything that draws into the subject layer. */
export type Part = (ctx: Ctx) => ReactElement;

/** The one shading step, given an explicit silhouette. */
export function Shadow({ d }: { d: string }): ReactElement {
  return <path d={d} fill={c('void')} fillOpacity={SHADE} />;
}

/** A lit sphere: disc plus its crescent. */
export function Disc({
  cx,
  cy,
  r,
  fill,
  bite,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  bite?: number;
}): ReactElement {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <Shadow d={crescent(cx, cy, r, bite)} />
    </>
  );
}

/** A lit box: rect plus its L. Radii are 8, 16 or 24 only. */
export function Slab({
  x,
  y,
  w,
  h,
  rx,
  fill,
  t,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx: number;
  fill: string;
  t?: number;
}): ReactElement {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} />
      <Shadow d={lShade(x, y, w, h, t)} />
    </>
  );
}

/** A lit surface seen at an angle: broth, glaze, a plate face. */
export function Pool({
  cx,
  cy,
  rx,
  ry,
  fill,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill: string;
}): ReactElement {
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} />
      <Shadow d={ellipseShade(cx, cy, rx, ry)} />
    </>
  );
}

/** An outline, at the one stroke weight. Used where like values meet. */
export function Line({
  d,
  stroke,
  w,
  cap = 'round',
  opacity,
}: {
  d: string;
  stroke: string;
  w?: number;
  cap?: 'round' | 'butt';
  opacity?: number;
}): ReactElement {
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={w ?? STROKE}
      strokeLinecap={cap}
      strokeLinejoin="round"
      strokeOpacity={opacity}
    />
  );
}

/** A filled silhouette with its own hand-placed shading step. */
export function Form({
  d,
  fill,
  shade,
}: {
  d: string;
  fill: string;
  shade: string;
}): ReactElement {
  return (
    <>
      <path d={d} fill={fill} />
      <Shadow d={shade} />
    </>
  );
}

/**
 * Off-register duplicate — the `cursed` tell. The silhouette printed twice,
 * a few units out of alignment, in the second half of the pair. It is not a
 * third layer: it sits inside the subject layer, under the subject.
 */
export function Misprint({ d, fill }: { d: string; fill: string }): ReactElement {
  return <path d={d} fill={fill} fillOpacity={0.55} transform="translate(22 18)" />;
}

/** A run of drips hanging off an edge, at x positions given. */
export function Drips({
  xs,
  y,
  fill,
  len = 70,
  w = 26,
}: {
  xs: readonly number[];
  y: number;
  fill: string;
  len?: number;
  w?: number;
}): ReactElement {
  return (
    <g>
      {xs.map((x, i) => {
        const l = len * (0.6 + ((i * 7) % 5) / 7);
        return (
          <path
            key={x}
            d={`M${n(x - w / 2)} ${n(y)}h${n(w)}v${n(l - w / 2)}a${n(w / 2)} ${n(w / 2)} 0 0 1 ${n(-w)} 0Z`}
            fill={fill}
          />
        );
      })}
    </g>
  );
}

/**
 * Background fields — layer one of the two.
 *
 * A field is flat by definition: no horizon, no perspective, no atmospheric
 * depth (art guide, "Environments and backgrounds"). What varies is the
 * *treatment* — the loud, slightly-too-much pattern that makes the feed feel
 * like it is selling you something.
 *
 * Every treatment is confined to x ∈ [120, 960], y ∈ [70, 1290] and capped
 * in opacity. Below y = 1290 and outside that x band the field is flat, so
 * the caption stack and the action rail sit on plain colour.
 */

import type { ReactElement } from 'react';
import { curl, n, poly } from './geom';
import { Line } from './kit';
import { H, W, c } from './tokens';

export interface FieldCtx {
  /** The treatment colour. Always a palette token. */
  tone: string;
  /** Deterministic per artId. */
  rand: () => number;
}

export type Field = (ctx: FieldCtx) => ReactElement;

const QUIET_Y = 1290;
const A = 0.14;

/** Nothing. The subject carries the post on its own. */
const flat: Field = () => <g />;

/** Wedges radiating from the top-left — the light source, made graphic. */
const rays: Field = ({ tone }) => (
  <g>
    {Array.from({ length: 9 }, (_, i) => {
      const a0 = -0.32 + i * 0.26;
      const a1 = a0 + 0.115;
      const L = 2200;
      return (
        <path
          key={i}
          d={poly([
            [90, 60],
            [90 + Math.cos(a0) * L, 60 + Math.sin(a0) * L],
            [90 + Math.cos(a1) * L, 60 + Math.sin(a1) * L],
          ])}
          fill={tone}
          fillOpacity={A}
        />
      );
    })}
    <rect x={0} y={QUIET_Y} width={W} height={H - QUIET_Y} fill={c('void')} fillOpacity={0.55} />
  </g>
);

/** Concentric rings behind the subject. Loud, cheap, effective. */
const halo: Field = ({ tone }) => (
  <g>
    {[520, 400, 280, 170].map((r, i) => (
      <circle
        key={r}
        cx={520}
        cy={800}
        r={r}
        fill="none"
        stroke={tone}
        strokeWidth={i % 2 === 0 ? 46 : 22}
        strokeOpacity={A}
      />
    ))}
  </g>
);

/** A dot grid, thinning as it falls toward the caption. */
const dots: Field = ({ tone }) => (
  <g>
    {Array.from({ length: 7 }, (_, row) =>
      Array.from({ length: 6 }, (_, col) => {
        const x = 150 + col * 152;
        const y = 120 + row * 172;
        if (y > QUIET_Y) return null;
        const r = 16 + ((row + col) % 3) * 9;
        return <circle key={`${n(row)}-${n(col)}`} cx={x} cy={y} r={r} fill={tone} fillOpacity={A + 0.03} />;
      }),
    )}
  </g>
);

/** A diagonal lattice. */
const grid: Field = ({ tone }) => (
  <g>
    {Array.from({ length: 12 }, (_, i) => (
      <Line
        key={`d${n(i)}`}
        d={`M${n(100 + i * 96)} 70L${n(100 + i * 96 - 620)} ${n(QUIET_Y)}`}
        stroke={tone}
        w={14}
        opacity={A}
      />
    ))}
    {Array.from({ length: 7 }, (_, i) => (
      <Line key={`h${n(i)}`} d={`M120 ${n(160 + i * 176)}H960`} stroke={tone} w={10} opacity={A * 0.7} />
    ))}
  </g>
);

/** One fat diagonal band under the subject. */
const band: Field = ({ tone }) => (
  <path
    d={poly([
      [120, 1120],
      [960, 560],
      [960, 900],
      [120, 1260],
    ])}
    fill={tone}
    fillOpacity={A + 0.05}
  />
);

/** Concentric arcs pushed into the top-right, away from both quiet zones. */
const arcs: Field = ({ tone }) => (
  <g>
    {[700, 560, 420, 290].map((r) => (
      <path
        key={r}
        d={`M${n(960 - r)} 90A${n(r)} ${n(r)} 0 0 1 960 ${n(90 + r)}`}
        fill="none"
        stroke={tone}
        strokeWidth={34}
        strokeOpacity={A}
      />
    ))}
  </g>
);

/** Scattered confetti, upper field only. */
const confetti: Field = ({ tone, rand }) => (
  <g>
    {Array.from({ length: 26 }, (_, i) => {
      const x = 130 + rand() * 810;
      const y = 90 + rand() * 1080;
      const rot = rand() * 180;
      const w = 18 + rand() * 30;
      return (
        <rect
          key={i}
          x={x}
          y={y}
          width={w}
          height={w * 0.42}
          rx={8}
          fill={tone}
          fillOpacity={A + 0.06}
          transform={`rotate(${n(rot)} ${n(x)} ${n(y)})`}
        />
      );
    })}
  </g>
);

/** A hard corner wedge out of the top-left — the light source again. */
const wedge: Field = ({ tone }) => (
  <g>
    <path d={poly([[0, 0], [980, 0], [0, 1180]])} fill={tone} fillOpacity={A} />
    <path d={poly([[0, 0], [620, 0], [0, 740]])} fill={tone} fillOpacity={A * 0.8} />
  </g>
);

/** Vertical bars, top-weighted. */
const stripes: Field = ({ tone }) => (
  <g>
    {Array.from({ length: 6 }, (_, i) => (
      <rect
        key={i}
        x={140 + i * 140}
        y={70}
        width={72}
        height={1180 - i * 60}
        rx={8}
        fill={tone}
        fillOpacity={A}
      />
    ))}
  </g>
);

/** One big flat disc behind the subject. The cheapest spotlight there is. */
const spot: Field = ({ tone }) => (
  <g>
    <circle cx={520} cy={780} r={470} fill={tone} fillOpacity={A} />
    <circle cx={520} cy={780} r={330} fill={tone} fillOpacity={A * 0.8} />
  </g>
);

/** Rising curls. Reads as heat behind hot food. */
const heat: Field = ({ tone }) => (
  <g>
    {[210, 380, 550, 720, 890].map((x, i) => (
      <Line
        key={x}
        d={curl(x, 1180 - i * 40, 900, 60)}
        stroke={tone}
        w={20}
        opacity={A}
      />
    ))}
  </g>
);

/** Irregular blotches. The `cursed` field: nothing lines up. */
const speckle: Field = ({ tone, rand }) => (
  <g>
    {Array.from({ length: 14 }, (_, i) => {
      const x = 140 + rand() * 800;
      const y = 100 + rand() * 1120;
      const r = 28 + rand() * 82;
      return (
        <path
          key={i}
          d={`M${n(x)} ${n(y)}a${n(r)} ${n(r * 0.7)} 0 1 0 ${n(r * 1.4)} ${n(r * 0.2)}a${n(r * 0.8)} ${n(r)} 0 1 0 ${n(-r * 1.4)} ${n(-r * 0.2)}Z`}
          fill={tone}
          fillOpacity={A + 0.08}
        />
      );
    })}
  </g>
);

export const FIELDS = {
  flat,
  rays,
  halo,
  dots,
  grid,
  band,
  arcs,
  confetti,
  wedge,
  stripes,
  spot,
  heat,
  speckle,
} satisfies Record<string, Field>;

export type FieldName = keyof typeof FIELDS;

/**
 * Garnish and detail — the third axis. One or two per composition.
 *
 * These are what stop two bowls of noodles from being the same bowl of
 * noodles: the chopsticks, the steam, the straw, the swarm of flies over the
 * cursed one. Subject-local coordinates, same as vessels.
 */

import { curl, n, poly } from './geom';
import { Disc, Drips, Line, Shadow, Slab, type Ctx, type Part } from './kit';
import { R_CHIP, c } from './tokens';

const steam: Part = ({ accent }) => (
  <g>
    {[-150, 0, 150].map((x, i) => (
      <Line key={x} d={curl(x, -170 - i * 20, 260, 34)} stroke={accent} w={14} opacity={0.75} />
    ))}
  </g>
);

const bigSmoke: Part = ({ accent }) => (
  <g>
    {[-210, -60, 110, 240].map((x, i) => (
      <Line key={x} d={curl(x, -150 - i * 34, 400, 56)} stroke={accent} w={22} opacity={0.5} />
    ))}
  </g>
);

/** Two sticks entering from the top-left, the way a hand would hold them. */
const chopsticks: Part = ({ accent }) => (
  <g transform="rotate(-24 -60 -220)">
    <Slab x={-360} y={-470} w={40} h={430} rx={R_CHIP} fill={accent} />
    <Slab x={-278} y={-470} w={40} h={400} rx={R_CHIP} fill={accent} />
  </g>
);

const fork: Part = ({ accent }) => (
  <g transform="rotate(18 300 120)">
    <Slab x={286} y={-40} w={34} h={300} rx={R_CHIP} fill={accent} />
    <path d="M272 -230v130h62v-130M292 -230v120M314 -230v120" fill="none" stroke={accent} strokeWidth={22} strokeLinecap="round" />
  </g>
);

const spoon: Part = ({ accent }) => (
  <g transform="rotate(-20 -290 90)">
    <Slab x={-308} y={-60} w={34} h={310} rx={R_CHIP} fill={accent} />
    <Disc cx={-291} cy={-140} r={82} fill={accent} />
  </g>
);

const knifeFork: Part = ({ accent }) => (
  <g>
    <Slab x={-402} y={-120} w={30} h={400} rx={R_CHIP} fill={accent} />
    <path d="M-388 -230v122h30v-122M-373 -230v112" fill="none" stroke={accent} strokeWidth={18} strokeLinecap="round" />
    <Slab x={366} y={-40} w={30} h={320} rx={R_CHIP} fill={accent} />
    <path d="M366 -230q44 30 30 190h-30Z" fill={accent} />
  </g>
);

/** A bent straw, leaning left so it never crosses the rail. */
const straw: Part = ({ accent }) => (
  <g>
    <Slab x={-40} y={-460} w={46} h={210} rx={R_CHIP} fill={accent} />
    <path d={poly([[-40, -260], [6, -260], [96, 120], [50, 120]])} fill={accent} />
    <Shadow d={poly([[-12, -260], [6, -260], [96, 120], [78, 120]])} />
  </g>
);

/** A fat bubble-tea straw. */
const fatStraw: Part = ({ accent }) => (
  <g transform="rotate(-12 0 -100)">
    <Slab x={-46} y={-470} w={92} h={640} rx={R_CHIP} fill={accent} />
    <path d={poly([[-46, -470], [46, -470], [0, -530]])} fill={accent} />
  </g>
);

const sprinkles: Part = ({ accent, rand }) => (
  <g>
    {Array.from({ length: 30 }, (_, i) => {
      const x = -300 + rand() * 600;
      const y = -330 + rand() * 300;
      const rot = rand() * 180;
      return (
        <rect
          key={i}
          x={x}
          y={y}
          width={38}
          height={14}
          rx={8}
          fill={accent}
          transform={`rotate(${n(rot)} ${n(x)} ${n(y)})`}
        />
      );
    })}
  </g>
);

/** A downpour of sprinkles, not a scatter. */
const sprinkleStorm: Part = ({ accent, rand }) => (
  <g>
    {Array.from({ length: 64 }, (_, i) => {
      const x = -330 + rand() * 660;
      const y = -560 + rand() * 620;
      const rot = -40 + rand() * 80;
      return (
        <rect
          key={i}
          x={x}
          y={y}
          width={46}
          height={16}
          rx={8}
          fill={accent}
          fillOpacity={0.55 + rand() * 0.45}
          transform={`rotate(${n(rot)} ${n(x)} ${n(y)})`}
        />
      );
    })}
  </g>
);

const seeds: Part = ({ accent, rand }) => (
  <g>
    {Array.from({ length: 16 }, (_, i) => (
      <ellipse
        key={i}
        cx={-230 + rand() * 460}
        cy={-250 + rand() * 170}
        rx={17}
        ry={10}
        fill={accent}
      />
    ))}
  </g>
);

/** Three leaves on a sprig. */
const herb: Part = ({ accent }) => (
  <g transform="translate(150 -230) rotate(14)">
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d="M0 0c60 -14 104 20 104 20S60 54 0 34Z"
        fill={accent}
        transform={`rotate(${n(-46 + i * 46)}) translate(20 0)`}
      />
    ))}
    <Line d="M0 34v78" stroke={accent} w={12} />
  </g>
);

const cherry: Part = ({ accent }) => (
  <g transform="translate(120 -300)">
    <Line d="M0 -10c10 -90 60 -120 118 -130" stroke={accent} w={12} />
    <Disc cx={0} cy={40} r={56} fill={accent} />
  </g>
);

const bubbles: Part = ({ accent, rand }) => (
  <g>
    {Array.from({ length: 22 }, (_, i) => (
      <circle
        key={i}
        cx={-140 + rand() * 280}
        cy={-280 + rand() * 480}
        r={10 + rand() * 24}
        fill="none"
        stroke={accent}
        strokeWidth={8}
        strokeOpacity={0.8}
      />
    ))}
  </g>
);

const fizz: Part = ({ accent, rand }) => (
  <g>
    {Array.from({ length: 34 }, (_, i) => (
      <circle
        key={i}
        cx={-150 + rand() * 300}
        cy={-420 + rand() * 640}
        r={8 + rand() * 20}
        fill={accent}
        fillOpacity={0.5 + rand() * 0.4}
      />
    ))}
  </g>
);

const ice: Part = ({ accent }) => (
  <g>
    {([
      [-120, -180, -14],
      [60, -250, 22],
      [10, -60, 8],
    ] as const).map(([x, y, r]) => (
      <g key={`${n(x)},${n(y)}`} transform={`rotate(${n(r)} ${n(x)} ${n(y)})`}>
        <rect x={x - 62} y={y - 62} width={124} height={124} rx={R_CHIP} fill={accent} fillOpacity={0.5} />
        <rect
          x={x - 62}
          y={y - 62}
          width={124}
          height={124}
          rx={R_CHIP}
          fill="none"
          stroke={accent}
          strokeWidth={9}
        />
      </g>
    ))}
  </g>
);

/** Citrus wheels, hooked on the rim. */
const lemonWheel: Part = ({ accent }) => (
  <g transform="translate(-230 -240)">
    <Disc cx={0} cy={0} r={92} fill={accent} />
    <circle cx={0} cy={0} r={62} fill="none" stroke={c('void')} strokeWidth={8} strokeOpacity={0.5} />
    <Line d="M0 -62V62M-54 -31 54 31M-54 31 54 -31" stroke={c('void')} w={8} opacity={0.5} />
  </g>
);

/** Flames. `zest` earns its keep here. */
const flame: Part = ({ accent }) => (
  <g>
    {[-170, -30, 120].map((x, i) => (
      <path
        key={x}
        d={`M${n(x)} 120c-58 -60 -22 -112 4 -${n(150 + i * 30)}c40 74 92 92 40 ${n(150 + i * 30)}Z`}
        fill={accent}
        fillOpacity={0.9}
      />
    ))}
  </g>
);

/** Four-point stars — the "this is amazing" overlay the format cannot resist. */
const sparkle: Part = ({ accent }) => (
  <g>
    {([
      [-290, -300, 1],
      [250, -350, 0.72],
      [-170, 40, 0.5],
    ] as const).map(([x, y, s]) => (
      <path
        key={`${n(x)},${n(y)}`}
        d="M0 -90c8 52 30 74 82 82 -52 8 -74 30 -82 82 -8 -52 -30 -74 -82 -82 52 -8 74 -30 82 -82Z"
        fill={accent}
        transform={`translate(${n(x)} ${n(y)}) scale(${n(s)})`}
      />
    ))}
  </g>
);

const drizzle: Part = ({ accent }) => (
  <g>
    <Line
      d="M-250 -160c90 70 180 -60 270 20s150 -30 216 40"
      stroke={accent}
      w={26}
    />
    <Line d="M-210 -40c96 60 176 -50 252 30" stroke={accent} w={20} opacity={0.85} />
  </g>
);

const melt: Part = ({ accent }) => (
  <Drips xs={[-240, -120, 10, 130, 250]} y={20} fill={accent} len={120} w={44} />
);

const crumbs: Part = ({ accent, rand }) => (
  <g>
    {Array.from({ length: 18 }, (_, i) => (
      <rect
        key={i}
        x={-330 + rand() * 640}
        y={150 + rand() * 110}
        width={14 + rand() * 20}
        height={14}
        rx={8}
        fill={accent}
        fillOpacity={0.9}
      />
    ))}
  </g>
);

/** Scallion coins, the one detail that says "soup" instantly. */
const scallion: Part = ({ accent }) => (
  <g>
    {([
      [-150, -110],
      [-20, -160],
      [110, -100],
      [30, -50],
    ] as const).map(([x, y]) => (
      <g key={`${n(x)},${n(y)}`}>
        <ellipse cx={x} cy={y} rx={44} ry={22} fill={accent} />
        <ellipse cx={x} cy={y} rx={20} ry={9} fill={c('void')} fillOpacity={0.45} />
      </g>
    ))}
  </g>
);

/** A swarm. Only the cursed posts get this. */
const swarm: Part = ({ accent, rand }) => (
  <g>
    {Array.from({ length: 11 }, (_, i) => {
      const x = -320 + rand() * 620;
      const y = -420 + rand() * 340;
      return (
        <g key={i} transform={`translate(${n(x)} ${n(y)})`}>
          <ellipse cx={0} cy={0} rx={16} ry={10} fill={accent} />
          <Line d="M-14 -8-34 -24M14 -8 34 -24" stroke={accent} w={6} />
        </g>
      );
    })}
  </g>
);

/** A stream pouring in from the top-left, where the light is. */
const pour: Part = ({ accent }) => (
  <path
    d={poly([[-300, -470], [-232, -470], [-70, -40], [-150, -40]])}
    fill={accent}
  />
);

const lid: Part = ({ accent }) => (
  <g transform="rotate(-14 -60 -220)">
    <ellipse cx={-60} cy={-220} rx={240} ry={56} fill={accent} />
    <Shadow d={`M180 -220a240 56 0 0 1 -240 56q150 -20 216 -56Z`} />
    <Disc cx={-60} cy={-280} r={44} fill={accent} />
  </g>
);

export const GARNISH = {
  none: (() => <g />) as Part,
  steam,
  bigSmoke,
  chopsticks,
  fork,
  spoon,
  knifeFork,
  straw,
  fatStraw,
  sprinkles,
  sprinkleStorm,
  seeds,
  herb,
  cherry,
  bubbles,
  fizz,
  ice,
  lemonWheel,
  flame,
  sparkle,
  drizzle,
  melt,
  crumbs,
  scallion,
  swarm,
  pour,
  lid,
} satisfies Record<string, Part>;

export type GarnishName = keyof typeof GARNISH;

export type { Ctx };

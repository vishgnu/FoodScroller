/**
 * Vessels — the first axis of the composer.
 *
 * Every vessel works in subject-local coordinates: the origin is the subject
 * anchor, the rim sits near y = 40, and the food is drawn between the
 * `back` and `front` halves so it reads as being *in* the thing.
 */

import type { ReactElement } from 'react';
import { ellipseShade, lShade, n, poly } from './geom';
import { Line, Pool, Shadow, Slab, type Ctx } from './kit';
import { R_CHIP, R_SHEET, c } from './tokens';

export interface Vessel {
  /** Drawn under the food. */
  back: (ctx: Ctx) => ReactElement;
  /** Drawn over it. */
  front: (ctx: Ctx) => ReactElement;
}

const none = (): ReactElement => <g />;

/** A round-bottomed bowl, rim at y = 40. */
function bowlAt(rx: number, ry: number, depth: number): Vessel {
  return {
    back: ({ vessel }) => (
      <>
        <ellipse cx={0} cy={40} rx={rx} ry={ry} fill={vessel} />
        <Shadow d={ellipseShade(0, 40, rx, ry)} />
      </>
    ),
    front: ({ vessel }) => (
      <>
        <path d={`M${n(-rx)} 40a${n(rx)} ${n(depth)} 0 0 0 ${n(rx * 2)} 0Z`} fill={vessel} />
        <Shadow
          d={`M${n(rx)} 40a${n(rx)} ${n(depth)} 0 0 1 ${n(-rx)} ${n(depth)}q${n(rx * 0.7)} ${n(-depth * 0.68)} ${n(rx * 0.8)} ${n(-depth)}Z`}
        />
        <Slab x={-rx * 0.3} y={40 + depth - 8} w={rx * 0.6} h={34} rx={R_CHIP} fill={vessel} />
      </>
    ),
  };
}

/** A footed glass, contents drawn between the two halves. */
function glassAt(halfW: number, top: number, bottom: number, foot: boolean): Vessel {
  return {
    back: ({ field }) => (
      <rect
        x={-halfW}
        y={top}
        width={halfW * 2}
        height={bottom - top}
        rx={R_SHEET}
        fill={field}
      />
    ),
    front: ({ vessel }) => (
      <>
        <Line d={`M${n(-halfW)} ${n(top)}V${n(bottom - 24)}a24 24 0 0 0 24 24h${n(halfW * 2 - 48)}a24 24 0 0 0 24 -24V${n(top)}`} stroke={vessel} w={10} />
        <ellipse cx={0} cy={top} rx={halfW} ry={halfW * 0.28} fill="none" stroke={vessel} strokeWidth={10} />
        {foot && (
          <>
            <rect x={-26} y={bottom} width={52} height={70} rx={R_CHIP} fill={vessel} />
            <Pool cx={0} cy={bottom + 82} rx={130} ry={30} fill={vessel} />
          </>
        )}
      </>
    ),
  };
}

export const VESSELS = {
  none: { back: none, front: none },

  bowl: bowlAt(300, 54, 250),
  wideBowl: bowlAt(318, 62, 180),
  deepBowl: bowlAt(260, 48, 300),

  /** A flat plate: one ellipse, one lip, nothing else. */
  plate: {
    back: none,
    front: ({ vessel }: Ctx) => (
      <>
        <ellipse cx={0} cy={168} rx={318} ry={78} fill={vessel} />
        <Shadow d={ellipseShade(0, 168, 318, 78)} />
        <ellipse cx={0} cy={158} rx={222} ry={52} fill={c('void')} fillOpacity={0.18} />
      </>
    ),
  },

  /** A cutting board. Reads as wood by silhouette, not by colour. */
  board: {
    back: none,
    front: ({ vessel }: Ctx) => (
      <>
        <rect x={-332} y={150} width={638} height={56} rx={R_SHEET} fill={vessel} />
        <Shadow d={lShade(-332, 150, 638, 56, 0.3)} />
      </>
    ),
  },

  /** A tray with a raised lip — used where a post holds several things. */
  tray: {
    back: ({ vessel }: Ctx) => (
      <>
        <rect x={-336} y={-40} width={648} height={300} rx={R_SHEET} fill={vessel} />
        <Shadow d={lShade(-336, -40, 648, 300, 0.16)} />
      </>
    ),
    front: ({ vessel }: Ctx) => (
      <rect
        x={-336}
        y={-40}
        width={648}
        height={300}
        rx={R_SHEET}
        fill="none"
        stroke={vessel}
        strokeWidth={14}
      />
    ),
  },

  glassTall: glassAt(150, -300, 330, false),
  glassShort: glassAt(178, -60, 300, false),
  sundae: glassAt(160, -140, 200, true),

  /** A mug: straight sided, one handle, kept on the left so the rail stays clear. */
  mug: {
    back: ({ vessel }: Ctx) => (
      <>
        <ellipse cx={0} cy={-46} rx={224} ry={66} fill={vessel} />
        <Shadow d={ellipseShade(0, -46, 224, 66)} />
      </>
    ),
    front: ({ vessel }: Ctx) => (
      <>
        <path
          d="M-236 20h-60a84 84 0 0 0 0 168h60"
          fill="none"
          stroke={vessel}
          strokeWidth={40}
          strokeLinecap="round"
        />
        <path d={`M${n(-224)} ${n(-46)}v250a224 74 0 0 0 448 0V${n(-46)}`} fill={vessel} />
        <Shadow d={`M224 -46v250a224 74 0 0 1 -160 72q96 -160 90 -322Z`} />
      </>
    ),
  },

  /** A lidded takeaway cup. */
  cupLid: {
    back: ({ vessel }: Ctx) => (
      <>
        <path d={poly([[-180, -60], [180, -60], [140, 300], [-140, 300]])} fill={vessel} />
        <Shadow d={poly([[104, -60], [180, -60], [140, 300], [70, 300]])} />
      </>
    ),
    front: ({ vessel }: Ctx) => (
      <>
        <rect x={-200} y={-108} width={400} height={56} rx={R_CHIP} fill={vessel} />
        <Shadow d={lShade(-200, -108, 400, 56, 0.3)} />
      </>
    ),
  },

  /** A cone. The lattice is what makes it read as a cone and not a triangle. */
  cone: {
    back: none,
    front: ({ vessel }: Ctx) => (
      <>
        <path d={poly([[-170, 20], [170, 20], [0, 360]])} fill={vessel} />
        <Shadow d={poly([[60, 20], [170, 20], [0, 360]])} />
        <Line d="M-130 92 -12 230M-40 92 84 208M40 92 128 150" stroke={c('void')} w={7} opacity={0.4} />
      </>
    ),
  },

  /** A frying pan, handle to the left so the action rail keeps its edge. */
  pan: {
    back: ({ vessel }: Ctx) => (
      <>
        <rect x={-336} y={28} width={120} height={40} rx={R_CHIP} fill={vessel} />
        <ellipse cx={0} cy={60} rx={280} ry={96} fill={vessel} />
        <Shadow d={ellipseShade(0, 60, 280, 96)} />
      </>
    ),
    front: ({ vessel }: Ctx) => (
      <>
        <path d="M-280 60a280 96 0 0 0 560 0v56a280 96 0 0 1 -560 0Z" fill={vessel} />
        <Shadow d="M280 60v56a280 96 0 0 1 -180 90q150 -88 140 -146Z" />
      </>
    ),
  },

  /** A stock pot, two ears, lid pushed off centre. */
  pot: {
    back: ({ vessel }: Ctx) => (
      <>
        <rect x={-320} y={-10} width={70} height={36} rx={R_CHIP} fill={vessel} />
        <rect x={240} y={-10} width={70} height={36} rx={R_CHIP} fill={vessel} />
        <ellipse cx={0} cy={-20} rx={252} ry={70} fill={vessel} />
        <Shadow d={ellipseShade(0, -20, 252, 70)} />
      </>
    ),
    front: ({ vessel }: Ctx) => (
      <>
        <path d="M-252 -20v230a252 76 0 0 0 504 0V-20" fill={vessel} />
        <Shadow d="M252 -20v230a252 76 0 0 1 -170 72q104 -154 96 -302Z" />
      </>
    ),
  },

  /** A screw-top jar. */
  jar: {
    back: ({ field }: Ctx) => (
      <rect x={-172} y={-190} width={344} height={490} rx={R_SHEET} fill={field} />
    ),
    front: ({ vessel }: Ctx) => (
      <>
        <Line
          d="M-172 -190v452a38 38 0 0 0 38 38h268a38 38 0 0 0 38 -38V-190"
          stroke={vessel}
          w={10}
        />
        <rect x={-190} y={-252} width={380} height={64} rx={R_CHIP} fill={vessel} />
        <Shadow d={lShade(-190, -252, 380, 64, 0.3)} />
      </>
    ),
  },

  /** A carton, drawn as a front face plus one top plane. */
  box: {
    back: ({ vessel }: Ctx) => (
      <>
        <path d={poly([[-220, -180], [110, -260], [280, -190], [-40, -104]])} fill={vessel} />
        <Shadow d={poly([[110, -260], [280, -190], [-40, -104], [40, -136]])} />
      </>
    ),
    front: ({ vessel }: Ctx) => (
      <>
        <path d={poly([[-220, -180], [-40, -104], [-40, 300], [-220, 230]])} fill={vessel} />
        <path d={poly([[-40, -104], [280, -190], [280, 216], [-40, 300]])} fill={vessel} />
        <Shadow d={poly([[-40, -104], [280, -190], [280, 216], [-40, 300]])} />
      </>
    ),
  },

  /** A fry basket. The mesh is the tell. */
  basket: {
    back: ({ vessel }: Ctx) => (
      <path d={poly([[-300, 20], [300, 20], [220, 290], [-220, 290]])} fill={vessel} fillOpacity={0.4} />
    ),
    front: ({ vessel }: Ctx) => (
      <>
        <Line d={poly([[-300, 20], [300, 20], [220, 290], [-220, 290]])} stroke={vessel} w={12} />
        <Line
          d="M-240 100h480M-210 190h420M-190 40v240M-70 26v264M50 26v264M170 40v240"
          stroke={vessel}
          w={7}
          opacity={0.7}
        />
        <rect x={-336} y={-16} width={96} height={34} rx={R_CHIP} fill={vessel} />
      </>
    ),
  },

  /** An opened tin, lid curled back. */
  tin: {
    back: ({ vessel }: Ctx) => (
      <>
        <ellipse cx={0} cy={-20} rx={250} ry={80} fill={vessel} />
        <Shadow d={ellipseShade(0, -20, 250, 80)} />
      </>
    ),
    front: ({ vessel }: Ctx) => (
      <>
        <path d="M-250 -20v190a250 80 0 0 0 500 0V-20" fill={vessel} />
        <Shadow d="M250 -20v190a250 80 0 0 1 -168 74q102 -136 94 -264Z" />
        <g transform="translate(-120 -244) rotate(-24)">
          <ellipse cx={0} cy={0} rx={200} ry={62} fill={vessel} />
          <Shadow d={ellipseShade(0, 0, 200, 62)} />
          <ellipse cx={0} cy={0} rx={148} ry={40} fill={c('void')} fillOpacity={0.35} />
        </g>
      </>
    ),
  },
} satisfies Record<string, Vessel>;

export type VesselName = keyof typeof VESSELS;

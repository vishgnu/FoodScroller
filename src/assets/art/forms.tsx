/**
 * Food forms — the second and load-bearing axis.
 *
 * The rule these are written against is the gameplay-resolution rule: a
 * `noodles` post has to read as noodles from across a room, not as an
 * abstract shape. So each form commits to a silhouette that only that food
 * has — the coil, the wedge with holes, the torus with a drip, the bone
 * ends of a rack — and lets the vessel, garnish, field and palette do the
 * work of telling one instance of it from another.
 *
 * Subject-local coordinates: origin is the subject anchor, the vessel rim is
 * near y = 40, and nothing reaches past ±330 in x.
 */

import type { ReactElement } from 'react';
import { crescent, dome, domeWidth, ellipseShade, lShade, n, poly, wave } from './geom';
import { Disc, Drips, Form, Line, Pool, Shadow, Slab, type Part } from './kit';
import { R_CHIP, R_SHEET, c } from './tokens';

/* ------------------------------------------------------------------ noodles */

/** Strands laid across a dome. The noodle primitive everything else reuses. */
function strands(
  colour: string,
  rx: number,
  ry: number,
  y0: number,
  rows: number,
  w = 14,
): ReactElement {
  return (
    <g>
      {Array.from({ length: rows }, (_, i) => {
        const dy = (ry * (i + 0.5)) / rows;
        const hw = domeWidth(rx, ry, dy) * 0.94;
        return (
          <Line
            key={i}
            d={wave(-hw, hw, y0 - dy, 16 + (i % 3) * 7, 3 + (i % 2))}
            stroke={colour}
            w={w}
          />
        );
      })}
    </g>
  );
}

/** One coil of noodles, seen from above-ish. */
function coil(cx: number, cy: number, r: number, colour: string): ReactElement {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.52} fill={colour} />
      <Shadow d={ellipseShade(cx, cy, r, r * 0.52)} />
      {[0.78, 0.54, 0.3].map((k) => (
        <ellipse
          key={k}
          cx={cx}
          cy={cy}
          rx={r * k}
          ry={r * k * 0.52}
          fill="none"
          stroke={c('void')}
          strokeWidth={9}
          strokeOpacity={0.4}
        />
      ))}
    </g>
  );
}

const noodleMound: Part = ({ food }) => (
  <g>
    <Form d={dome(0, 40, 300, 210)} fill={food} shade={`M300 40a300 210 0 0 1 -300 -210q150 96 216 210Z`} />
    {strands(c('void'), 290, 200, 36, 7, 11)}
  </g>
);

const noodleTower: Part = ({ food, accent }) => (
  <g>
    {coil(0, 30, 280, food)}
    {coil(-24, -140, 224, food)}
    {coil(16, -290, 160, accent)}
  </g>
);

const noodlePull: Part = ({ food }) => (
  <g>
    <Form d={dome(0, 40, 280, 150)} fill={food} shade={`M280 40a280 150 0 0 1 -280 -150q146 72 206 150Z`} />
    {Array.from({ length: 7 }, (_, i) => (
      <Line
        key={i}
        d={`M${n(-40 + i * 26)} ${n(-60 - i * 6)}C${n(-120 - i * 20)} ${n(-220)} ${n(-250 - i * 12)} ${n(-300)} ${n(-256 - i * 18)} ${n(-450)}`}
        stroke={food}
        w={16}
      />
    ))}
  </g>
);

const noodleNest: Part = ({ food }) => (
  <g>
    <Slab x={-280} y={-170} w={560} h={300} rx={R_SHEET} fill={food} />
    <g opacity={0.5}>
      {Array.from({ length: 8 }, (_, i) => (
        <Line key={i} d={wave(-252, 252, -140 + i * 36, 11, 5)} stroke={c('void')} w={9} />
      ))}
    </g>
  </g>
);

const noodleTubes: Part = ({ food, accent }) => (
  <g>
    <Form d={dome(0, 40, 290, 190)} fill={accent} shade={`M290 40a290 190 0 0 1 -290 -190q148 88 208 190Z`} />
    {Array.from({ length: 11 }, (_, i) => {
      const x = -230 + (i % 4) * 150 + (i % 2) * 40;
      const y = -30 - Math.floor(i / 4) * 66;
      return (
        <g key={i} transform={`rotate(${n(-20 + ((i * 37) % 40))} ${n(x)} ${n(y)})`}>
          <rect x={x - 62} y={y - 28} width={124} height={56} rx={R_SHEET} fill={food} />
          <ellipse cx={x - 52} cy={y} rx={12} ry={24} fill={c('void')} fillOpacity={0.45} />
        </g>
      );
    })}
  </g>
);

const brothStrands: Part = ({ food, accent }) => (
  <g>
    <Pool cx={0} cy={40} rx={286} ry={50} fill={accent} />
    {Array.from({ length: 5 }, (_, i) => (
      <Line key={i} d={wave(-210 + i * 14, 210 - i * 14, -4 - i * 22, 13, 3)} stroke={food} w={15} />
    ))}
  </g>
);

const noodleBlanket: Part = ({ food, accent }) => (
  <g>
    <Form
      d={`M-300 60q-16 -180 60 -220h480q76 40 60 220Z`}
      fill={accent}
      shade={`M300 60q16 -180 -60 -220h-120q136 60 100 220Z`}
    />
    {Array.from({ length: 5 }, (_, i) => (
      <Line key={i} d={wave(-240 + i * 10, 240 - i * 10, 10 - i * 40, 14, 4)} stroke={food} w={17} />
    ))}
  </g>
);

/* ------------------------------------------------------------------- cheese */

/** The wedge with holes. Nothing else has this silhouette. */
function wedge(cx: number, cy: number, s: number, fill: string): ReactElement {
  return (
    <g transform={`translate(${n(cx)} ${n(cy)}) scale(${n(s)})`}>
      <path d={poly([[190, -70], [250, -110], [250, 50], [190, 90]])} fill={fill} />
      <path d={poly([[-200, 90], [190, 90], [190, -70]])} fill={fill} />
      <Shadow d={poly([[40, 90], [190, 90], [190, -70]])} />
      <Shadow d={poly([[190, -70], [250, -110], [250, 50], [190, 90]])} />
      <circle cx={60} cy={46} r={30} fill={c('void')} fillOpacity={0.55} />
      <circle cx={140} cy={10} r={20} fill={c('void')} fillOpacity={0.55} />
      <circle cx={148} cy={62} r={14} fill={c('void')} fillOpacity={0.55} />
    </g>
  );
}

const cheeseStretch: Part = ({ food, accent }) => (
  <g>
    <Slab x={-330} y={-60} w={250} h={230} rx={R_SHEET} fill={food} />
    <Slab x={80} y={-120} w={250} h={230} rx={R_SHEET} fill={food} />
    {Array.from({ length: 5 }, (_, i) => (
      <Line
        key={i}
        d={`M-80 ${n(-20 + i * 34)}Q0 ${n(110 + i * 46)} 80 ${n(-76 + i * 34)}`}
        stroke={accent}
        w={20}
      />
    ))}
  </g>
);

const sandwichTriangles: Part = ({ food, accent }) => (
  <g>
    <g transform="rotate(-10 -140 40)">
      <path d={poly([[-300, 130], [10, 130], [-150, -120]])} fill={accent} />
      <Shadow d={poly([[-100, 130], [10, 130], [-150, -120]])} />
      <path d={poly([[-286, 112], [-4, 112], [-36, 40], [-254, 40]])} fill={food} />
      <Line d={poly([[-300, 130], [10, 130], [-150, -120]])} stroke={food} w={14} />
    </g>
    <g transform="rotate(12 150 20)">
      <path d={poly([[-20, 110], [290, 110], [136, -140]])} fill={accent} />
      <Shadow d={poly([[130, 110], [290, 110], [136, -140]])} />
      <path d={poly([[-2, 92], [280, 92], [242, 22], [30, 22]])} fill={food} />
      <Line d={poly([[-20, 110], [290, 110], [136, -140]])} stroke={food} w={14} />
    </g>
    <Drips xs={[-150, 40, 170]} y={104} fill={food} len={90} w={34} />
  </g>
);

const cheeseWheel: Part = ({ food, accent }) => (
  <g>
    <path d={`M-290 -60a290 250 0 1 1 580 0v130a290 250 0 0 1 -580 0Z`} fill={food} />
    <Shadow d={`M290 -60v130a290 250 0 0 1 -200 236q126 -190 118 -366Z`} />
    <ellipse cx={0} cy={-60} rx={290} ry={250} fill={accent} />
    <Shadow d={ellipseShade(0, -60, 290, 250)} />
    <path d={poly([[0, -60], [270, -160], [270, 30]])} fill={c('void')} fillOpacity={0.55} />
  </g>
);

const cheeseWedges: Part = ({ food, accent }) => (
  <g>
    {wedge(-180, -30, 0.78, food)}
    {wedge(60, -150, 0.6, accent)}
    {wedge(130, 40, 0.72, food)}
  </g>
);

const cheeseCrisp: Part = ({ food, rand }) => (
  <g>
    <Disc cx={0} cy={-20} r={276} fill={food} bite={0.5} />
    {Array.from({ length: 22 }, (_, i) => {
      const a = rand() * Math.PI * 2;
      const d = rand() * 230;
      return (
        <circle
          key={i}
          cx={Math.cos(a) * d}
          cy={-20 + Math.sin(a) * d}
          r={16 + rand() * 30}
          fill={c('void')}
          fillOpacity={0.55}
        />
      );
    })}
  </g>
);

const grateShreds: Part = ({ food, accent, rand }) => (
  <g>
    <g transform="rotate(-12 -120 -150)">
      <path d={poly([[-290, -470], [10, -470], [90, 60], [-300, 60]])} fill={accent} />
      <Shadow d={poly([[-60, -470], [10, -470], [90, 60], [10, 60]])} />
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3].map((k) => (
          <path
            key={`${n(r)}-${n(k)}`}
            d={`M${n(-236 + k * 70 + r * 10)} ${n(-380 + r * 94)}h48l-24 34Z`}
            fill={c('void')}
            fillOpacity={0.55}
          />
        )),
      )}
    </g>
    {Array.from({ length: 44 }, (_, i) => {
      const x = -190 + rand() * 430;
      const y = 10 + rand() * 190;
      return (
        <rect
          key={i}
          x={x}
          y={y}
          width={30 + rand() * 50}
          height={20}
          rx={8}
          fill={food}
          transform={`rotate(${n(-40 + rand() * 80)} ${n(x)} ${n(y)})`}
        />
      );
    })}
  </g>
);

const moltenPool: Part = ({ food }) => (
  <g>
    <Pool cx={0} cy={0} rx={250} ry={72} fill={food} />
    <Line d={wave(-190, 190, -6, 16, 3)} stroke={c('void')} w={11} opacity={0.4} />
    <Line d={wave(-140, 140, -34, 12, 2)} stroke={c('void')} w={11} opacity={0.35} />
    <Drips xs={[-190, 0, 180]} y={40} fill={food} len={70} w={30} />
  </g>
);


const toastStack: Part = ({ food, accent }) => (
  <g>
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${n(-30 + i * 26)} ${n(30 - i * 96)}) rotate(${n(-6 + i * 6)})`}>
        <rect x={-230} y={-56} width={460} height={112} rx={R_SHEET} fill={accent} />
        <Shadow d={lShade(-230, -56, 460, 112, 0.26)} />
        <rect x={-196} y={-40} width={392} height={44} rx={R_CHIP} fill={food} />
      </g>
    ))}
  </g>
);

const cheeseCubes: Part = ({ food, accent, rand }) => (
  <g>
    {Array.from({ length: 12 }, (_, i) => {
      const x = -230 + (i % 4) * 150;
      const y = -20 - Math.floor(i / 4) * 92;
      return (
        <g key={i} transform={`rotate(${n(-18 + rand() * 36)} ${n(x)} ${n(y)})`}>
          <Slab
            x={x - 52}
            y={y - 52}
            w={104}
            h={104}
            rx={R_CHIP}
            fill={i % 3 === 0 ? accent : food}
          />
        </g>
      );
    })}
  </g>
);

const cheeseBurst: Part = ({ food, accent }) => (
  <g>
    <Disc cx={0} cy={0} r={272} fill={accent} bite={0.42} />
    <path
      d="M-200 -70q130 -150 330 -60 150 66 66 216-84 150-266 82-180-70-130-238Z"
      fill={food}
    />
    <Drips xs={[-150, -20, 110, 210]} y={140} fill={food} len={130} w={44} />
    <Line d="M-120 -30q90 50 200 10M-90 60q90 40 190 0" stroke={c('void')} w={12} opacity={0.35} />
  </g>
);

/* ------------------------------------------------------------------ dessert */

const cakeSlice: Part = ({ food, accent }) => (
  <g>
    <path d={poly([[-260, 150], [200, 150], [200, -180], [-260, -60]])} fill={accent} />
    <Shadow d={poly([[80, 150], [200, 150], [200, -180], [80, -140]])} />
    {[0, 1].map((i) => (
      <path
        key={i}
        d={poly([
          [-260, 24 + i * 82],
          [200, -40 + i * 82],
          [200, 10 + i * 82],
          [-260, 74 + i * 82],
        ])}
        fill={food}
      />
    ))}
    <path d={poly([[-260, -60], [200, -180], [280, -130], [-190, -12]])} fill={food} />
    <Disc cx={40} cy={-200} r={52} fill={accent} />
  </g>
);

const domeCake: Part = ({ food, accent }) => (
  <g>
    <Form d={dome(0, 130, 260, 270)} fill={accent} shade={`M260 130a260 270 0 0 1 -260 -270q136 124 188 270Z`} />
    <path
      d="M-110 -60q110 -70 220 10 40 130 -60 190 -120 66 -180 -40 -30 -92 20 -160Z"
      fill={food}
    />
    <Drips xs={[-80, 30, 120]} y={130} fill={food} len={110} w={40} />
  </g>
);

const cupcake: Part = ({ food, accent }) => (
  <g>
    <path d={poly([[-200, 30], [200, 30], [150, 250], [-150, 250]])} fill={accent} />
    <Shadow d={poly([[80, 30], [200, 30], [150, 250], [66, 250]])} />
    <Line d="M-150 60v170M-60 50v190M30 50v190M120 60v170" stroke={c('void')} w={12} opacity={0.4} />
    <Form
      d="M-210 30q-20 -140 90 -160 20 -110 130 -100 110 10 110 120 90 40 60 140Z"
      fill={food}
      shade="M180 30q30 -100 -60 -140 8 120 -60 140Z"
    />
  </g>
);

const scoopStack: Part = ({ food, accent }) => (
  <g>
    <Disc cx={-10} cy={10} r={170} fill={food} />
    <Disc cx={30} cy={-170} r={150} fill={accent} />
    <Disc cx={-30} cy={-320} r={124} fill={food} />
    <Disc cx={10} cy={-440} r={96} fill={accent} />
  </g>
);

const donut: Part = ({ food, accent }) => (
  <g>
    <Disc cx={0} cy={-20} r={280} fill={accent} bite={0.46} />
    <path
      d="M-282 -40c0 -150 130 -250 282 -250s282 100 282 250c0 40 -20 60 -50 44 -30 -180 -160 -220 -232 -220s-202 40 -232 220c-30 16 -50 -4 -50 -44Z"
      fill={food}
      transform="translate(0 40)"
    />
    <Drips xs={[-230, -70, 120, 240]} y={30} fill={food} len={84} w={40} />
    <circle cx={0} cy={-20} r={96} fill={c('void')} />
  </g>
);

const candySphere: Part = ({ food, accent }) => (
  <g>
    <Disc cx={0} cy={-30} r={290} fill={food} bite={0.4} />
    <path d={poly([[-40, -320], [40, -180], [-20, -120], [90, -10], [10, 60], [120, 250]])} fill={c('void')} fillOpacity={0.6} />
    <path d={poly([[40, -180], [200, -240], [180, -90], [280, -40], [180, 60], [230, 200]])} fill={accent} fillOpacity={0.9} />
  </g>
);

const meringue: Part = ({ food }) => (
  <g>
    <Form
      d="M-210 120q-30 -120 70 -150 -40 -110 70 -130 -20 -110 90 -110 90 0 70 110 100 30 60 130 100 30 70 150Z"
      fill={food}
      shade="M210 120q30 -120 -70 -150 40 -100 -60 -130 40 130 -40 150 80 50 40 130Z"
    />
    <Line
      d="M-160 70q160 -46 320 0M-130 -20q130 -40 260 0M-90 -110q90 -30 180 0M-50 -190q50 -18 100 0"
      stroke={c('void')}
      w={14}
      opacity={0.4}
    />
  </g>
);

const chocSlab: Part = ({ food, accent }) => (
  <g>
    <g transform="rotate(-12 -110 0)">
      <Slab x={-330} y={-130} w={330} h={260} rx={R_CHIP} fill={food} />
      <Line d="M-330 0h330M-220 -130v260M-110 -130v260" stroke={c('void')} w={12} opacity={0.5} />
    </g>
    <g transform="rotate(16 150 -40)">
      <Slab x={40} y={-190} w={210} h={200} rx={R_CHIP} fill={food} />
      <Line d="M40 -90h210M145 -190v200" stroke={c('void')} w={12} opacity={0.5} />
    </g>
    {([
      [-20, 120],
      [150, 110],
      [250, -20],
    ] as const).map(([x, y]) => (
      <path
        key={`${n(x)},${n(y)}`}
        d={poly([[x - 50, y], [x + 30, y - 40], [x + 60, y + 30], [x - 10, y + 60]])}
        fill={accent}
      />
    ))}
  </g>
);

/* ------------------------------------------------------------------- cursed */

const jellyTower: Part = ({ food, accent }) => (
  <g>
    {[0, 1, 2].map((i) => {
      const w = 300 - i * 70;
      const y = 120 - i * 150;
      return (
        <g key={i} transform={`rotate(${n(-5 + i * 5)} 0 ${n(y)})`}>
          <path
            d={`M${n(-w)} ${n(y)}q${n(-16)} ${n(-130)} ${n(w)} ${n(-130)}q${n(w)} 0 ${n(w)} ${n(130)}Z`}
            fill={i % 2 === 0 ? food : accent}
            fillOpacity={0.75}
          />
          <ellipse cx={0} cy={y - 130} rx={w} ry={34} fill={c('ink')} fillOpacity={0.14} />
          <Shadow d={`M${n(w)} ${n(y)}q0 ${n(-130)} ${n(-w)} ${n(-130)}q${n(w * 0.6)} ${n(40)} ${n(w * 0.55)} ${n(130)}Z`} />
        </g>
      );
    })}
  </g>
);

const butterBlock: Part = ({ food, accent }) => (
  <g>
    <path d={poly([[-230, -40], [110, -130], [280, -60], [-60, 30]])} fill={accent} />
    <path d={poly([[-230, -40], [-60, 30], [-60, 210], [-230, 140]])} fill={food} />
    <path d={poly([[-60, 30], [280, -60], [280, 120], [-60, 210]])} fill={food} />
    <Shadow d={poly([[-60, 30], [280, -60], [280, 120], [-60, 210]])} />
    <Drips xs={[-160, 30, 190]} y={180} fill={accent} len={100} w={40} />
  </g>
);

const wholeLemon: Part = ({ food }) => (
  <g>
    <Disc cx={0} cy={20} r={180} bite={0.44} fill={food} />
    <path d="M-176 -20q-40 -30 -60 -74 46 10 82 46Z" fill={food} />
    <path d="M176 60q40 30 60 74 -46 -10 -82 -46Z" fill={food} />
  </g>
);

const pickles: Part = ({ food, accent }) => (
  <g>
    {([
      [-60, 160, -18],
      [30, 20, 26],
      [-30, -120, -8],
      [60, -240, 34],
    ] as const).map(([x, y, r], i) => (
      <g key={i} transform={`rotate(${n(r)} ${n(x)} ${n(y)})`}>
        <rect x={x - 110} y={y - 34} width={220} height={68} rx={R_SHEET} fill={i % 2 === 0 ? food : accent} />
        <Line d={`M${n(x - 80)} ${n(y - 8)}h160`} stroke={c('void')} w={10} opacity={0.45} />
      </g>
    ))}
  </g>
);

const friedLumps: Part = ({ food, accent, rand }) => (
  <g>
    {Array.from({ length: 9 }, (_, i) => {
      const x = -210 + (i % 3) * 200 + rand() * 40;
      const y = 140 - Math.floor(i / 3) * 130 - rand() * 30;
      const r = 62 + rand() * 40;
      return (
        <g key={i}>
          <path
            d={`M${n(x - r)} ${n(y)}q${n(-10)} ${n(-r)} ${n(r)} ${n(-r * 0.9)}q${n(r * 1.1)} ${n(-10)} ${n(r)} ${n(r * 0.9)}q${n(10)} ${n(r * 0.8)} ${n(-r)} ${n(r * 0.6)}q${n(-r * 1.1)} ${n(20)} ${n(-r)} ${n(-r * 0.6)}Z`}
            fill={i % 4 === 0 ? accent : food}
          />
          <Shadow d={crescent(x, y - r * 0.2, r * 0.9, 0.5)} />
        </g>
      );
    })}
  </g>
);

const greyMass: Part = ({ food, accent }) => (
  <g>
    <Form
      d="M-240 60q-40 -140 80 -170 40 -100 160 -70 130 -34 160 80 60 90 -40 160Z"
      fill={food}
      shade="M120 60q100 -70 40 -160 -30 -70 -100 -80 110 80 60 240Z"
    />
    <ellipse cx={-70} cy={-70} rx={54} ry={30} fill={accent} fillOpacity={0.9} transform="rotate(-18 -70 -70)" />
    <ellipse cx={90} cy={-30} rx={40} ry={24} fill={accent} fillOpacity={0.9} transform="rotate(24 90 -30)" />
  </g>
);

const oozeBlob: Part = ({ food, accent }) => (
  <g>
    <Form
      d="M-260 40q-50 -170 90 -210 70 -120 190 -50 140 0 130 140 40 110 -70 120Z"
      fill={accent}
      shade="M90 40q110 -10 70 -120 -20 -70 -90 -100 90 120 20 220Z"
    />
    <Drips xs={[-190, -60, 70, 200]} y={30} fill={food} len={150} w={46} />
  </g>
);

const loafBowl: Part = ({ food, accent }) => (
  <g>
    <Form
      d="M-330 40a330 300 0 0 1 660 0Z"
      fill={accent}
      shade="M330 40a330 300 0 0 1 -330 -300q170 128 230 300Z"
    />
    <path d="M-330 40h660a90 44 0 0 1 -90 44h-480a90 44 0 0 1 -90 -44Z" fill={accent} />
    <Line
      d="M-236 -132q70 -70 150 -50M-96 -206q70 -56 150 -28M54 -218q70 -40 140 6"
      stroke={c('void')}
      w={16}
      opacity={0.45}
    />
    <ellipse cx={-30} cy={-160} rx={196} ry={78} fill={food} />
    <Shadow d={ellipseShade(-30, -160, 196, 78)} />
    <Drips xs={[-190, -80, 100, 170]} y={-140} fill={food} len={170} w={38} />
  </g>
);

const microwaveBox: Part = ({ food, accent }) => (
  <g>
    <Slab x={-330} y={-190} w={660} h={400} rx={R_SHEET} fill={accent} />
    <rect x={-290} y={-150} width={400} height={320} rx={R_CHIP} fill={c('void')} />
    <path d="M-250 140q60 -220 180 -230 130 -10 120 230Z" fill={food} />
    <circle cx={-70} cy={-60} r={70} fill={food} fillOpacity={0.6} />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={160} y={-120 + i * 90} width={130} height={40} rx={R_CHIP} fill={food} fillOpacity={0.8} />
    ))}
  </g>
);

const sundaeWrong: Part = ({ food, accent }) => (
  <g>
    <Disc cx={-60} cy={-160} r={120} fill={food} />
    <Disc cx={90} cy={-210} r={100} fill={accent} />
    {([
      [-140, -300],
      [-40, -340],
      [60, -330],
      [140, -300],
    ] as const).map(([x, y]) => (
      <rect key={`${n(x)},${n(y)}`} x={x - 30} y={y - 30} width={60} height={60} rx={R_CHIP} fill={accent} />
    ))}
    <Drips xs={[-120, 40, 130]} y={-100} fill={accent} len={140} w={30} />
  </g>
);

/* ------------------------------------------------------------------ healthy */

const leafPile: Part = ({ food, accent }) => (
  <g>
    {Array.from({ length: 9 }, (_, i) => {
      const x = -210 + (i % 3) * 180 + ((i * 53) % 40);
      const y = 30 - Math.floor(i / 3) * 78;
      const rot = -50 + ((i * 71) % 100);
      return (
        <path
          key={i}
          d="M0 0c96 -30 170 26 170 26S96 78 0 50Z"
          fill={i % 3 === 0 ? accent : food}
          transform={`translate(${n(x)} ${n(y)}) rotate(${n(rot)}) scale(0.92)`}
        />
      );
    })}
  </g>
);

const grainQuadrants: Part = ({ food, accent, vessel }) => (
  <g>
    <Pool cx={0} cy={20} rx={290} ry={62} fill={vessel} />
    {([
      [-150, -30, food],
      [30, -60, accent],
      [170, -10, food],
    ] as const).map(([x, y, fill], i) => (
      <g key={i}>
        <ellipse cx={x} cy={y} rx={120} ry={56} fill={fill} />
        <Shadow d={ellipseShade(x, y, 120, 56)} />
      </g>
    ))}
    {Array.from({ length: 16 }, (_, i) => (
      <ellipse
        key={i}
        cx={-240 + ((i * 97) % 480)}
        cy={-120 + ((i * 61) % 120)}
        rx={18}
        ry={11}
        fill={accent}
      />
    ))}
  </g>
);

const avocadoFan: Part = ({ food, accent }) => (
  <g>
    {Array.from({ length: 6 }, (_, i) => (
      <g key={i} transform={`rotate(${n(-40 + i * 16)} 0 200)`}>
        <path d="M-52 -200q52 -90 104 0 20 150 -52 180 -72 -30 -52 -180Z" fill={food} stroke={c('void')} strokeWidth={12} />
        <Shadow d="M18 -212q34 12 34 12 20 150 -52 180 66 -80 18 -192Z" />
      </g>
    ))}
    <Disc cx={0} cy={-120} r={70} fill={accent} />
  </g>
);

const vegBatons: Part = ({ food, accent }) => (
  <g>
    {Array.from({ length: 7 }, (_, i) => (
      <g key={i} transform={`rotate(${n(-54 + i * 18)} 0 240)`}>
        <rect
          x={-32}
          y={-180}
          width={64}
          height={330}
          rx={R_SHEET}
          fill={i % 2 === 0 ? food : accent}
        />
        <Shadow d={lShade(-32, -180, 64, 330, 0.18)} />
      </g>
    ))}
  </g>
);

const greenPool: Part = ({ food, accent }) => (
  <g>
    <Pool cx={0} cy={-48} rx={244} ry={66} fill={food} />
    <path
      d="M-150 -60q60 -60 150 -20 90 40 130 -20"
      fill="none"
      stroke={accent}
      strokeWidth={22}
      strokeLinecap="round"
    />
    <ellipse cx={-60} cy={-86} rx={44} ry={20} fill={accent} fillOpacity={0.8} />
  </g>
);

const oatsLayers: Part = ({ food, accent }) => (
  <g>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={-160} y={-40 + i * 106} width={320} height={106} fill={i % 2 === 0 ? food : accent} />
        <Shadow d={lShade(-160, -40 + i * 106, 320, 106, 0.2)} />
      </g>
    ))}
    {([
      [-90, -90],
      [10, -120],
      [100, -86],
    ] as const).map(([x, y]) => (
      <Disc key={`${n(x)},${n(y)}`} cx={x} cy={y} r={48} fill={accent} />
    ))}
  </g>
);

const sprouts: Part = ({ food, accent }) => (
  <g>
    {Array.from({ length: 13 }, (_, i) => {
      const a = -42 + i * 7;
      return (
        <g key={i} transform={`rotate(${n(a)} 0 240)`}>
          <Line d="M0 240C-14 110 14 40 0 -60" stroke={food} w={13} />
          <ellipse cx={0} cy={-70} rx={34} ry={20} fill={accent} />
        </g>
      );
    })}
  </g>
);

const steamedGreens: Part = ({ food, accent }) => (
  <g>
    {([
      [-170, -30, 1],
      [0, -110, 1.15],
      [160, -40, 0.95],
    ] as const).map(([x, y, s], i) => (
      <g key={i} transform={`translate(${n(x)} ${n(y)}) scale(${n(s)})`}>
        <rect x={-26} y={0} width={52} height={130} rx={R_SHEET} fill={accent} />
        <Form
          d="M-140 10q-30 -110 70 -120 20 -100 130 -60 110 -30 110 90 30 80 -60 90Z"
          fill={food}
          shade="M110 10q90 -10 60 -90 -20 -60 -80 -70 70 80 20 160Z"
        />
      </g>
    ))}
  </g>
);

const smoothieColumn: Part = ({ food, accent }) => (
  <g>
    <rect x={-138} y={-240} width={276} height={520} rx={R_SHEET} fill={food} />
    <Shadow d={lShade(-138, -240, 276, 520, 0.18)} />
    <ellipse cx={0} cy={-240} rx={138} ry={44} fill={accent} />
    <Shadow d={ellipseShade(0, -240, 138, 44)} />
  </g>
);

/* --------------------------------------------------------------------- meat */

/** A patty: thick disc, one shading step, a grill mark or two. */
function patty(cx: number, cy: number, rx: number, fill: string): ReactElement {
  return (
    <g>
      <path d={`M${n(cx - rx)} ${n(cy)}a${n(rx)} ${n(rx * 0.42)} 0 1 1 ${n(rx * 2)} 0v54a${n(rx)} ${n(rx * 0.42)} 0 0 1 ${n(-rx * 2)} 0Z`} fill={fill} />
      <Shadow d={`M${n(cx + rx)} ${n(cy)}v54a${n(rx)} ${n(rx * 0.42)} 0 0 1 ${n(-rx * 0.8)} ${n(rx * 0.38)}q${n(rx * 0.5)} ${n(-rx * 0.5)} ${n(rx * 0.44)} ${n(-rx * 0.66)}Z`} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.42} fill={fill} />
      <Shadow d={ellipseShade(cx, cy, rx, rx * 0.42)} />
      <Line d={`M${n(cx - rx * 0.6)} ${n(cy - 24)}h${n(rx * 1.2)}M${n(cx - rx * 0.5)} ${n(cy + 16)}h${n(rx)}`} stroke={c('void')} w={12} opacity={0.4} />
    </g>
  );
}

const pattyFlip: Part = ({ food, accent }) => (
  <g>
    <g transform="rotate(-22 0 -230)">{patty(0, -230, 220, food)}</g>
    <Line d="M-260 -40q140 -120 300 -150" stroke={accent} w={14} opacity={0.6} />
    <Line d="M-230 30q160 -130 330 -160" stroke={accent} w={14} opacity={0.5} />
  </g>
);

const ribRack: Part = ({ food, accent }) => (
  <g transform="rotate(-8 0 0)">
    <path d={poly([[-310, 110], [280, 60], [300, -100], [-290, -50]])} fill={food} />
    <Shadow d={poly([[110, 86], [280, 60], [300, -100], [130, -76]])} />
    {Array.from({ length: 5 }, (_, i) => (
      <g key={i}>
        <Line d={`M${n(-250 + i * 118)} ${n(-52 + i * -4)}v162`} stroke={c('void')} w={14} opacity={0.5} />
        <rect x={-296 + i * 118} y={88} width={56} height={96} rx={R_SHEET} fill={accent} />
        <Shadow d={lShade(-296 + i * 118, 88, 56, 96, 0.3)} />
      </g>
    ))}
  </g>
);

const burgerStack: Part = ({ food, accent, vessel }) => (
  <g>
    <path d={`M-290 40a290 40 0 0 0 580 0v-10a290 40 0 0 1 -580 0Z`} fill={accent} />
    <ellipse cx={0} cy={30} rx={290} ry={44} fill={accent} />
    <Shadow d={ellipseShade(0, 30, 290, 44)} />
    <path d="M-286 -10q120 40 286 40t286 -40" fill="none" stroke={vessel} strokeWidth={30} strokeLinecap="round" />
    {patty(0, -90, 270, food)}
    <path d={poly([[-250, -150], [250, -170], [190, -100], [-190, -80]])} fill={accent} />
    <Form d={dome(0, -160, 285, 210)} fill={accent} shade={`M285 -160a285 210 0 0 1 -285 -210q150 100 200 210Z`} />
    {[-140, -40, 60, 160].map((x) => (
      <ellipse key={x} cx={x} cy={-250 - Math.abs(x) * 0.18} rx={20} ry={12} fill={c('void')} fillOpacity={0.35} />
    ))}
  </g>
);

const skewers: Part = ({ food, accent }) => (
  <g>
    {[-190, 0, 190].map((x, k) => (
      <g key={x} transform={`rotate(${n(-12 + k * 12)} ${n(x)} 40)`}>
        <rect x={x - 12} y={-330} width={24} height={480} rx={R_CHIP} fill={accent} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <Slab
              x={x - 74}
              y={-270 + i * 108}
              w={148}
              h={96}
              rx={R_SHEET}
              fill={i % 2 === 0 ? food : accent}
            />
          </g>
        ))}
      </g>
    ))}
  </g>
);

const sliceFan: Part = ({ food, accent }) => (
  <g>
    {Array.from({ length: 6 }, (_, i) => (
      <g key={i} transform={`translate(${n(-230 + i * 90)} ${n(30 - i * 14)}) rotate(${n(-24 + i * 8)})`}>
        <path d="M-100 0q0 -110 100 -110t100 110q-100 40 -200 0Z" fill={food} stroke={c('void')} strokeWidth={14} />
        <Shadow d="M100 0q0 -110 -100 -110 70 40 60 140Z" />
        <path d="M-58 -30q0 -56 58 -56t58 56q-58 22 -116 0Z" fill={accent} fillOpacity={0.8} />
      </g>
    ))}
  </g>
);

const roastGlazed: Part = ({ food, accent }) => (
  <g>
    <Form
      d="M-280 30q-40 -160 120 -190 160 -60 300 0 120 60 80 190Z"
      fill={food}
      shade="M220 30q40 -130 -80 -190 -40 -18 -84 -24 150 110 94 214Z"
    />
    <Line d="M-190 -70q90 -60 190 -10 100 50 180 -20" stroke={accent} w={26} />
    <rect x={220} y={-50} width={110} height={34} rx={R_SHEET} fill={accent} />
  </g>
);

const stripsPan: Part = ({ food, accent }) => (
  <g>
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`rotate(${n(-14 + i * 9)} 0 40)`}>
        <path
          d={`M-290 ${n(-80 + i * 62)}q100 -54 190 0t190 0q50 40 0 72 -90 -46 -190 0t-190 0q-50 -32 0 -72Z`}
          fill={i % 2 === 0 ? food : accent}
        />
      </g>
    ))}
  </g>
);

const filletPlate: Part = ({ food, accent }) => (
  <g>
    <Form
      d="M-250 90q-30 -110 70 -150 130 -50 230 10 90 54 40 140Z"
      fill={food}
      shade="M90 90q50 -86 -40 -140 -30 -18 -66 -26 100 80 46 166Z"
    />
    <g transform="translate(180 -110) scale(0.62)">
      {Array.from({ length: 4 }, (_, i) => (
        <path
          key={i}
          d="M0 0c96 -30 170 26 170 26S96 78 0 50Z"
          fill={accent}
          transform={`rotate(${n(-40 + i * 30)})`}
        />
      ))}
    </g>
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse key={i} cx={-200 + ((i * 53) % 150)} cy={-150 + ((i * 37) % 70)} rx={18} ry={11} fill={accent} />
    ))}
  </g>
);

const singleRib: Part = ({ food, accent }) => (
  <g transform="rotate(-14 0 0)">
    <rect x={-46} y={-400} width={92} height={280} rx={R_SHEET} fill={accent} />
    <Disc cx={0} cy={-396} r={62} fill={accent} />
    <Form
      d="M-190 -150q-30 -90 190 -90t190 90q30 210-40 300-150 70-300 0-70-90-40-300Z"
      fill={food}
      shade="M190 -150q30 210-40 300-40 20-90 28 120-130 70-336Z"
    />
    {Array.from({ length: 4 }, (_, i) => (
      <Line
        key={i}
        d={`M${n(120 - i * 30)} ${n(40 + i * 46)}q80 34 ${n(120 + i * 16)} ${n(-30 + i * 44)}`}
        stroke={food}
        w={22}
      />
    ))}
  </g>
);

/* -------------------------------------------------------------------- drink */

const layers: Part = ({ food, accent, vessel }) => (
  <g>
    {[food, accent, vessel].map((fill, i) => (
      <g key={i}>
        <rect x={-142} y={-60 + i * 130} width={284} height={130} fill={fill} />
        <Shadow d={lShade(-142, -60 + i * 130, 284, 130, 0.2)} />
      </g>
    ))}
    <ellipse cx={0} cy={-60} rx={142} ry={40} fill={food} />
    <Shadow d={ellipseShade(0, -60, 142, 40)} />
  </g>
);

const pearls: Part = ({ food, accent }) => (
  <g>
    <rect x={-142} y={-200} width={284} height={480} rx={R_SHEET} fill={food} fillOpacity={0.85} />
    <ellipse cx={0} cy={-200} rx={142} ry={40} fill={food} />
    {Array.from({ length: 13 }, (_, i) => (
      <Disc
        key={i}
        cx={-100 + ((i * 67) % 200)}
        cy={190 - Math.floor(i / 4) * 78}
        r={42}
        fill={accent}
      />
    ))}
  </g>
);

const pourStream: Part = ({ food, accent }) => (
  <g>
    <g transform="translate(-160 -420) rotate(34)">
      <Form
        d="M-170 -30q0 -130 170 -130t170 130q0 140 -170 140T-170 -30Z"
        fill={accent}
        shade="M170 -30q0 140 -170 140 110 -50 110 -140t-50 -110q110 20 110 110Z"
      />
      <path d={poly([[140, -120], [300, -70], [286, -6], [140, -46]])} fill={accent} />
      <Line d="M-160 -90q-110 60 -20 150" stroke={accent} w={30} />
      <rect x={-70} y={-180} width={140} height={40} rx={R_CHIP} fill={accent} />
    </g>
    <path d={poly([[26, -320], [96, -326], [104, 30], [30, 30]])} fill={food} />
  </g>
);

const iceGlass: Part = ({ food, accent }) => (
  <g>
    <rect x={-142} y={-180} width={284} height={460} rx={R_SHEET} fill={food} fillOpacity={0.5} />
    {([
      [-60, 190, 12],
      [50, 120, -20],
      [-40, 40, 28],
      [60, -30, -8],
      [-20, -110, 18],
    ] as const).map(([x, y, r], i) => (
      <g key={i} transform={`rotate(${n(r)} ${n(x)} ${n(y)})`}>
        <rect x={x - 68} y={y - 68} width={136} height={136} rx={R_CHIP} fill={accent} fillOpacity={0.55} />
        <rect x={x - 68} y={y - 68} width={136} height={136} rx={R_CHIP} fill="none" stroke={accent} strokeWidth={10} />
      </g>
    ))}
  </g>
);

const swirlTop: Part = ({ food, accent }) => (
  <g>
    <rect x={-142} y={-80} width={284} height={360} rx={R_SHEET} fill={food} />
    <Shadow d={lShade(-142, -80, 284, 360, 0.2)} />
    <Form
      d="M-170 -80q-20 -110 90 -120 10 -90 90 -84 78 6 70 90 90 30 60 114Z"
      fill={accent}
      shade="M140 -80q30 -84 -60 -114 -10 -60 -60 -78 90 60 50 130 70 20 30 62Z"
    />
  </g>
);

const canFizz: Part = ({ food, accent }) => (
  <g>
    <rect x={-150} y={-260} width={300} height={500} rx={R_SHEET} fill={food} />
    <Shadow d={lShade(-150, -260, 300, 500, 0.2)} />
    <ellipse cx={0} cy={-260} rx={150} ry={40} fill={accent} />
    <Shadow d={ellipseShade(0, -260, 150, 40)} />
    <ellipse cx={-40} cy={-268} rx={44} ry={16} fill={c('void')} fillOpacity={0.6} />
    <Line d="M-150 -60h300M-150 60h300" stroke={accent} w={16} opacity={0.7} />
  </g>
);

const float: Part = ({ food, accent }) => (
  <g>
    <rect x={-150} y={-60} width={300} height={340} rx={R_SHEET} fill={food} />
    <Shadow d={lShade(-150, -60, 300, 340, 0.2)} />
    <Disc cx={-30} cy={-140} r={148} fill={accent} />
    <Disc cx={90} cy={-230} r={96} fill={accent} />
  </g>
);

const teaTower: Part = ({ food, accent }) => (
  <g>
    <rect x={-136} y={-340} width={272} height={620} rx={R_SHEET} fill={food} fillOpacity={0.9} />
    <Shadow d={lShade(-136, -340, 272, 620, 0.16)} />
    {[-220, -60, 100, 230].map((y, i) => (
      <g key={y} transform={`rotate(${n(-20 + i * 14)} ${n(-30 + i * 20)} ${n(y)})`}>
        <Disc cx={-30 + i * 20} cy={y} r={82} fill={accent} />
        <circle cx={-30 + i * 20} cy={y} r={54} fill="none" stroke={c('void')} strokeWidth={8} strokeOpacity={0.45} />
      </g>
    ))}
  </g>
);

const cocoaSwirl: Part = ({ food, accent }) => (
  <g>
    <Pool cx={0} cy={-46} rx={216} ry={64} fill={food} />
    <path
      d="M0 -46c-84 0-84-72 0-72s108 108-12 108-132-144 12-144"
      fill="none"
      stroke={accent}
      strokeWidth={22}
      strokeLinecap="round"
    />
    {([
      [-110, -58],
      [-30, -84],
      [70, -50],
    ] as const).map(([x, y]) => (
      <rect key={`${n(x)},${n(y)}`} x={x - 40} y={y - 56} width={80} height={56} rx={R_CHIP} fill={accent} />
    ))}
  </g>
);

/* ---------------------------------------------------------------- breakfast */

const pancakeStack: Part = ({ food, accent }) => (
  <g>
    {[0, 1, 2, 3].map((i) => {
      const y = 100 - i * 74;
      const rx = 276 - i * 12;
      return (
        <g key={i}>
          <path d={`M${n(-rx)} ${n(y)}a${n(rx)} ${n(rx * 0.3)} 0 1 1 ${n(rx * 2)} 0v44a${n(rx)} ${n(rx * 0.3)} 0 0 1 ${n(-rx * 2)} 0Z`} fill={food} />
          <ellipse cx={0} cy={y} rx={rx} ry={rx * 0.3} fill={food} />
          <Shadow d={ellipseShade(0, y, rx, rx * 0.3)} />
        </g>
      );
    })}
    <Slab x={-60} y={-260} w={130} h={70} rx={R_CHIP} fill={accent} />
    <Drips xs={[-170, 20, 180]} y={-200} fill={accent} len={140} w={34} />
  </g>
);

const eggFlip: Part = ({ food, accent }) => (
  <g transform="rotate(-14 0 -60)">
    <Form
      d="M-300 -30q-50 -150 100 -180 60 -130 200 -70 170 -20 180 120 60 140-110 180-160 36-250-10-90-46-120-40Z"
      fill={food}
      shade="M180 -160q170 -20 180 120 60 140-110 180-70 16-130 10 200-90 60-310Z"
    />
    <Disc cx={-20} cy={-60} r={118} fill={accent} />
  </g>
);

const toastSlice: Part = ({ food, accent }) => (
  <g transform="rotate(-8 0 0)">
    <Form
      d="M-250 190V-60q0 -130 130 -130h240q130 0 130 130v250Z"
      fill={food}
      shade="M250 190V-60q0 -130 -130 -130h-60q130 0 130 130v250Z"
    />
    <path d={poly([[-80, -30], [60, -60], [96, 40], [-40, 70]])} fill={accent} />
    <Drips xs={[-10, 60]} y={60} fill={accent} len={100} w={26} />
  </g>
);

const cerealPour: Part = ({ food, accent, rand }) => (
  <g>
    <Pool cx={0} cy={40} rx={290} ry={56} fill={accent} />
    {Array.from({ length: 22 }, (_, i) => {
      const x = -260 + rand() * 520;
      const y = -420 + rand() * 460;
      return (
        <path
          key={i}
          d={`M${n(x)} ${n(y)}q${n(40)} ${n(-30)} ${n(70)} ${n(10)}q${n(20)} ${n(40)} ${n(-30)} ${n(46)}q${n(-56)} ${n(6)} ${n(-40)} ${n(-56)}Z`}
          fill={food}
          transform={`rotate(${n(rand() * 360)} ${n(x)} ${n(y)})`}
        />
      );
    })}
  </g>
);

const smallSpread: Part = ({ food, accent }) => (
  <g>
    <ellipse cx={-180} cy={100} rx={150} ry={46} fill={accent} />
    <Shadow d={ellipseShade(-180, 100, 150, 46)} />
    <Disc cx={-180} cy={80} r={90} fill={food} />
    <g transform="translate(150 60)">
      <path d="M-100 -60v90a100 34 0 0 0 200 0v-90Z" fill={accent} />
      <ellipse cx={0} cy={-60} rx={100} ry={34} fill={food} />
      <Shadow d={ellipseShade(0, -60, 100, 34)} />
    </g>
    <g transform="translate(-40 -130)">
      <Pool cx={0} cy={0} rx={160} ry={52} fill={food} />
      <Disc cx={-40} cy={-16} r={44} fill={accent} />
    </g>
  </g>
);

const waffle: Part = ({ food, accent }) => (
  <g transform="rotate(-6 0 0)">
    <Slab x={-270} y={-190} w={540} h={400} rx={R_SHEET} fill={food} />
    <Line
      d="M-270 -60h540M-270 70h540M-140 -190v400M0 -190v400M140 -190v400"
      stroke={c('void')}
      w={16}
      opacity={0.5}
    />
    <Form
      d="M-140 -190q-20 -100 70 -110 20 -70 80 -60 66 10 60 80 70 30 40 90Z"
      fill={accent}
      shade="M110 -190q30 -60 -40 -90 6 -70 -60 -80 90 60 40 170Z"
    />
  </g>
);

const burritoRoll: Part = ({ food, accent }) => (
  <g transform="rotate(-24 0 0)">
    <rect x={-120} y={-260} width={240} height={520} rx={R_SHEET} fill={food} />
    <Shadow d={lShade(-120, -260, 240, 520, 0.2)} />
    <ellipse cx={0} cy={-260} rx={120} ry={46} fill={accent} />
    <path
      d="M0 -260c-60 0 -60 -34 0 -34s70 60 -16 60-70 -86 16 -86"
      fill="none"
      stroke={c('void')}
      strokeWidth={12}
      strokeOpacity={0.5}
    />
    <Line d="M-120 -60q120 40 240 0M-120 80q120 40 240 0" stroke={c('void')} w={12} opacity={0.35} />
  </g>
);

const toastSoldiers: Part = ({ food, accent }) => (
  <g>
    <g transform="translate(-170 -20)">
      <path d="M-110 40v-30a110 40 0 0 1 220 0v30a110 70 0 0 1 -220 0Z" fill={accent} />
      <Shadow d="M110 10v30a110 70 0 0 1 -80 68q60 -70 50 -98Z" />
      <Form d={dome(0, 0, 104, 96)} fill={food} shade={`M104 0a104 96 0 0 1 -104 -96q56 44 74 96Z`} />
      <ellipse cx={0} cy={110} rx={130} ry={40} fill={accent} />
    </g>
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`rotate(${n(-8 + i * 8)} ${n(90 + i * 90)} 150)`}>
        <Slab x={50 + i * 90} y={-120} w={64} h={280} rx={R_CHIP} fill={food} />
      </g>
    ))}
  </g>
);

const seasoningPacket: Part = ({ food, accent, rand }) => (
  <g>
    <g transform="rotate(-150 -120 -220)">
      <Slab x={-250} y={-330} w={260} h={200} rx={R_CHIP} fill={accent} />
      <Line d="M-250 -300h260M-250 -164h260" stroke={c('void')} w={10} opacity={0.5} />
    </g>
    {Array.from({ length: 40 }, (_, i) => (
      <circle
        key={i}
        cx={-190 + rand() * 300}
        cy={-200 + rand() * 260}
        r={7 + rand() * 12}
        fill={food}
        fillOpacity={0.6 + rand() * 0.4}
      />
    ))}
    <Form d={dome(30, 40, 250, 150)} fill={food} shade={`M280 40a250 150 0 0 1 -250 -150q130 70 186 150Z`} />
  </g>
);

const scissorsCut: Part = ({ food, accent }) => (
  <g>
    <Form d={dome(0, 40, 280, 160)} fill={food} shade={`M280 40a280 160 0 0 1 -280 -160q146 76 206 160Z`} />
    {strands(c('void'), 270, 150, 36, 5, 11)}
    <g transform="rotate(-30 -40 -230)">
      <Line d="M-130 -420 40 -170M40 -420 -130 -170" stroke={accent} w={26} />
      <circle cx={-150} cy={-150} r={54} fill="none" stroke={accent} strokeWidth={22} />
      <circle cx={60} cy={-150} r={54} fill="none" stroke={accent} strokeWidth={22} />
    </g>
  </g>
);


export const FORMS = {
  noodleMound,
  noodleTower,
  noodlePull,
  noodleNest,
  noodleTubes,
  brothStrands,
  noodleBlanket,
  cheeseStretch,
  sandwichTriangles,
  cheeseWheel,
  cheeseWedges,
  cheeseCrisp,
  grateShreds,
  moltenPool,
  toastStack,
  cheeseCubes,
  cheeseBurst,
  cakeSlice,
  domeCake,
  cupcake,
  scoopStack,
  donut,
  candySphere,
  meringue,
  chocSlab,
  jellyTower,
  butterBlock,
  wholeLemon,
  pickles,
  friedLumps,
  greyMass,
  oozeBlob,
  loafBowl,
  microwaveBox,
  sundaeWrong,
  leafPile,
  grainQuadrants,
  avocadoFan,
  vegBatons,
  greenPool,
  oatsLayers,
  sprouts,
  steamedGreens,
  smoothieColumn,
  pattyFlip,
  ribRack,
  burgerStack,
  skewers,
  sliceFan,
  roastGlazed,
  stripsPan,
  filletPlate,
  singleRib,
  layers,
  pearls,
  pourStream,
  iceGlass,
  swirlTop,
  canFizz,
  float,
  teaTower,
  cocoaSwirl,
  pancakeStack,
  eggFlip,
  toastSlice,
  cerealPour,
  smallSpread,
  waffle,
  burritoRoll,
  toastSoldiers,
  seasoningPacket,
  scissorsCut,
} satisfies Record<string, Part>;

export type FormName = keyof typeof FORMS;

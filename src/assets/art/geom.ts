/**
 * Path arithmetic. No colour, no JSX — just the shapes the light source
 * implies, so every form in the set shades the same way instead of each one
 * being drawn by eye (anchor 3).
 */

/** Trim a computed coordinate so path data stays short and stable. */
export function n(value: number): string {
  return (Math.round(value * 10) / 10).toString();
}

const S = Math.SQRT1_2;

/**
 * The one shading step for a disc: a crescent hugging the lower-right rim,
 * struck between the 45° light terminator and a curve bowed back toward the
 * dark side. `bite` is how far the curve bows — larger is a thinner crescent.
 */
export function crescent(cx: number, cy: number, r: number, bite = 0.38): string {
  const ax = cx + r * S;
  const ay = cy - r * S;
  const bx = cx - r * S;
  const by = cy + r * S;
  const kx = cx + r * bite;
  const ky = cy + r * bite;
  return `M${n(ax)} ${n(ay)}A${n(r)} ${n(r)} 0 0 1 ${n(bx)} ${n(by)}Q${n(kx)} ${n(ky)} ${n(ax)} ${n(ay)}Z`;
}

/**
 * The same step for a slab: an L along the bottom and right faces, as one
 * path so the corner does not double-darken.
 */
export function lShade(
  x: number,
  y: number,
  w: number,
  h: number,
  t = 0.22,
): string {
  const bh = h * t;
  const rw = w * t * 0.8;
  return [
    `M${n(x)} ${n(y + h - bh)}`,
    `H${n(x + w - rw)}`,
    `V${n(y)}`,
    `H${n(x + w)}`,
    `V${n(y + h)}`,
    `H${n(x)}`,
    'Z',
  ].join('');
}

/** The same step for an upright ellipse (rims, pools, plate faces). */
export function ellipseShade(cx: number, cy: number, rx: number, ry: number): string {
  const ax = cx + rx * S;
  const ay = cy - ry * S;
  const bx = cx - rx * S;
  const by = cy + ry * S;
  return `M${n(ax)} ${n(ay)}A${n(rx)} ${n(ry)} 0 0 1 ${n(bx)} ${n(by)}Q${n(cx + rx * 0.34)} ${n(cy + ry * 0.34)} ${n(ax)} ${n(ay)}Z`;
}

/** A dome: flat bottom at `y`, rising `ry` with half-width `rx`. */
export function dome(cx: number, y: number, rx: number, ry: number): string {
  return `M${n(cx - rx)} ${n(y)}A${n(rx)} ${n(ry)} 0 0 1 ${n(cx + rx)} ${n(y)}Z`;
}

/** Half-width of that dome at height `y`, for laying strands inside it. */
export function domeWidth(rx: number, ry: number, dy: number): number {
  const t = Math.min(1, Math.abs(dy) / ry);
  return rx * Math.sqrt(Math.max(0, 1 - t * t));
}

/** A wavy horizontal run — the noodle primitive. */
export function wave(
  x0: number,
  x1: number,
  y: number,
  amp: number,
  lobes: number,
): string {
  const span = (x1 - x0) / lobes;
  let d = `M${n(x0)} ${n(y)}`;
  for (let i = 0; i < lobes; i += 1) {
    const dir = i % 2 === 0 ? -1 : 1;
    d += `q${n(span / 2)} ${n(amp * dir)} ${n(span)} 0`;
  }
  return d;
}

/** A rising curl — steam, smoke, fizz trails. */
export function curl(x: number, y: number, h: number, amp: number): string {
  return `M${n(x)} ${n(y)}c${n(amp)} ${n(-h * 0.3)} ${n(-amp)} ${n(-h * 0.5)} 0 ${n(-h * 0.8)}c${n(amp * 0.7)} ${n(-h * 0.2)} ${n(-amp * 0.4)} ${n(-h * 0.3)} ${n(amp * 0.2)} ${n(-h * 0.5)}`;
}

/** A polygon from an explicit point list. */
export function poly(points: readonly (readonly [number, number])[]): string {
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${n(x)} ${n(y)}`).join('') + 'Z';
}

/**
 * A deterministic 0..1 stream seeded by an artId, so scattered detail
 * (sprinkles, crumbs, bubbles) is different per illustration and identical
 * on every render. Nothing here is random at runtime.
 */
export function seeded(seed: string): () => number {
  let s = 0;
  for (let i = 0; i < seed.length; i += 1) s = (Math.imul(s, 31) + seed.charCodeAt(i)) | 0;
  s = (s | 0) || 1;
  return () => {
    s = (Math.imul(s, 1103515245) + 12345) | 0;
    return ((s >>> 0) % 1_000_000) / 1_000_000;
  };
}

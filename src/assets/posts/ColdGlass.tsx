// PLACEHOLDER — graphics lane replaces this.
// Keeps the right edge and the bottom-left third quiet so the rail and the
// caption hold contrast over it. Crude on purpose: two flat layers, palette tokens only, no text, 9:16.

export function ColdGlass() {
  return (
    <svg viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" role="presentation">
      <rect width="1080" height="1920" fill="var(--surface)" />
      <path d="M270 520h400l-60 940H330Z" fill="var(--mint)" />
      <path d="M290 760h360l-48 700H338Z" fill="var(--grape)" />
      <rect x="400" y="300" width="140" height="240" rx="24" fill="var(--zest)" />
    </svg>
  );
}

// PLACEHOLDER — graphics lane replaces this.
// Keeps the right edge and the bottom-left third quiet so the rail and the
// caption hold contrast over it. Crude on purpose: two flat layers, palette tokens only, no text, 9:16.

export function MeltedSlab() {
  return (
    <svg viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" role="presentation">
      <rect width="1080" height="1920" fill="var(--void)" />
      <rect x="120" y="620" width="680" height="560" rx="24" fill="var(--zest)" />
      <rect x="120" y="1120" width="680" height="200" rx="24" fill="var(--mint)" />
      <circle cx="360" cy="860" r="70" fill="var(--void)" />
      <circle cx="640" cy="960" r="48" fill="var(--void)" />
    </svg>
  );
}

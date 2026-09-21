// PLACEHOLDER — graphics lane replaces this.
// Crude on purpose: two flat layers, palette tokens only, no text, 9:16.

export function MeltedSlab() {
  return (
    <svg viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" role="presentation">
      <rect width="1080" height="1920" fill="var(--void)" />
      <rect x="120" y="620" width="840" height="560" rx="24" fill="var(--zest)" />
      <rect x="120" y="1120" width="840" height="200" rx="24" fill="var(--mint)" />
      <circle cx="360" cy="860" r="70" fill="var(--void)" />
      <circle cx="700" cy="960" r="48" fill="var(--void)" />
    </svg>
  );
}

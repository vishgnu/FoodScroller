// PLACEHOLDER — graphics lane replaces this.
// Crude on purpose: two flat layers, palette tokens only, no text, 9:16.
// See docs/art-style-guide.md for what a real one has to be.

export function StackedBowl() {
  return (
    <svg viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" role="presentation">
      <rect width="1080" height="1920" fill="var(--surface)" />
      <circle cx="540" cy="820" r="430" fill="var(--zest)" />
      <path d="M180 1010h720a360 360 0 0 1-720 0Z" fill="var(--grape)" />
      <rect x="300" y="470" width="480" height="24" rx="8" fill="var(--void)" />
      <rect x="360" y="560" width="360" height="24" rx="8" fill="var(--void)" />
    </svg>
  );
}

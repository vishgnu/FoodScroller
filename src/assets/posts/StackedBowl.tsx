// PLACEHOLDER — graphics lane replaces this.
// Keeps the right edge and the bottom-left third quiet so the rail and the
// caption hold contrast over it. Crude on purpose: two flat layers, palette tokens only, no text, 9:16.
// See docs/art-style-guide.md for what a real one has to be.

export function StackedBowl() {
  return (
    <svg viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" role="presentation">
      <rect width="1080" height="1920" fill="var(--surface)" />
      <circle cx="450" cy="800" r="350" fill="var(--zest)" />
      <path d="M130 1010h640a320 320 0 0 1-640 0Z" fill="var(--grape)" />
      <rect x="260" y="470" width="380" height="24" rx="8" fill="var(--void)" />
      <rect x="310" y="560" width="280" height="24" rx="8" fill="var(--void)" />
    </svg>
  );
}

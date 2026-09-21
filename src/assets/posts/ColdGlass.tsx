// PLACEHOLDER — graphics lane replaces this.
// Crude on purpose: two flat layers, palette tokens only, no text, 9:16.

export function ColdGlass() {
  return (
    <svg viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" role="presentation">
      <rect width="1080" height="1920" fill="var(--surface)" />
      <path d="M340 520h400l-60 940H400Z" fill="var(--mint)" />
      <path d="M360 760h360l-48 700H408Z" fill="var(--grape)" />
      <rect x="470" y="300" width="140" height="240" rx="24" fill="var(--zest)" />
    </svg>
  );
}

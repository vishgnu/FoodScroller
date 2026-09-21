/**
 * The two tabs across the top. Only one feed exists in phase 1, so the other
 * tab is inert — visibly "not this one", never broken.
 *
 * The platform is fictional and unnamed by any real name (Constitution I).
 * These labels are ours.
 */

export function TopTabs() {
  return (
    <nav className="toptabs" aria-label="Feeds">
      <button type="button" className="toptabs__tab toptabs__tab--inert" aria-disabled="true">
        Followed
      </button>
      <button type="button" className="toptabs__tab toptabs__tab--active" aria-current="page">
        Endless
      </button>
    </nav>
  );
}

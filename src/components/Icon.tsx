/**
 * The icon set. 24×24 grid, 2px stroke, rounded caps and joins, drawn in
 * `currentColor` so the palette rules live in CSS (art-style-guide.md, "UI
 * and icons"). Filled only to show an active state.
 *
 * Every icon has to be distinguishable from the others in silhouette alone,
 * in greyscale, at 24px — that is the review test, not a preference.
 *
 * No text is ever drawn in here. Nothing legible is art.
 */

export type IconName =
  | 'heart'
  | 'comment'
  | 'save'
  | 'share'
  | 'note'
  | 'feed'
  | 'browse'
  | 'inbox'
  | 'person'
  | 'plus'
  | 'tick';

const PATHS: Record<IconName, string> = {
  heart:
    'M12 20.2 4.4 12.9a4.6 4.6 0 0 1 0-6.6 4.8 4.8 0 0 1 6.7 0l.9.9.9-.9a4.8 4.8 0 0 1 6.7 0 4.6 4.6 0 0 1 0 6.6Z',
  comment: 'M21 12a8 8 0 0 1-8 8H4l2.2-3A8 8 0 1 1 21 12Z',
  save: 'M6 3h12v18l-6-4.5L6 21Z',
  share: 'M21 12 3 4l7 8-7 8Z',
  note: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  feed: 'M4 5h7v6H4Zm9 0h7v4h-7Zm0 6h7v8h-7Zm-9 2h7v6H4Z',
  browse: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 5 5',
  inbox: 'M3 6h18v12H3Zm0 0 9 7 9-7',
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0Z',
  plus: 'M12 5v14M5 12h14',
  tick: 'm4 12 5 5L20 6',
};

export interface IconProps {
  name: IconName;
  /** Filled shows an active state, per the art guide. */
  filled?: boolean;
  /** Rendered size in px. The grid is always 24. */
  size?: number;
}

export function Icon({ name, filled = false, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

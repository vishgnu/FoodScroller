/**
 * The column of engagement icons down the right edge. The other half of the
 * grammar, and the only place in the app where anything can be acted on.
 *
 * The heart is the whole mechanic: `ink` at rest so it reads as the live
 * control, `pulse` and filled once engaged, with one scale pop.
 * `pulse` appears nowhere else in the app — that reservation is how the eye
 * learns where the reward is (art-style-guide.md, palette).
 *
 * The other icons carry inflated counts and do nothing. The counts are set
 * data attached to the post, not a running total: nothing in this game
 * simulates a crowd.
 */

import { useEffect, useRef, useState } from 'react';
import type { Post } from '../feed/types';
import { Icon, type IconName } from './Icon';

/** Inflated social proof, formatted for display. Never accumulated. */
function count(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000).toString()}K`;
  return value.toString();
}

/**
 * Comments, saves and shares are derived from the post's own like count so
 * they stay plausible against each other. Set data, fixed per post.
 */
const DERIVED: Record<'comment' | 'save' | 'share', number> = {
  comment: 37,
  save: 23,
  share: 91,
};

export interface ActionRailProps {
  post: Post;
  engaged: boolean;
  onToggle: () => void;
}

export function ActionRail({ post, engaged, onToggle }: ActionRailProps) {
  const [popping, setPopping] = useState(false);
  const wasEngaged = useRef(engaged);

  useEffect(() => {
    if (engaged && !wasEngaged.current) {
      setPopping(true);
      const timer = window.setTimeout(() => {
        setPopping(false);
      }, 340);
      wasEngaged.current = engaged;
      return () => {
        window.clearTimeout(timer);
      };
    }
    wasEngaged.current = engaged;
    return undefined;
  }, [engaged]);

  return (
    <div className="rail rail--spin">
      <span className="rail__avatar" aria-hidden="true">
        <span className="rail__avatar-inner">
          <svg viewBox="0 0 96 96" role="presentation">
            <circle cx="48" cy="38" r="17" fill="var(--muted)" />
            <path d="M14 92a34 34 0 0 1 68 0Z" fill="var(--muted)" />
          </svg>
        </span>
        <span className="rail__follow">+</span>
      </span>

      <button
        type="button"
        className={[
          'rail__action',
          'rail__like',
          engaged ? 'rail__like--on' : '',
          popping ? 'rail__like--pop' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-pressed={engaged}
        aria-label={engaged ? 'Remove your like' : 'Like this post'}
        onClick={onToggle}
      >
        <span className="rail__like-glyph">
          <Icon name="heart" filled={engaged} />
        </span>
        <span className="rail__count">{count(post.baseLikes + (engaged ? 1 : 0))}</span>
      </button>

      {(['comment', 'save', 'share'] as const).map((name) => (
        <span key={name} className="rail__action rail__action--inert" aria-hidden="true">
          <Icon name={name satisfies IconName} />
          <span className="rail__count">{count(Math.round(post.baseLikes / DERIVED[name]))}</span>
        </span>
      ))}

      <span className="rail__disc" aria-hidden="true">
        <span className="rail__disc-dot" />
      </span>
    </div>
  );
}

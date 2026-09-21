/**
 * One post: full-bleed media, the scrim over it, the meta stack bottom-left
 * and the action rail down the right edge. Exactly one viewport tall.
 *
 * Media comes from the art registry when `graphics` has authored an
 * illustration for the post's artId. When it has not — which is most of the
 * feed in phase 1 — the post renders a neutral stand-in field instead and
 * stays a complete, readable, actionable post (FR-003, spec Story 4
 * scenario 3). There is no loading state and no layout shift, because there
 * is nothing to load: every illustration is inline vector.
 */

import { artFor } from '../assets/index';
import type { Post } from '../feed/types';
import { ActionRail } from './ActionRail';
import { PostMeta } from './PostMeta';

/** Stable small integer from an artId, so a post always looks the same. */
function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) h = (Math.imul(h, 31) + value.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * The neutral stand-in. Two flat layers and nothing else, drawn from palette
 * tokens only, and never `pulse` — that colour belongs to the engagement
 * action alone. Deliberately not trying to be art: the art lane's work is
 * what replaces it, one artId at a time.
 */
function StandIn({ artId }: { artId: string }) {
  const h = hash(artId);
  const fields = ['var(--surface)', 'var(--void)'] as const;
  const subjects = ['var(--zest)', 'var(--mint)', 'var(--grape)', 'var(--muted)'] as const;
  const field = fields[h % fields.length];
  const subject = subjects[(h >> 2) % subjects.length];
  const shape = h % 3;

  return (
    <svg viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" role="presentation">
      <rect width="1080" height="1920" fill={field} />
      {shape === 0 && <circle cx="540" cy="820" r="360" fill={subject} />}
      {shape === 1 && <rect x="180" y="540" width="720" height="620" rx="24" fill={subject} />}
      {shape === 2 && <path d="M120 1180 540 460l420 720Z" fill={subject} />}
      <rect x="180" y="1300" width="720" height="16" rx="8" fill={subject} opacity="0.5" />
    </svg>
  );
}

export interface PostCardProps {
  post: Post;
  index: number;
  engaged: boolean;
  /** Drift is only worth paying for on the post actually being looked at. */
  active: boolean;
  onToggle: () => void;
}

export function PostCard({ post, index, engaged, active, onToggle }: PostCardProps) {
  const entry = artFor(post.artId);

  return (
    <article
      className="post"
      style={{ top: `calc(${index.toString()} * 100dvh)` }}
      aria-label={`Post by ${post.handle}`}
      aria-posinset={index + 1}
    >
      <div className={`media${active ? ' media--drift' : ''}`}>
        <div className="media__art">
          {entry ? <entry.Component /> : <StandIn artId={post.artId} />}
        </div>
      </div>

      <div className="scrim" />

      <PostMeta post={post} />
      <ActionRail post={post} engaged={engaged} onToggle={onToggle} />
    </article>
  );
}

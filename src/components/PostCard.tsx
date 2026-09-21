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
 * The neutral stand-in, for every artId `graphics` has not authored yet.
 *
 * Two flat layers and a small accent, drawn from palette tokens only and
 * never `pulse` — that colour belongs to the engagement action alone. It is
 * deliberately not trying to be art; the spec allows neutral stand-ins until
 * the art direction lands, and the art lane's work is what replaces it, one
 * artId at a time.
 *
 * It obeys the one rule a real illustration also has to obey: the right edge
 * and the bottom-left third stay quiet, so `ink` and `pulse` hold contrast
 * over them (art-style-guide.md, "Environments and backgrounds").
 */
const STAND_IN_FIELDS = ['var(--surface)', 'var(--void)'] as const;
const STAND_IN_SUBJECTS = [
  'var(--zest)',
  'var(--mint)',
  'var(--grape)',
  'var(--muted)',
] as const;

function StandIn({ artId }: { artId: string }) {
  const h = hash(artId);
  const field = STAND_IN_FIELDS[h % STAND_IN_FIELDS.length];
  const subject = STAND_IN_SUBJECTS[(h >> 2) % STAND_IN_SUBJECTS.length];
  const accent = STAND_IN_SUBJECTS[(h >> 5) % STAND_IN_SUBJECTS.length];
  const shape = (h >> 8) % 4;

  return (
    <svg viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" role="presentation">
      <rect width="1080" height="1920" fill={field} />

      {shape === 0 && <circle cx="450" cy="760" r="330" fill={subject} />}
      {shape === 1 && <rect x="130" y="450" width="640" height="620" rx="24" fill={subject} />}
      {shape === 2 && <path d="M120 1080 450 430l330 650Z" fill={subject} />}
      {shape === 3 && (
        <path d="M130 760a320 320 0 0 1 640 0v320H130Z" fill={subject} />
      )}

      <circle cx="700" cy="420" r="90" fill={accent} />
      <rect x="130" y="1140" width="420" height="16" rx="8" fill={accent} />
      <rect x="130" y="1196" width="250" height="16" rx="8" fill={subject} />
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
      <ActionRail post={post} engaged={engaged} active={active} onToggle={onToggle} />
    </article>
  );
}

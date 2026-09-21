/**
 * The creator handle, caption and sound line, stacked bottom-left. Half of
 * the interface grammar the format is recognised by.
 *
 * Everything here is live DOM text — selectable, resizable, and readable by
 * assistive technology (FR-004, SC-008). Nothing legible is ever drawn into
 * an SVG.
 */

import type { Post } from '../feed/types';
import { Icon } from './Icon';

export interface PostMetaProps {
  post: Post;
  /** The article names itself from the handle, so `role="feed"` navigation
   * announces which post it landed on. */
  handleId: string;
}

export function PostMeta({ post, handleId }: PostMetaProps) {
  return (
    <div className="meta">
      {post.sponsored && <span className="meta__sponsored">Sponsored</span>}

      <span className="meta__handle" id={handleId}>
        {post.handle}
        <span className="meta__tick" role="img" aria-label="Verified">
          <Icon name="tick" size={14} />
        </span>
      </span>

      <p className="meta__caption">{post.caption}</p>

      <span className="meta__tags">{post.tags.map((tag) => `#${tag}`).join(' ')}</span>

      <span className="meta__sound">
        <Icon name="note" size={14} />
        <span className="meta__sound-text">{post.sound}</span>
      </span>
    </div>
  );
}

/**
 * The scroll container.
 *
 * Every post is exactly one viewport tall, so the list is windowed by
 * arithmetic rather than by a virtualisation library (plan.md, "Rendering
 * approach"): one spacer of `total * 100dvh`, and the posts around the active
 * index absolutely positioned at `index * 100dvh`. Nothing is measured and
 * nothing is observed, which is why scrolling at post 200 costs exactly what
 * scrolling at post 1 costs (SC-002).
 *
 * `dvh`, not `vh` — on a phone the browser chrome makes `vh` wrong, and a
 * post that is 100vh tall does not snap to the screen.
 */

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { RENDER_RADIUS, useFeed } from '../feed/useFeed';
import { PostCard } from './PostCard';

export function Feed() {
  const feed = useFeed();
  const container = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const measure = useCallback(() => {
    const element = container.current;
    if (!element) return;
    const height = element.clientHeight;
    if (height === 0) return;
    feed.setActive(Math.max(0, Math.round(element.scrollTop / height)));
  }, [feed]);

  const onScroll = useCallback(() => {
    if (frame.current !== 0) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      measure();
    });
  }, [measure]);

  /**
   * Snap anchors — one empty 1px-wide box per retained post, at that post's
   * offset. A mandatory snap container can only stop where a snap area is, so
   * if only the rendered window carried `scroll-snap-align` then any jump past
   * it (a fling with real momentum, a keyboard End) would be pulled straight
   * back to the window's edge. The browser resolves the snap as the scroll
   * happens, which is too early for any amount of re-rendering to fix, so the
   * anchors exist for the whole retained range instead.
   *
   * They are empty, absolutely positioned and pointer-transparent, and there
   * are at most RETAINED + a few of them, so this stays arithmetic windowing:
   * what is not rendered is the post, which is all the expensive part.
   */
  const anchors = useMemo(() => {
    const list: number[] = [];
    for (let i = feed.released; i < feed.total; i += 1) list.push(i);
    return list;
  }, [feed.released, feed.total]);

  useEffect(
    () => () => {
      if (frame.current !== 0) window.cancelAnimationFrame(frame.current);
    },
    [],
  );

  const first = Math.max(0, feed.active - RENDER_RADIUS);
  const last = Math.min(feed.total - 1, feed.active + RENDER_RADIUS);
  const indices: number[] = [];
  for (let i = first; i <= last; i += 1) indices.push(i);

  return (
    <div
      className="feed"
      ref={container}
      onScroll={onScroll}
      tabIndex={0}
      role="feed"
      aria-label="Food posts"
      aria-busy={false}
    >
      <div
        className="feed__spacer"
        style={{ height: `calc(${feed.total.toString()} * 100dvh)` }}
      >
        {anchors.map((index) => (
          <div
            key={`snap-${index.toString()}`}
            className="snap"
            style={{ top: `calc(${index.toString()} * 100dvh)` }}
            aria-hidden="true"
          />
        ))}

        {indices.map((index) => {
          const post = feed.at(index);
          if (!post) {
            // Past what the session still holds (FR-013). There is no snap
            // anchor down here either, so the feed simply stops at the oldest
            // retained post; this is the defensive case, not the normal one.
            return (
              <article
                key={`released-${index.toString()}`}
                className="post post--released"
                style={{ top: `calc(${index.toString()} * 100dvh)` }}
              >
                <p>This one has scrolled out of the session. Keep going down.</p>
              </article>
            );
          }
          return (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              engaged={feed.engaged.has(post.id)}
              active={index === feed.active}
              onToggle={() => {
                feed.toggle(post);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

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

import { useCallback, useEffect, useRef } from 'react';
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
        {indices.map((index) => {
          const post = feed.at(index);
          if (!post) {
            // Past what the session still holds (FR-013). Unreachable in any
            // session the success criteria measure, and a quiet panel rather
            // than a blank screen if it ever is reached.
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

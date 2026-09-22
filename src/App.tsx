/**
 * The whole app. No router, no store, no menu, no title screen — the game
 * opens directly into the feed (FR-002).
 */

import { BottomNav } from './components/BottomNav';
import { Feed } from './components/Feed';
import { TopTabs } from './components/TopTabs';

export function App() {
  return (
    <main className="app">
      <Feed />
      <div className="scrim--top" aria-hidden="true" />
      <TopTabs />
      <BottomNav />
    </main>
  );
}

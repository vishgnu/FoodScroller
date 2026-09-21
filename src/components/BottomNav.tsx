/**
 * The persistent tab bar. Part of the interface grammar being satirised, so
 * it has to look real — but only the first tab does anything in phase 1, and
 * the rest say so by being plainly inactive rather than by failing.
 */

import { Icon, type IconName } from './Icon';

const TABS: { label: string; icon: IconName }[] = [
  { label: 'Feed', icon: 'feed' },
  { label: 'Browse', icon: 'browse' },
  { label: 'Post', icon: 'plus' },
  { label: 'Inbox', icon: 'inbox' },
  { label: 'You', icon: 'person' },
];

export function BottomNav() {
  return (
    <nav className="nav" aria-label="Sections">
      {TABS.map((tab, index) => {
        const active = index === 0;
        const create = tab.icon === 'plus';
        return (
          <button
            key={tab.label}
            type="button"
            className={`nav__tab${active ? ' nav__tab--active' : ' nav__tab--inert'}`}
            aria-current={active ? 'page' : undefined}
            aria-disabled={active ? undefined : true}
          >
            {create ? (
              <span className="nav__create">
                <Icon name="plus" size={18} />
              </span>
            ) : (
              <Icon name={tab.icon} size={22} />
            )}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

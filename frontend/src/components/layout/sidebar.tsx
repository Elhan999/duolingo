'use client';
import Link from 'next/link';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useI18n } from '@/providers/i18n-provider';
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/ui/surface';
import { IconButton } from '@/components/ui/button';
import { navigation, type NavigationKey } from './navigation';
import { Logo } from './logo';
import { useNavPill } from './use-nav-pill';
import styles from './layout.module.scss';
export type SidebarProps = {
  active: NavigationKey;
  collapsed: boolean;
  onCollapse: () => void;
  onNavigate?: (key: NavigationKey) => void;
  identity?: { name: string; description: string };
};
export function Sidebar({
  active,
  collapsed,
  onCollapse,
  onNavigate,
  identity,
}: SidebarProps) {
  const {
    messages: { nav },
  } = useI18n();
  const { ref, pillRef, pill, moveTo, current } = useNavPill(active, collapsed);
  return (
    <aside className={cn(styles.sidebar, collapsed && styles.collapsed)}>
      <div className={styles.brand}>
        <Logo compact={false} />
        <IconButton
          label={collapsed ? nav.expand : nav.collapse}
          onClick={onCollapse}
        >
          {collapsed ? (
            <PanelLeftOpen size={17} />
          ) : (
            <PanelLeftClose size={17} />
          )}
        </IconButton>
      </div>
      <nav
        ref={ref}
        aria-label={nav.navigation}
        className={styles.navigation}
        data-pill={pill ? 'true' : undefined}
        data-active-section={active}
      >
        {/* Always mounted, so the glide can start before the first paint. */}
        <span
          ref={pillRef}
          className={styles.navPill}
          aria-hidden="true"
          hidden={!pill}
          style={
            pill
              ? {
                  transform: `translate(${pill.x}px, ${pill.y}px)`,
                  width: pill.width,
                  height: pill.height,
                }
              : undefined
          }
        />
        {(['learning', 'connect', 'account'] as const).map((group, index) => (
          <div className={styles.navGroup} key={group}>
            <p className={styles.groupLabel}>{nav[group]}</p>
            {navigation
              .filter((item) => item.group === group)
              .map(({ key, href, icon: Icon }) => (
                <Link
                  key={key}
                  href={href}
                  data-tone={index}
                  data-nav-active={key === current || undefined}
                  data-section={key}
                  title={nav[key]}
                  aria-label={nav[key]}
                  aria-current={
                    !onNavigate && key === active ? 'page' : undefined
                  }
                  className={cn(
                    styles.navLink,
                    key === current && styles.navActive,
                  )}
                  onClick={(event) => {
                    // Plain clicks only: a new tab leaves this page as it is.
                    if (
                      !event.metaKey &&
                      !event.ctrlKey &&
                      !event.shiftKey &&
                      event.button === 0
                    )
                      moveTo(key);
                    if (onNavigate) {
                      event.preventDefault();
                      onNavigate(key);
                    }
                  }}
                >
                  <span className={styles.navIcon} aria-hidden="true">
                    <Icon size={19} strokeWidth={1.75} />
                  </span>
                  <span className={styles.navLabel}>{nav[key]}</span>
                  {key === active && <i aria-hidden="true" />}
                </Link>
              ))}
          </div>
        ))}
      </nav>
      {/* Theme and language live in the header's "Appearance" button and in
          Settings; repeating them here only crowded the panel. */}
      <div className={styles.sidebarBottom}>
        <Link href="/profile" className={styles.user} title={nav.profile}>
          <Avatar name={identity?.name ?? 'LearM'} />
          <div>
            <strong>{identity?.name ?? nav.guest}</strong>
            {/* Usernames are often the e-mail itself: say it once. */}
            {identity?.description !== identity?.name && (
              <span>{identity?.description ?? nav.guestHint}</span>
            )}
          </div>
        </Link>
      </div>
    </aside>
  );
}

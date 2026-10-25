'use client';
import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useI18n } from '@/providers/i18n-provider';
import { cn } from '@/lib/cn';
import { CircleHelp } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher, ThemeSwitcher } from '@/components/ui/preferences';
import { Sidebar } from './sidebar';
import { MobileBottomNav } from './mobile-bottom-nav';
import { Header } from './header';
import { SiteGuide } from './site-guide';
import { useSidebarCollapsed } from '@/hooks/use-sidebar-collapsed';
import { communityCopy } from '@/features/landing/community-copy';
import { navigation, type NavigationKey } from './navigation';
import styles from './layout.module.scss';

const GUIDE_SEEN = 'learm:guide-seen';
export function AppShell({
  children,
  active = 'dashboard',
  onNavigate,
  title,
  badge,
  identity,
  action,
}: {
  children: ReactNode;
  active?: NavigationKey;
  onNavigate?: (key: NavigationKey) => void;
  title?: string;
  badge?: string | null;
  identity?: { name: string; description: string };
  action?: ReactNode;
}) {
  const [collapsed, setCollapsed] = useSidebarCollapsed();
  const [menu, setMenu] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [guide, setGuide] = useState(false);
  // Show the section map once, on the first visit to the app.
  useEffect(() => {
    try {
      if (localStorage.getItem(GUIDE_SEEN)) return;
      localStorage.setItem(GUIDE_SEEN, '1');
    } catch {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser storage after hydration
    setGuide(true);
  }, []);
  const {
    locale,
    messages: { nav, ui, studio },
  } = useI18n();
  return (
    <div className={cn(styles.shell, collapsed && styles.shellCollapsed)}>
      <Sidebar
        active={active}
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        onNavigate={onNavigate}
        identity={identity}
      />
      <div className={styles.workspace}>
        <Header
          onMenu={() => setMenu(true)}
          onPreferences={() => setPreferences(true)}
          onGuide={() => setGuide(true)}
          title={title}
          badge={badge}
          action={action}
        />
        <main id="main-content" tabIndex={-1} className={styles.main}>
          {children}
        </main>
        <footer className={styles.footer}>
          {studio.footer}
          <Link href="/#about">
            © {new Date().getFullYear()} LearM · {communityCopy[locale].made}
          </Link>
        </footer>
      </div>
      <MobileBottomNav active={active} onNavigate={onNavigate} />
      <SiteGuide open={guide} onClose={() => setGuide(false)} active={active} />
      <Modal open={menu} onClose={() => setMenu(false)} title={nav.navigation}>
        <nav className={styles.mobileMenu}>
          {navigation.map(({ key, href, icon: Icon }) => (
            <Link
              key={key}
              href={href}
              onClick={(event) => {
                setMenu(false);
                if (onNavigate) {
                  event.preventDefault();
                  onNavigate(key);
                }
              }}
            >
              <Icon size={18} />
              {nav[key]}
            </Link>
          ))}
        </nav>
        <Button
          variant="secondary"
          className={styles.menuGuide}
          onClick={() => {
            setMenu(false);
            setGuide(true);
          }}
        >
          <CircleHelp size={18} aria-hidden="true" />
          {nav.guideOpen}
        </Button>
        <div className={styles.preferenceContent}>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </Modal>
      <Modal
        open={preferences}
        onClose={() => setPreferences(false)}
        title={ui.appearance}
        description={studio.preferencesHint}
      >
        <div className={styles.preferenceContent}>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </Modal>
    </div>
  );
}

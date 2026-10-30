'use client';
import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { useI18n } from '@/providers/i18n-provider';
import { Logo } from '@/components/layout/logo';
import { IconButton } from '@/components/ui/button';
import { LinkButton } from '@/components/ui/link-button';
import { Modal } from '@/components/ui/modal';
import { useAuth } from '@/features/auth/auth-provider';
import { HeaderPreferences } from './header-preferences';
import styles from './public-header.module.scss';

export function PublicHeader() {
  const {
    messages: { landing: t, nav },
  } = useI18n();
  const { user } = useAuth();
  const [menu, setMenu] = useState(false);

  // The bar retreats while you read downwards and returns the moment you
  // scroll up. It never disappears just because the page stopped moving.
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setIsVisible(true);
        lastScrollRef.current = y;
        return;
      }
      const delta = y - lastScrollRef.current;
      if (Math.abs(delta) < 6) return;
      setIsVisible(delta < 0);
      lastScrollRef.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#features', label: t.features },
    { href: '#courses', label: t.courses },
    { href: '#community', label: t.community },
    { href: '#about', label: t.about },
  ];

  // Динамически добавляем класс скрытия, если isVisible === false
  const headerBarClassName = `${styles.headerBar} ${!isVisible ? styles.headerBarHidden : ''}`;

  return (
    <>
      {/* Применили динамический класс */}
      <div className={headerBarClassName}>
        {/* Reading progress: fills as the page scrolls (pure CSS). */}
        <span className={styles.scrollProgress} aria-hidden="true" />
        <header className={styles.header}>
          <Logo />
          <nav className={styles.desktopNav} aria-label={nav.navigation}>
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className={styles.headerActions}>
            <span className={styles.desktopPreferences}>
              <HeaderPreferences />
            </span>
            {user ? (
              <LinkButton href="/dashboard" className={styles.headerStart}>
                {nav.dashboard}
              </LinkButton>
            ) : (
              <>
                <LinkButton
                  href="/login"
                  variant="ghost"
                  className={styles.headerLogin}
                >
                  {t.login}
                </LinkButton>
                <LinkButton href="/register" className={styles.headerStart}>
                  {t.start}
                </LinkButton>
              </>
            )}
            <span className={styles.menuButton}>
              <IconButton label={nav.menu} onClick={() => setMenu(true)}>
                <Menu size={21} />
              </IconButton>
            </span>
          </div>
        </header>
      </div>

      <Modal open={menu} onClose={() => setMenu(false)} title={nav.menuTitle}>
        <nav className={styles.mobileMenu}>
          <HeaderPreferences />
          {links.map((link) => (
            <a href={link.href} key={link.href} onClick={() => setMenu(false)}>
              {link.label}
            </a>
          ))}
          {user ? (
            <LinkButton href="/dashboard" onClick={() => setMenu(false)}>
              {nav.dashboard}
            </LinkButton>
          ) : (
            <>
              <LinkButton
                href="/login"
                variant="secondary"
                onClick={() => setMenu(false)}
              >
                {t.login}
              </LinkButton>
              <LinkButton href="/register" onClick={() => setMenu(false)}>
                {t.start}
              </LinkButton>
            </>
          )}
        </nav>
      </Modal>
    </>
  );
}

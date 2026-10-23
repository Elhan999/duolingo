'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/providers/i18n-provider';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/surface';
import { navigation, type NavigationKey } from './navigation';
import styles from './site-guide.module.scss';

const GROUPS = ['learning', 'connect', 'account'] as const;

const DESCRIPTIONS = {
  dashboard: 'guideDashboard',
  courses: 'guideCourses',
  progress: 'guideProgress',
  friends: 'guideFriends',
  community: 'guideCommunity',
  chats: 'guideChats',
  profile: 'guideProfile',
  settings: 'guideSettings',
} as const satisfies Record<NavigationKey, string>;

/** A map of every section, built from the same list as the sidebar. */
export function SiteGuide({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: NavigationKey;
}) {
  const {
    messages: { nav },
  } = useI18n();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={nav.guideTitle}
      description={nav.guideIntro}
      className={styles.guide}
      footer={<Button onClick={onClose}>{nav.guideDone}</Button>}
    >
      {GROUPS.map((group) => (
        <section key={group} className={styles.group}>
          <h3>{nav[group]}</h3>
          <ul>
            {navigation
              .filter((item) => item.group === group)
              .map(({ key, href, icon: Icon }) => (
                <li key={key} data-active={key === active}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <div>
                    <strong>
                      {nav[key]}
                      {key === active && (
                        <Badge tone="primary">{nav.guideHere}</Badge>
                      )}
                    </strong>
                    <p>{nav[DESCRIPTIONS[key]]}</p>
                  </div>
                  {key !== active && (
                    <Link
                      href={href}
                      className={styles.go}
                      onClick={onClose}
                      aria-label={nav.guideGo + ': ' + nav[key]}
                    >
                      {nav.guideGo}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </section>
      ))}
    </Modal>
  );
}

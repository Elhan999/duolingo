type Theme = 'light' | 'dark' | 'system';

// Switches the theme as a soft cross-fade of the whole page where the browser
// supports View Transitions; elsewhere, and for people who prefer less motion,
// it simply switches.
export function changeTheme(value: Theme, setTheme: (value: Theme) => void) {
  const apply = () => {
    // Paint the new theme right away, inside the transition's update, so the
    // "after" snapshot is correct and rapid clicks always land in order. The
    // theme library then stores the choice and sets the same attribute.
    const resolved =
      value === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : value;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
    setTheme(value);
  };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || typeof document.startViewTransition !== 'function') {
    apply();
    return;
  }
  document.startViewTransition(apply);
}

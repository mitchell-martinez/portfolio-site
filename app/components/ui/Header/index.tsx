import { memo, useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ButtonLink } from '~/components/ui/ButtonLink/';
import styles from './Header.module.scss';

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/projects' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Articles', href: '/blog' },
];

const SunIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const DESKTOP_QUERY = '(min-width: 1024px)';

function resolveTheme(): 'dark' | 'light' {
  if (typeof document === 'undefined') return 'dark';

  const htmlTheme = document.documentElement.getAttribute('data-theme');
  if (htmlTheme === 'light' || htmlTheme === 'dark') {
    return htmlTheme;
  }

  try {
    const storedTheme = localStorage.getItem('portfolio-theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  } catch {
    // localStorage may be unavailable in some contexts
  }

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'dark';
}

function isNavItemActive(currentPath: string, itemHref: string): boolean {
  if (itemHref === '/') {
    return currentPath === '/';
  }
  return currentPath === itemHref || currentPath.startsWith(`${itemHref}/`);
}

const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const resolvedTheme = resolveTheme();
    setTheme(resolvedTheme);
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMobileMenuOpen(false);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch {
      // localStorage may be unavailable in some contexts
    }
  }, [theme]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleNavClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} role="banner">
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="Mitchell Martinez - Home">
          <span className={styles.logoText}>MM</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList} role="list">
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`${styles.navLink} ${isNavItemActive(location.pathname, item.href) ? styles.navLinkActive : ''}`}
                  onClick={handleNavClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <ButtonLink
            to="/contact"
            variant="primary"
            size="sm"
            className={styles.ctaButton}
            aria-label="Go to the Contact page"
          >
            Get In Touch
          </ButtonLink>
        </div>

        <button
          className={`${styles.themeToggle} ${styles.mobileThemeToggle}`}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-menu"
        >
          <span
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className={`${styles.mobileMenu} ${styles.mobileMenuOpen}`}>
          <nav aria-label="Mobile navigation">
            <ul className={styles.mobileNavList} role="list">
              {navItems.map(item => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`${styles.mobileNavLink} ${isNavItemActive(location.pathname, item.href) ? styles.navLinkActive : ''}`}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
});

Header.displayName = 'Header';

export { Header };

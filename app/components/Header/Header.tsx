import { memo, useState, useCallback, useEffect } from 'react';
import styles from './Header.module.scss';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Sync React state with the data-theme already set by the anti-FOUC script.
  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light' || current === 'dark') {
      setTheme(current);
    }
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
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={styles.container}>
        <a href="#" className={styles.logo} aria-label="Mitchell Martinez - Home">
          <span className={styles.logoText}>MM</span>
        </a>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList} role="list">
            {navItems.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={styles.navLink}
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
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

          <a
            href="mailto:mitchell@mitchellmartinez.tech"
            className={styles.ctaButton}
            aria-label="Contact Mitchell via email"
          >
            Get in Touch
          </a>
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-menu"
        >
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`} aria-hidden="true" />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavList} role="list">
            {navItems.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={handleNavClick}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export { Header };

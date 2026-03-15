'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/calculator', label: 'ROI Calculator' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Be More Design Studio Home">
          <div className={styles.logoMark}>
            {/* SVG mark derived from logo geometry */}
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Left tall pillar */}
              <rect x="2" y="6" width="5" height="28" rx="1" stroke="#C4922A" strokeWidth="1.2" fill="none"/>
              {/* Right arch */}
              <path d="M12 34 V14 Q12 6 19 6 Q26 6 26 14 V34" stroke="#C4922A" strokeWidth="1.2" fill="none"/>
              {/* Gold fill arch */}
              <path d="M14.5 34 V15.5 Q14.5 8.5 19 8.5 Q23.5 8.5 23.5 15.5 V34 Z" fill="#C4922A" opacity="0.85"/>
              {/* Semicircle base */}
              <path d="M2 34 Q2 28 7 28 Q12 28 12 34" fill="#C4922A" opacity="0.6"/>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoMain}>beMore</span>
            <span className={styles.logoSub}>DESIGN STUDIO</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.links} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ''} ${link.href === '/calculator' ? styles.cta : ''}`}
            >
              {link.label}
              {link.href === '/calculator' && <span className={styles.ctaBadge}>NEW</span>}
            </Link>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobile} ${menuOpen ? styles.mobileOpen : ''}`} aria-hidden={!menuOpen}>
        <nav>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileCta}>
          <Link href="/calculator" className="btn btn-primary">
            Calculate Your ROI →
          </Link>
        </div>
      </div>
    </header>
  );
}

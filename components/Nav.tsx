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
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
  { href: '/calculator', label: 'Budget Estimator' },
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

  const leftLinks = NAV_LINKS.slice(0, 3);
  const rightLinks = NAV_LINKS.slice(3);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Desktop Left Nav */}
        <nav className={`${styles.links} ${styles.linksLeft}`} aria-label="Main navigation left">
          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logo (Centered) */}
        <Link href="/" className={styles.logo} aria-label="beMore Design Studio Home">
          <img src="/logo-main.png" alt="beMore Design Studio" className={styles.logoImage} />
        </Link>

        {/* Desktop Right Nav */}
        <nav className={`${styles.links} ${styles.linksRight}`} aria-label="Main navigation right">
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ''} ${link.href === '/calculator' ? styles.cta : ''}`}
            >
              {link.label}
              {link.href === '/calculator' && <span className={styles.ctaBadge}>BETA</span>}
            </Link>
          ))}
        </nav>

        {/* Hamburger (Mobile only) */}
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
        <nav className={styles.mobileNav}>
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
          <Link href="/calculator" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            Budget Estimator →
          </Link>
        </div>

        <div className={styles.mobileContact}>
          <span className={styles.mobileContactTitle}>Get in touch</span>
          <a href="tel:+919663424256" className={styles.mobileContactInfo}>+91 96634 24256</a>
          <a href="mailto:hello@bemoredeisgnstudio.com" className={styles.mobileContactInfo}>hello@bemoredeisgnstudio.com</a>
        </div>
      </div>
    </header>
  );
}

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link href="/" className={styles.footerLogo}>
            <img src="/logo-main.png" alt="beMore Design Studio" className={styles.footerLogoImage} />
          </Link>
          <p className={styles.tagline}>
            Innovative Architecture and Interior Design for Modern Living.
            <br />
            <span className={styles.taglineGold}>Design Without Limits.</span>
          </p>
          <div className={styles.contact}>
            <a href="tel:+919663424256">+91 96634 24256</a>
            <a href="mailto:hello@bemoredeisgnstudio.com">hello@bemoredeisgnstudio.com</a>
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.col}>
            <h4>Studio</h4>
            <Link href="/about">About Us</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className={styles.col}>
            <h4>Tools</h4>
            <Link href="/calculator">Budget Estimator</Link>
            <Link href="/services">Our Services</Link>
            <Link href="/portfolio">Portfolio</Link>
          </div>
          <div className={styles.col}>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 beMore Design Studio. Design Without Limits.</p>
        <p className={styles.legal}>
          <Link href="/privacy">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms">Terms</Link>
          <span>·</span>
          <Link href="/sitemap.xml">Sitemap</Link>
        </p>
      </div>
    </footer>
  );
}

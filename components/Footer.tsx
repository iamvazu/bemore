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
            <Link href="/faq">FAQ</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className={styles.col}>
            <h4>Tools</h4>
            <Link href="/calculator">Budget Estimator</Link>
            <Link href="/guides/design">Design Guides</Link>
            <Link href="/guides/buying">Buying Guides</Link>
            <Link href="/blog">Blogs</Link>
          </div>
          <div className={styles.col}>
            <h4>Customer Support</h4>
            <Link href="/contact">Raise issue</Link>
            <Link href="/contact">My issues</Link>
            <Link href="/contact">Contact us</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/faq">FAQs</Link>
          </div>
          <div className={styles.col}>
            <h4>Locations Served</h4>
            <span className={styles.locItem}>Indiranagar</span>
            <span className={styles.locItem}>Koramangala</span>
            <span className={styles.locItem}>HSR Layout</span>
            <span className={styles.locItem}>Whitefield</span>
            <span className={styles.locItem}>Bellandur</span>
            <span className={styles.locItem}>Sarjapur Road</span>
            <span className={styles.locItem}>JP Nagar</span>
            <span className={styles.locItem}>Hebbal</span>
            <span className={styles.locItem}>North Bangalore</span>
            <span className={styles.locItem}>Electronic City</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>Copyright © beMore Design Studio Private Limited. All rights reserved.</p>
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

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
              <rect x="2" y="6" width="5" height="28" rx="1" stroke="#C4922A" strokeWidth="1.2" fill="none"/>
              <path d="M12 34 V14 Q12 6 19 6 Q26 6 26 14 V34" stroke="#C4922A" strokeWidth="1.2" fill="none"/>
              <path d="M14.5 34 V15.5 Q14.5 8.5 19 8.5 Q23.5 8.5 23.5 15.5 V34 Z" fill="#C4922A" opacity="0.85"/>
              <path d="M2 34 Q2 28 7 28 Q12 28 12 34" fill="#C4922A" opacity="0.6"/>
            </svg>
            <div>
              <span className={styles.logoMain}>beMore</span>
              <span className={styles.logoSub}>DESIGN STUDIO</span>
            </div>
          </div>
          <p className={styles.tagline}>
            Architecture & Interiors. Bengaluru.
            <br />
            <span className={styles.taglineGold}>Design is your highest-returning asset.</span>
          </p>
          <div className={styles.contact}>
            <a href="tel:+918000000000">+91 80 0000 0000</a>
            <a href="mailto:hello@bemoredesign.in">hello@bemoredesign.in</a>
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
            <Link href="/calculator">ROI Calculator</Link>
            <Link href="/calculator?locality=whitefield">Whitefield Estimator</Link>
            <Link href="/calculator?locality=indiranagar">Indiranagar Estimator</Link>
            <Link href="/calculator?locality=sarjapur">Sarjapur Estimator</Link>
          </div>
          <div className={styles.col}>
            <h4>Localities</h4>
            <Link href="/roi/interior-design-whitefield">Whitefield</Link>
            <Link href="/roi/interior-design-indiranagar">Indiranagar</Link>
            <Link href="/roi/interior-design-sarjapur">Sarjapur Road</Link>
            <Link href="/roi/interior-design-bellandur">Bellandur</Link>
            <Link href="/roi/interior-design-koramangala">Koramangala</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Be More Design Studio. All rights reserved.</p>
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

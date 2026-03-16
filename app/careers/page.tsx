import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './careers.module.css';

export default function CareersPage() {
  return (
    <main className={styles.page}>
      <Nav />
      
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src="/images/careers-hero.jpg" className={styles.heroImg} alt="beMore Design Studio Office" />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <div className="gold-line" />
            <span className="tag">Join the Studio</span>
            <h1 className={styles.title}>Build the Future of <em className="text-gold">Architecture</em></h1>
            <p className={styles.subtitle}>
              We are looking for bold thinkers who believe design is an asset, not an expense. 
              Join a data-driven studio redefining the Indian luxury landscape.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.positions}>
        <div className="container">
          <div className={styles.emptyState}>
            <h3>Cultivating New Talent</h3>
            <p>We are currently finalizing our 2026 expansion roadmap. Check back soon for senior architect and interior design positions.</p>
            <a href="mailto:careers@bemoredesignstudio.com" className="btn btn-outline">Send Us Your Portfolio</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './careers.module.css';

export default function CareersPage() {
  return (
    <main className={styles.page}>
      <Nav />
      
      <section className="hero-layout">
        <div className="hero-media-wrapper">
          <img src="/images/careers-hero.jpg" className={styles.heroImg} alt="beMore Design Studio Office" />
          <div className="hero-scrim" />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className={styles.heroContent}>
            <span className="tag" style={{ marginBottom: '1.5rem' }}>Join the Studio</span>
            <h1 className="display-h1">
              Build the Future of 
              <br />
              <em>Architecture.</em>
            </h1>
            <p className="hero-subtext">
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

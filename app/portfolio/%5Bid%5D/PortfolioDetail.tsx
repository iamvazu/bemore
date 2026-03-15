'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './detail.module.css';

interface Props {
  project: any;
}

export default function PortfolioDetail({ project }: Props) {
  return (
    <main className={styles.page}>
      <Nav />
      
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <img src={project.image} alt={project.title} className={styles.heroImage} />
          <div className={styles.heroOverlay} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="tag">{project.location} // {project.type}</span>
            <h1 className={styles.title}>{project.title}</h1>
            <div className={styles.heroStats}>
              <div className={styles.statUnit}>
                <span className={styles.statVal}>{project.roi}</span>
                <span className={styles.statLab}>Resale ROI</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statUnit}>
                <span className={styles.statVal}>{project.rental}</span>
                <span className={styles.statLab}>Rental Yield</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.textContent}>
              <div className={styles.block}>
                <div className="gold-line" />
                <h2>The Investment Challenge</h2>
                <p>{project.challenge}</p>
              </div>
              
              <div className={styles.block}>
                <div className="gold-line" />
                <h2>The Be More Intervention</h2>
                <p>{project.solution}</p>
              </div>

              <div className={styles.ctaCard}>
                <h3>Ready to replicate these results?</h3>
                <p>Calculate the specific ROI potential for your property in {project.location}.</p>
                <Link href={`/calculator?locality=${project.location.toLowerCase()}`} className="btn btn-primary">
                  Run {project.location} Estimator →
                </Link>
              </div>
            </div>

            <div className={styles.sidebar}>
              <div className={styles.metricCard}>
                <h4>Equity Audit</h4>
                <div className={styles.metricRow}>
                  <span>Investment</span>
                  <strong>{project.stats.invested}</strong>
                </div>
                <div className={styles.metricRow}>
                  <span>Equity Gain</span>
                  <strong>{project.stats.equityGain}</strong>
                </div>
                <div className={styles.metricRow}>
                  <span>Payback Period</span>
                  <strong>{project.stats.payback}</strong>
                </div>
              </div>

              <div className={styles.expertQuote}>
                <p>&quot;The intervention here wasn&apos;t just aesthetic. By solving for the noise floor in {project.location}, we unlocked 12% in latent property value.&quot;</p>
                <cite>— Principal Designer, Be More</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.galleryGrid}>
             <div className={styles.galItem}><img src={project.image} alt="Detail" /></div>
             <div className={styles.galItem}><img src={project.image} alt="Detail" /></div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

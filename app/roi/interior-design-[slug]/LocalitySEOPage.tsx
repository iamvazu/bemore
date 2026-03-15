'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { LocalityData } from '@/lib/localities';
import styles from './locality.module.css';

interface Props {
  locality: LocalityData;
}

export default function LocalitySEOPage({ locality }: Props) {
  return (
    <main className={styles.page}>
      <Nav />
      
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className="gold-line" />
            <span className="tag">Market Report: {locality.displayName}</span>
            <h1 className={styles.title}>
              Designing for Equity in
              <br />
              <em className="text-gold">{locality.displayName}.</em>
            </h1>
            <p className={styles.subtitle}>
              {locality.description} Properties in this micro-market currently command 
              a premium for <strong>{locality.trendingStyle}</strong> aesthetics.
            </p>
            <div className={styles.heroActions}>
              <Link href={`/calculator?locality=${locality.id}`} className="btn btn-primary btn-lg">
                Calculate {locality.displayName} ROI →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.statsSection} section--sm`}>
        <div className="container">
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Avg Price / Sq.ft</span>
              <span className={styles.statValue}>₹{locality.pricePerSqFt.toLocaleString()}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Resale Factor</span>
              <span className={styles.statValue}>{locality.localityFactor}x</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Quiet Premium</span>
              <span className={styles.statValue}>+{((locality.quietPremiumMultiplier - 1) * 100).toFixed(0)}%</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>WFH Demand</span>
              <span className={styles.statValue}>{(locality.wfhDemand * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <h2>The {locality.displayName} Investment Thesis</h2>
              <p>
                In {locality.displayName}, the gap between a standard apartment and a strategically designed 
                "Hybrid" asset is widening. Market data suggests that buyers in this area prioritize 
                acoustic insulation and high-performance WFH zones due to the local noise floor 
                and tech-centric resident profile.
              </p>
              <p>
                Our data-driven design interventions in {locality.displayName} focus on:
              </p>
              <ul className={styles.featureList}>
                {locality.recommendedModules.map((mod) => (
                  <li key={mod} className={styles.featureItem}>
                    <strong>{mod.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> 
                    Calibrated specifically for {locality.displayName} market velocity.
                  </li>
                ))}
                <li className={styles.featureItem}>
                  <strong>Bespoke Joinery:</strong> Increasing capital appreciation beyond standard modular.
                </li>
              </ul>
            </div>
            <div className={styles.visualCard}>
              <div className={styles.glassInner}>
                <h3>Typical {locality.displayName} Recovery</h3>
                <div className={styles.recoveryPath}>
                  <div className={styles.pathItem}>
                    <span className={styles.pathLabel}>Year 1</span>
                    <span className={styles.pathAmount}>₹{Math.round(locality.pricePerSqFt * 1.08).toLocaleString()} / sqft</span>
                  </div>
                  <div className={styles.pathItemActive}>
                    <span className={styles.pathLabel}>Year 3</span>
                    <span className={styles.pathAmount}>₹{Math.round(locality.pricePerSqFt * 1.25).toLocaleString()} / sqft</span>
                  </div>
                  <div className={styles.pathItem}>
                    <span className={styles.pathLabel}>Year 5</span>
                    <span className={styles.pathAmount}>₹{Math.round(locality.pricePerSqFt * 1.45).toLocaleString()} / sqft</span>
                  </div>
                </div>
                <p className={styles.visualNote}>*Projected based on Be More Design Equity™ historical data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Deploy your capital wisely in {locality.displayName}.</h2>
            <p>Get a personalized ROI projection for your property in minutes.</p>
            <Link href="/calculator" className="btn btn-primary btn-lg">Run the AI Calculator</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

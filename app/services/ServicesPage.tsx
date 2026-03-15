'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './services.module.css';

const PACKAGES = [
  {
    id: 'modular-plus',
    name: 'Modular Plus',
    tagline: 'Efficiency Redefined',
    price: '₹12L - ₹25L',
    roiFactor: '0.85x',
    features: [
      'High-Grade Modular Kitchen & Wardrobes',
      'Basic Smart Lighting',
      'Standard Painting & False Ceiling',
      '3-Year Warranty',
      'Market-Ready Compliance'
    ],
    bestFor: 'Rental Properties & Entry-Level Homes'
  },
  {
    id: 'bespoke-hybrid',
    name: 'Be More Hybrid™',
    tagline: 'The Maximum ROI Tier',
    price: '₹25L - ₹55L',
    roiFactor: '1.20x',
    isPopular: true,
    features: [
      'Precision Modular + Custom Joinery',
      'Acoustic Master Suite (UPVC + Paneling)',
      'Professional WFH Studio Setup',
      'Intermediate Smart Automation',
      'Design Audit Report (for Resale)',
      '10-Year Transferable Warranty'
    ],
    bestFor: 'HNWIs & Savvy Homeowners in Primary Micro-markets'
  },
  {
    id: 'luxury-bespoke',
    name: 'Luxury Bespoke',
    tagline: 'The Ultimate Lifestyle Asset',
    price: '₹60L+',
    roiFactor: '1.10x*',
    note: '*Higher absolute value, medium maintenance',
    features: [
      'Fully Custom Architecture & Interiors',
      'Italian Marble & Rare Veneers',
      'KNX Full Home Automation',
      'Advanced Acoustic Engineering',
      'Concierge Maintenance Program',
      'Portfolio-Grade Case Study'
    ],
    bestFor: 'Luxury Villas & High-End Penthouses'
  }
];

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className={styles.page}>
      <Nav />
      
      <section className={styles.hero}>
        <div className="container">
          <div className={`${styles.heroContent} ${mounted ? styles.animate : ''}`}>
            <div className="gold-line" />
            <span className="tag">Strategic Packages</span>
            <h1 className={styles.title}>
              Three Tiers of
              <br />
              <em className="text-gold">Home Equity.</em>
            </h1>
            <p className={styles.subtitle}>
              We don&apos;t just sell furniture. We offer strategic design interventions 
              calibrated for the Bengaluru real estate market.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.packageSection}>
        <div className="container">
          <div className={styles.packageGrid}>
            {PACKAGES.map((pkg, idx) => (
              <div 
                key={pkg.id} 
                className={`${styles.packageCard} ${pkg.isPopular ? styles.popular : ''}`}
                style={{ 
                  animationDelay: `${idx * 150}ms`,
                  opacity: mounted ? 1 : 0
                }}
              >
                {pkg.isPopular && <div className={styles.popularBadge}>Most Recommended</div>}
                <div className={styles.cardHeader}>
                  <h3 className={styles.packageName}>{pkg.name}</h3>
                  <p className={styles.packageTagline}>{pkg.tagline}</p>
                </div>
                <div className={styles.priceSection}>
                  <span className={styles.priceLabel}>Investment starts at</span>
                  <span className={styles.priceValue}>{pkg.price}</span>
                </div>
                <div className={styles.roiMetric}>
                  <div className={styles.roiValue}>{pkg.roiFactor}</div>
                  <div className={styles.roiLabel}>ROI Factor</div>
                  {pkg.note && <div className={styles.roiNote}>{pkg.note}</div>}
                </div>
                <ul className={styles.featureList}>
                  {pkg.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
                <div className={styles.bestFor}>
                  <strong>Best for:</strong> {pkg.bestFor}
                </div>
                <Link href={`/contact?package=${pkg.id}`} className={`btn ${pkg.isPopular ? 'btn-primary' : 'btn-ghost'} ${styles.ctaBtn}`}>
                  Select Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.expertModules}>
        <div className="container">
          <div className={styles.moduleHeader}>
            <div className="gold-line gold-line--center" />
            <h2 className={styles.moduleTitle}>Expert Value-Add Addons</h2>
            <p className={styles.moduleSubtitle}>Enhance any package with our targeted ROI modules.</p>
          </div>
          <div className={styles.moduleGrid}>
            <div className={styles.moduleCard}>
              <div className={styles.moduleIcon}>🔇</div>
              <h4>Acoustic Engineering</h4>
              <p>Command a 15% quiet premium in noisy localities like Indiranagar or Bellandur.</p>
            </div>
            <div className={styles.moduleCard}>
              <div className={styles.moduleIcon}>🖥️</div>
              <h4>Professional WFH</h4>
              <p>Increase rental yield by 12% with high-CRI lighting and Zoom-ready backgrounds.</p>
            </div>
            <div className={styles.moduleCard}>
              <div className={styles.moduleIcon}>🤖</div>
              <h4>Smart Automation</h4>
              <p>Certified KNX/Control4 integration to boost capital appreciation in tech corridors.</p>
            </div>
            <div className={styles.moduleCard}>
              <div className={styles.moduleIcon}>📑</div>
              <h4>Documentation Locker</h4>
              <p>Professional Design Audit reports that make your property 22% more liquid.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

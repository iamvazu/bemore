'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './careers.module.css';

const POSITIONS = [
  {
    title: 'Interior Designer',
    location: 'Bengaluru, India',
    type: 'Full-time',
    experience: '2-4 Years',
    description: 'We are looking for an Interior Designer with a strong eye for detail, material resonance, and spatial flow. You will lead residential & commercial high-end styling projects from conceptual mood boards to turnkey handover.',
    features: [
      'Develop 2D drawings & 3D visualizations.',
      'Curate material narratives (stones, veneers, fixtures).',
      'Coordinate with site vendors to ensure millimetre-accurate execution.'
    ]
  },
  {
    title: 'Intern Interior Designer',
    location: 'Bengaluru, India',
    type: 'Internship (6 Months)',
    experience: 'Fresher / Final Year',
    description: 'An immersive 6-month internship for aspiring designers to learn the Hybrid Design methodology. Support our core design crew across design diagnostics, client brief renders, and material boards crafting.',
    features: [
      'Assist in creating CAD plans and SketchUp/V-Ray models.',
      'Maintain the material library and organize sample catalogs.',
      'Participate in site visits to observe execution compliance first-hand.'
    ]
  }
];

export default function CareersPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className={styles.page}>
      <Nav />
      
      <section className={styles.hero}>
        <div className={styles.heroMediaWrapper}>
          <img src="/images/careers-hero.jpg" className={styles.heroBgImage} alt="beMore Design Studio Office" />
          <div className={styles.heroScrim} />
        </div>
        
        <div className="container" style={{ position: 'relative', height: '100%', zIndex: 10, display: 'flex', alignItems: 'flex-end', paddingBottom: '8vh' }}>
          <div className={styles.heroInner}>
            <div className={`${styles.heroContent} ${mounted ? styles.heroVisible : ''}`}>
              <h1 className={styles.heroHeadline}>
                Build the Future of 
                <br />
                <em className="text-secondary-cormorant">Architecture.</em>
              </h1>
              <p className={styles.heroQuietSubtitle}>
                We are looking for bold thinkers who believe design is an asset, not an expense. 
                Join a studio redefining the Indian luxury landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.positions} section`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className="gold-line" />
            <span className="tag">Open Positions</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '0.5rem', marginBottom: '3rem', fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-display)', fontWeight: 300 }}>Apply with portfolio</h2>
          </div>

          <div className={styles.list}>
            {POSITIONS.map((pos) => (
              <div key={pos.title} className={styles.jobCard}>
                <div className={styles.jobHeading}>
                  <div>
                    <h3 className={styles.jobTitle}>{pos.title}</h3>
                    <div className={styles.jobMeta}>
                      <span>📍 {pos.location}</span>
                      <span>💼 {pos.type}</span>
                      <span>⏳ {pos.experience}</span>
                    </div>
                  </div>
                  <a href={`mailto:careers@bemoredesignstudio.com?subject=Job Application: ${pos.title}`} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                    Apply Now
                  </a>
                </div>
                <p className={styles.jobDesc}>{pos.description}</p>
                <ul className={styles.jobFeatures}>
                  {pos.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

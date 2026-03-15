'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './portfolio.module.css';

const PROJECTS = [
  {
    id: 'whitefield-villa',
    title: 'The Obsidian Villa',
    location: 'Whitefield',
    type: 'Luxury Villa',
    image: '/portfolio-whitefield.jpg',
    roi: '+28%',
    rental: '+9.4%',
    tag: 'Bespoke Hybrid',
    description: 'A dark-luxury intervention for a tech founder. Features integrated KNX automation and fluted acoustic panels.',
  },
  {
    id: 'indiranagar-bedroom',
    title: 'The Heritage Master',
    location: 'Indiranagar',
    type: 'Premium Apartment',
    image: '/portfolio-indiranagar.jpg',
    roi: '+35%',
    rental: '+12.6%',
    tag: 'Luxury Heritage',
    description: 'Combining colonial-era charm with modernist materials. Certified quiet premium through acoustic headboards.',
  },
  {
    id: 'koramangala-kitchen',
    title: 'Chef\'s Jewel',
    location: 'Koramangala',
    type: 'Penthouse',
    image: '/portfolio-koramangala.jpg',
    roi: '+24%',
    rental: '+8.2%',
    tag: 'Bespoke Joinery',
    description: 'A precision-engineered modular kitchen with Italian marble surfaces. High-value procurement realized.',
  },
  {
    id: 'bellandur-wfh',
    title: 'The Zoom Studio',
    location: 'Bellandur',
    type: 'Tech Apartment',
    image: '/portfolio-bellandur.jpg',
    roi: '+22%',
    rental: '+14.5%',
    tag: 'WFH Intensity',
    description: 'A professional-grade home office with custom acoustic treatment and broadcast-ready lighting.',
  },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ['All', 'Luxury Villa', 'Premium Apartment', 'Penthouse', 'Tech Apartment'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.type === filter);

  return (
    <main className={styles.page}>
      <Nav />
      
      <section className={styles.hero}>
        <div className="container">
          <div className={`${styles.heroContent} ${mounted ? styles.animate : ''}`}>
            <div className="gold-line" />
            <span className="tag">Selection 2026</span>
            <h1 className={styles.title}>
              Portfolio of
              <br />
              <em className="text-gold">Investing in Design</em>
            </h1>
            <p className={styles.subtitle}>
              Every project in our portfolio is a case study in property appreciation. 
              We don&apos;t just build rooms; we create equity.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button 
                key={cat} 
                className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.projectGrid}>
            {filteredProjects.map((project, idx) => (
              <div 
                key={project.id} 
                className={styles.projectCard}
                style={{ 
                  animationDelay: `${idx * 150}ms`,
                  opacity: mounted ? 1 : 0 
                }}
              >
                <div className={styles.imageWrapper}>
                  <img src={project.image} alt={project.title} className={styles.image} />
                  <div className={styles.overlay}>
                    <div className={styles.roiStats}>
                      <div className={styles.statItem}>
                        <span className={styles.statValue}>{project.roi}</span>
                        <span className={styles.statLabel}>Resale ROI</span>
                      </div>
                      <div className={styles.statDivider} />
                      <div className={styles.statItem}>
                        <span className={styles.statValue}>{project.rental}</span>
                        <span className={styles.statLabel}>Yield Premium</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tagPill}>{project.tag}</div>
                </div>
                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span className={styles.location}>{project.location}</span>
                    <span className={styles.type}>{project.type}</span>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                  <Link href={`/portfolio/${project.id}`} className={styles.viewLink}>
                    View Case Study <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to see these numbers in <em className="text-gold">your</em> property?</h2>
            <div className={styles.ctaActions}>
              <Link href="/calculator" className="btn btn-primary btn-lg">Run Calculator →</Link>
              <Link href="/contact" className="btn btn-ghost btn-lg">Inquire About Services</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

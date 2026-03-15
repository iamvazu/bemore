'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './portfolio.module.css';

const PROJECTS = [
  {
    id: 'whitefield-villa',
    title: 'The Minimalist Villa',
    location: 'Whitefield',
    type: 'Residential',
    image: '/portfolio-whitefield.jpg',
    roi: '+28%',
    rental: '+9.4%',
    tag: 'Architectural',
    description: 'A clean, minimalist intervention focusing on light and spatial flow in Whitefield.',
  },
  {
    id: 'indiranagar-penthouse',
    title: 'Penthouse Elevation',
    location: 'Indiranagar',
    type: 'Residential',
    image: '/portfolio-indiranagar.jpg',
    roi: '+35%',
    rental: '+12.6%',
    tag: 'Bespoke',
    description: 'Modern elevation and interior styling for a flagship penthouse in Indiranagar.',
  },
  {
    id: 'collaborative-hub',
    title: 'The Collaborative Hub',
    location: 'Bengaluru',
    type: 'Commercial',
    image: '/portfolio-koramangala.jpg',
    roi: '+24%',
    rental: '+15.2%',
    tag: 'Office',
    description: 'A high-performance workspace designed to foster productivity and brand identity.',
  },
  {
    id: 'retail-studio',
    title: 'Modernist Retail Studio',
    location: 'Bengaluru',
    type: 'Commercial',
    image: '/portfolio-bellandur.jpg',
    roi: '+22%',
    rental: '+18.5%',
    tag: 'Retail',
    description: 'Sophisticated retail environment that reflects contemporary lifestyle and design excellence.',
  },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ['All', 'Residential', 'Commercial'];

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
              Our Narrative in
              <br />
              <em className="text-gold">Spaces.</em>
            </h1>
            <p className={styles.subtitle}>
              A showcase of residential and commercial excellence.
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

      <div className={styles.projectBrief}>
        <div className="container">
          <div className="gold-line gold-line--center" />
          <p className={styles.briefText}>
            &quot;Every project in our portfolio represents a unique challenge met with an innovative solution. We prioritize light, ventilation, and smart functionality in every square foot.&quot;
          </p>
        </div>
      </div>

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

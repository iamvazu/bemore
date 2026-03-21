'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './services.module.css';

const SERVICES_DETAILED = [
  {
    id: 'architecture',
    number: '01',
    title: 'Architectural Design',
    subtitle: 'Crafting the structural narrative of your home.',
    description: 'We provide full-scale architectural planning tailored for the Indian climate, focusing on structural integrity and spatial flow. Our approach balances aesthetics with real-world sustainability.',
    features: ['Spatial Optimization', 'Climate Calibration', 'Structural Engineering', 'BIM Modelling']
  },
  {
    id: 'interiors',
    number: '02',
    title: 'Interior Design & Styling',
    subtitle: 'Tactile environments designed for high-end living.',
    description: 'Elevating interiors into immersive tactile experiences. We curate palettes, textures, and bespoke furniture layouts that reflect a sophisticated, contemporary lifestyle calibrated for comfort.',
    features: ['Material Resonance', 'Bespoke Joinery', 'Mood Engineering', 'Lighting Calibration']
  },
  {
    id: 'commercial',
    number: '03',
    title: 'Commercial & Retail Spaces',
    subtitle: 'High-performance spaces tailored for peak output.',
    description: 'Designing high-performance environments that translate into brand equity. We focus on enhancing productivity, spatial flow, and workflow ergonomics while maintaining aesthetic intent.',
    features: ['Workflow Ergonomics', 'Experience Mapping', 'Yield Optimization', 'Brand Identity Mesh']
  },
  {
    id: 'project-management',
    number: '04',
    title: 'Project Management & Consultation',
    subtitle: 'Frictionless execution backed by absolute transparency.',
    description: 'Design without the stress. We oversee every technical precision of the build, guaranteeing that the transition from concept to turnkey reality is seamless, timely, and budget-transparent.',
    features: ['Timeline Compliance', 'Rate Integrity Audits', 'Quality-Control Checks', 'Procurement Transparency']
  },
  {
    id: 'hospitality',
    number: '05',
    title: 'Hospitality — Cafes & Hotels',
    subtitle: 'Atmosphere architecture curated for experience.',
    description: 'Mood architecture calibrated to foster hospitality loyalty. We design intimate café spaces and boutique hotel frameworks that drive customer yield and operational compliance smoothly.',
    features: ['Spatial Branding', 'Guest Experience Mapping', 'Operational Ergonomics', 'Atmosphere Engineering']
  },
  {
    id: 'renovation',
    number: '06',
    title: 'Renovation & Refurbishment',
    subtitle: 'Modernizing assets for command asset premiums.',
    description: 'Breathing immersive life back into existing footprints. Whether a single asset or full-property overhaul, we approached every retrofit with the precision maintenance intended for cap-appreciation.',
    features: ['Structural Upgrades', 'Compliance Tuning', 'Asset Premium Retrofits', 'Modern Grid Overhaul']
  }
];

const TURNKEY_SERVICES = [
  { icon: '📋', title: 'Project Management' },
  { icon: '✏️', title: 'Design and Execution' },
  { icon: '🪞', title: 'Material Selection' },
  { icon: '🛒', title: 'Procurement' },
  { icon: '🤝', title: 'Vendor Management' },
  { icon: '⚡', title: 'Electrical Services' },
  { icon: '🔧', title: 'Plumbing Services' },
  { icon: '🧱', title: 'Civil Modifications' },
  { icon: '🏗️', title: 'False Ceiling' },
  { icon: '🪚', title: 'On-site Carpentry' },
  { icon: '📐', title: 'Tiling Solutions' },
  { icon: '🛠️', title: 'Fabrication Services' },
  { icon: '🖌️', title: 'Painting Solutions' },
  { icon: '📦', title: 'Modular Fit Outs' },
  { icon: '✅', title: 'Quality Control' },
  { icon: '🎁', title: 'Final Product Delivery' }
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Clarify Intent',
    description: 'We diagnose your property’s absolute potential with targeted yield analytics and aesthetic diagnostic frames.'
  },
  {
    number: '02',
    title: 'Tactical Concept',
    description: 'Formulating fluid wireframe layouts and walkthroughs to calibrate layout framing before execution.'
  },
  {
    number: '03',
    title: 'Material Narrative',
    description: 'We collaborate to curate physical palettes with rare veneers, stones, and gold-clad accent textures on site.'
  },
  {
    number: '04',
    title: 'Turnkey Realization',
    description: 'Precision site site engineering workflows audit regularly to guarantee physical deployment meets frame boundaries exactly.'
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
        <div className={styles.heroMediaWrapper}>
          <img src="/aboutus_page.png" className={styles.heroBgImage} alt="beMore Services Background" />
          <div className={styles.heroScrim} />
        </div>

        <div className="container" style={{ position: 'relative', height: '100%', zIndex: 10, display: 'flex', alignItems: 'flex-end', paddingBottom: '8vh' }}>
          <div className={styles.heroInner}>
            <div className={`${styles.heroContent} ${mounted ? styles.heroVisible : ''}`}>
              
              <h1 className={styles.heroHeadline}>
                Comprehensive
                <br />
                <em className="text-secondary-cormorant">Design Solutions.</em>
              </h1>

              <p className={styles.heroQuietSubtitle}>
                <strong style={{ display: 'block', color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
                  Tactical architecture and interiors calibrated for market appreciation.
                </strong>
                We offer strategic design interventions calibrated for the Indian real estate market smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DETAILED SERVICES ============ */}
      <section className={styles.servicesDetailedSection}>
        <div className="container">
          <div className={styles.detailedHeader}>
            <span className="tag" style={{ marginBottom: '1rem' }}>Expertise</span>
            <h2 className={styles.detailedTitle}>Operational Excellence & <em>Bespoke Craft</em></h2>
          </div>
          
          <div className={styles.servicesStack}>
            {SERVICES_DETAILED.map((service, idx) => (
              <div 
                key={service.id} 
                className={`${styles.serviceCard} ${idx % 2 !== 0 ? styles.serviceCardReverse : ''}`}
                style={{ 
                  opacity: mounted ? 1 : 0, 
                  transform: mounted ? 'translateY(0)' : 'translateY(40px)', 
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 120}ms` 
                }}
              >
                <div className={styles.serviceVisual}>
                  <div className={styles.serviceNumber}>{service.number}</div>
                  <div className={styles.serviceVisualGold} />
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <h4 className={styles.serviceSubtitle}>{service.subtitle}</h4>
                  <p className={styles.serviceDesc}>{service.description}</p>
                  <ul className={styles.serviceFeatures}>
                    {service.features.map((feat, i) => (
                      <li key={i}><span>✦</span> {feat}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS / PHILOSOPHY ============ */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.processHeader}>
            <div className="gold-line gold-line--center" />
            <span className="tag" style={{ marginBottom: '1rem', background: 'transparent', boxShadow: 'none', border: 'none', color: 'var(--text-secondary)' }}>The Framework</span>
            <h2 className={styles.processTitle}>Philosophy in <em>Motion</em></h2>
            <p className={styles.processSubtitle}>From strategic framing to turnkey immersive realization.</p>
          </div>
          
          <div className={styles.processGrid}>
            {PROCESS_STEPS.map((step, idx) => (
              <div 
                key={step.number} 
                className={styles.processItem}
                style={{ 
                  opacity: mounted ? 1 : 0, 
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)', 
                  transition: `all 0.6s ease-out ${idx * 180}ms` 
                }}
              >
                <div className={styles.processNumberWrapper}>
                  <div className={styles.processLine} />
                  <span className={styles.processNumber}>{step.number}</span>
                </div>
                <h3 className={styles.processItemTitle}>{step.title}</h3>
                <p className={styles.processItemDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TURNKEY SERVICES ============ */}
      <section className={styles.turnkeySection}>
        <div className="container">
          <div className={styles.turnkeyHeader}>
            <div className="gold-line gold-line--center" />
            <h2 className={styles.turnkeyTitle}>Turnkey Interior Solutions</h2>
            <p className={styles.turnkeySubtitle}>
              <strong>Excellence from ideation to execution.</strong> At the intersection of lifestyles and design, we streamline that journey for you curating a full-service turnkey solution.
            </p>
          </div>
          
          <div className={styles.turnkeyGrid}>
            {TURNKEY_SERVICES.map((item, idx) => (
              <div key={idx} className={styles.turnkeyItem}>
                <div className={styles.turnkeyIcon}>{item.icon}</div>
                <h4 className={styles.turnkeyItemTitle}>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className={styles.designerCta}>
        <div className="container">
          <div className={styles.designerCtaInner}>
            <div className="gold-line gold-line--center" style={{ marginBottom: '2rem' }} />
            <h2 className={styles.designerCtaTitle}>
              Confused Between Styles, Layouts, and <em>Costs?</em>
            </h2>
            <p className={styles.designerCtaSubtitle}>
              Meet a designer who&apos;ll bring it all together—free. Our consultation sessions are strategic sessions aimed at maximizing your property&apos;s potential.
            </p>
            <Link href="/contact" className={styles.designerBtn}>
              Meet a Designer
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

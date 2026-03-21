'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './services.module.css';
import { 
  Briefcase, Paintbrush, Compass, ShoppingCart, Users, Zap, Wrench, 
  BrickWall, LayoutPanelLeft, Hammer, Ruler, Component, Pipette, 
  Package, CheckCircle, Gift 
} from 'lucide-react';

const SERVICES_DETAILED = [
  {
    id: 'architecture',
    number: '01',
    title: 'Architectural Design',
    subtitle: 'Crafting the structural narrative of your space.',
    description: 'Full-scale architectural planning tailored for environment calibration, focusing on structural harmony and spatial flow. Our approach balances beauty with enduring materials.',
    features: ['Spatial Optimization', 'Climate Calibration', 'Volume Control', 'BIM Modelling'],
    image: '/interiros.png'
  },
  {
    id: 'interiors',
    number: '02',
    title: 'Interior Design & Styling',
    subtitle: 'Tactile environments designed for considered living.',
    description: 'Elevating interiors into immersive tactile experiences. We curate palettes, textures, and bespoke furniture layouts that reflect a sophisticated contemporary lifestyle.',
    features: ['Material Resonance', 'Bespoke Joinery', 'Mood Calibration', 'Lighting Controls'],
    image: '/home_interior.png'
  },
  {
    id: 'commercial',
    number: '03',
    title: 'Commercial & Retail Spaces',
    subtitle: 'Ergonomic environments defining brand clarity.',
    description: 'Designing spaces that translate brand narratives into physical scales. We focus on enhancing productivity, spatial flow, and workflow ergonomics without friction.',
    features: ['Workflow Ergonomics', 'Experience Mapping', 'Proportion Control', 'Brand Identity Mesh'],
    image: '/hospitality2.png'
  },
  {
    id: 'project-management',
    number: '04',
    title: 'Project Management & Consultation',
    subtitle: 'Frictionless execution backed by absolute transparency.',
    description: 'Design without the stress. We oversee every technical precision of the build, guaranteeing that the transition from concept to turnkey reality is seamless and timely.',
    features: ['Timeline Compliance', 'Rate Transparency', 'Quality-Control Checks', 'Procurement Clarity'],
    image: '/home_interiror.png'
  },
  {
    id: 'hospitality',
    number: '05',
    title: 'Hospitality — Cafes & Hotels',
    subtitle: 'Designing atmospheres where memory captures experience.',
    description: 'Mood architecture calibrated to foster hospitality loyalty. We design intimate café spaces and boutique hotel frameworks centered around guest comfort narratives.',
    features: ['Spatial Branding', 'Guest Experience Mapping', 'Operational Efficiency', 'Atmosphere Engineering'],
    image: '/hospitality.png'
  },
  {
    id: 'renovation',
    number: '06',
    title: 'Renovation & Refurbishment',
    subtitle: 'Recreating heritage footprints for modern living.',
    description: 'Breathing immersive life back into existing dimensions. Whether a single room or full-property overhaul, we approach retrofits preserving core architectural aesthetics.',
    features: ['Structural Upgrades', 'Adaptive Re-use', 'Spatial Retrofits', 'Modern Grid Overhaul'],
    image: '/home_interior.png'
  }
];

const TURNKEY_SERVICES = [
  { icon: Briefcase, title: 'Project Management' },
  { icon: Paintbrush, title: 'Design and Execution' },
  { icon: Compass, title: 'Material Selection' },
  { icon: ShoppingCart, title: 'Procurement' },
  { icon: Users, title: 'Vendor Management' },
  { icon: Zap, title: 'Electrical Services' },
  { icon: Wrench, title: 'Plumbing Services' },
  { icon: BrickWall, title: 'Civil Modifications' },
  { icon: LayoutPanelLeft, title: 'False Ceiling' },
  { icon: Hammer, title: 'On-site Carpentry' },
  { icon: Ruler, title: 'Tiling Solutions' },
  { icon: Component, title: 'Fabrication Services' },
  { icon: Pipette, title: 'Painting Solutions' },
  { icon: Package, title: 'Modular Fit Outs' },
  { icon: CheckCircle, title: 'Quality Control' },
  { icon: Gift, title: 'Final Product Delivery' }
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We diagnose your space’s latent potential with targeted site surveys and visual narrative conceptualizing.'
  },
  {
    number: '02',
    title: 'Concept & Blueprint',
    description: 'Formulating wireframe layouts and walkthroughs to calibrate spatial volumes before precise site coordination.'
  },
  {
    number: '03',
    title: 'Material Story',
    description: 'We collaborate to curate physical palettes with authentic veneers, local stones, and accent textures.'
  },
  {
    number: '04',
    title: 'Precision Turnkey',
    description: 'Supervising millimetre-accurate accurate construction workflows to guarantee final builds match drawings drawings flaw flawlessly.'
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
               <div className="gold-line" />
               <span className="tag">Services</span>
               <h1 className={styles.heroHeadline}>
                 Comprehensive
                 <br />
                 <em className="text-gold">Design Solutions.</em>
               </h1>

              <p className={styles.heroQuietSubtitle}>
                <strong style={{ display: 'block', color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
                  Architecture and interiors aligned with light and tactile balance.
                </strong>
                We curate deliberate design spaces centered around proportion, honest materials, and precise execution.
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
                  <img src={service.image} alt={service.title} className={styles.serviceVisualImage} />
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
            {TURNKEY_SERVICES.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className={styles.turnkeyItem}>
                  <div className={styles.turnkeyIcon}>
                    <IconComponent strokeWidth={1.2} size={28} />
                  </div>
                  <h4 className={styles.turnkeyItemTitle}>{item.title}</h4>
                </div>
              );
            })}
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

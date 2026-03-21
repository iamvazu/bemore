'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './page.module.css';

// Animated counter hook
function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// Intersection observer hook
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Stat component
function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { ref, inView } = useInView();
  const count = useCounter(value, 1800, inView);
  return (
    <div ref={ref} className={styles.statCard} style={{ animationDelay: `${delay}ms` }}>
      <div className={styles.statNumber}>
        {count}{suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

// Service card component
function ServiceCard({
  icon, title, description, tag, delay
}: { icon: string; title: string; description: string; tag: string; delay: number }) {
  return (
    <div className={styles.serviceCard} style={{ animationDelay: `${delay}ms` }}>
      <div className={styles.serviceIcon}>{icon}</div>
      <span className="tag">{tag}</span>
      <h3 className={styles.serviceTitle}>{title}</h3>
      <p className={styles.serviceDesc}>{description}</p>
      <div className={styles.serviceArrow}>→</div>
    </div>
  );
}

// Locality pill
function LocalityPill({ name, mf, delay }: { name: string; mf: number; delay: number }) {
  return (
    <div className={styles.localityPill} style={{ animationDelay: `${delay}ms` }}>
      <span className={styles.localityDot} />
      <span className={styles.localityName}>{name}</span>
      <span className={styles.localityLf}>{mf}x Factor</span>
    </div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [locality, setLocality] = useState('Jayanagar, Bangalore');
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);

  const heroImages = [
    '/homepage_hero1.png', 
    '/homepage_hero2.png',
    '/home_interior.png',
    '/home_interiror.png',
    '/hospitality.png',
    '/hospitality2.png',
    '/interiros.png'
  ];
  const professions = [
    "Architect",
    "Interior Designer"
  ];

  const headlineWords = [
    "Architecture",
    "Interior Design"
  ];

  const { ref: statsRef, inView: statsInView } = useInView();
  const { ref: servicesRef, inView: servicesInView } = useInView(0.1);

  useEffect(() => {
    setMounted(true);
    
    // Profession rotation
    const tagInterval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % professions.length);
    }, 3000);

    // Hero image rotation
    const heroInterval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => {
      clearInterval(tagInterval);
      clearInterval(heroInterval);
    };
  }, [professions.length, heroImages.length]);

  const SERVICES = [
    {
      icon: '⬡',
      title: 'Hybrid Design',
      description:
        'Our signature approach — combining the precision of modular systems with the soul of bespoke carpentry. Proven to outperform both extremes at the 5-year resale mark.',
      tag: 'Signature',
      delay: 0,
    },
    {
      icon: '◈',
      title: 'Smart Home Integration',
      description:
        'From basic automation to full KNX/Control4 ecosystems. Tech-forward interiors that command a 12% rental premium in Bengaluru\'s tech corridors.',
      tag: 'High ROI',
      delay: 80,
    },
    {
      icon: '◎',
      title: 'Acoustic Design',
      description:
        'In a city that never sleeps, silence is luxury. UPVC windows, fluted wall panels, and fabric treatments that add a 15% quiet premium near ORR and Outer Ring Road.',
      tag: 'Expert Module',
      delay: 160,
    },
    {
      icon: '◻',
      title: 'Professional WFH Zones',
      description:
        'Not just a desk — a mini-studio. Purpose-built for tech executives, creators, and founders with high-CRI lighting, ergonomic systems, and "Zoom-worthy" backgrounds.',
      tag: 'Rental Yield',
      delay: 240,
    },
    {
      icon: '◇',
      title: 'Luxury Kitchens',
      description:
        'Bespoke kitchen design with Italian hardware and precision joinery. The single highest-return room per square foot in Bengaluru residential real estate.',
      tag: 'Capital Value',
      delay: 320,
    },
    {
      icon: '🧭',
      title: 'Vastu Audit Report',
      description:
        'A comprehensive Vastu audit for your home, including property-wide element balancing and optimal placement of all household objects to enhance energy flow and well-being.',
      tag: 'Harmony',
      delay: 400,
    },
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

  const LOCALITIES = [
    { name: 'Indiranagar', mf: 1.15, delay: 0 },
    { name: 'Koramangala', mf: 1.12, delay: 60 },
    { name: 'HSR Layout', mf: 1.08, delay: 120 },
    { name: 'Whitefield', mf: 1.05, delay: 180 },
    { name: 'Bellandur', mf: 1.02, delay: 240 },
    { name: 'Sarjapur Road', mf: 1.00, delay: 300 },
    { name: 'JP Nagar', mf: 1.00, delay: 360 },
    { name: 'Hebbal', mf: 0.98, delay: 420 },
    { name: 'North Bangalore', mf: 0.95, delay: 480 },
    { name: 'Electronic City', mf: 0.90, delay: 540 },
  ];

  const FEATURED_PROJECTS = [
    {
      id: 'whitefield-villa',
      title: 'The Obsidian Villa',
      location: 'Whitefield',
      roi: '+28%',
      image: '/portfolio-whitefield.jpg',
    },
    {
      id: 'indiranagar-bedroom',
      title: 'The Heritage Master',
      location: 'Indiranagar',
      roi: '+35%',
      image: '/portfolio-indiranagar.jpg',
    },
    {
      id: 'koramangala-kitchen',
      title: 'Chef\'s Jewel',
      location: 'Koramangala',
      roi: '+24%',
      image: '/portfolio-koramangala.jpg',
    }
  ];

  return (
    <main className={styles.page}>
      <Nav />

      {/* ============ HERO ============ */}
      <section className={styles.hero}>
        <div className={styles.heroMediaWrapper}>
          <AnimatePresence mode="popLayout">
            <motion.img
              key={heroImages[heroImageIndex]}
              src={heroImages[heroImageIndex]}
              alt="Be More Studio Spaces"
              className={styles.heroBgImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </AnimatePresence>
          <div className={styles.heroScrim} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%' }}>
          <div className={styles.heroInner}>
            <div className={`${styles.heroContent} ${mounted ? styles.heroVisible : ''}`}>
              <h1 className={styles.heroHeadline}>
                Spaces designed with
                <br />
                <em className="text-secondary-cormorant">intention.</em>
              </h1>
              <p className={styles.heroQuietSubtitle}>
                A boutique architecture and interior design practice detailing calm, elevated environments. Based in Bangalore, operating everywhere.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/contact" className="btn btn-primary">
                  Book discovery call <span>→</span>
                </Link>
                <Link href="/portfolio" className="btn btn-ghost">
                  Selected work
                </Link>
              </div>
            </div>

            <div className={styles.scrollIndicator}>
              <span className={styles.scrollText}>Scroll</span>
              <div className={styles.scrollTrack}>
                <motion.div 
                  className={styles.scrollFill} 
                  animate={{ y: [0, 24, 0] }} 
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PHILOSOPHY ============ */}
      <section className={`${styles.splitPhilosophy} section`}>
        <div className="container">
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyLeft}>
              <div className="gold-line" />
              <span className="tag">Philosophy</span>
              <h2 className={styles.philosophyHeadline}>
                Function first.
                <br />
                <em className="text-secondary-cormorant">Form follows.</em>
              </h2>
            </div>
            <div className={styles.philosophyRight}>
              <blockquote className={styles.philosophyQuoteLarge}>
                &ldquo;Clean, intentional spaces that balance aesthetics with real-life functionality — everything has a purpose. We design homes that feel effortless and personal, where materials, light, and layout work together to create a calm, elevated everyday experience.&rdquo;
              </blockquote>
              <p className={styles.philosophyQuietText}>
                Our approach prioritizes proportions and material truth. We plan layout vectors that appreciate both visually and contextually over modern life cycles.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ============ SELECTED WORK ============ */}
      <section className={styles.selectedWork}>
        <div className="container">
          <div className={styles.secHeader}>
            <div className="gold-line" />
            <span className="tag">Portfolio</span>
            <h2 className={styles.secTitleLarge}>Selected <br/><em className="text-secondary-cormorant">Work.</em></h2>
          </div>
          <div className={styles.asymmetricGrid}>
            <Link href="/portfolio/rooted-home-rt-nagar" className={styles.workCardTall}>
              <div className={styles.workImgWrapper}>
                <img src="/portfolio-whitefield.jpg" alt="Rooted Home" />
              </div>
              <div className={styles.workMeta}>
                <h3>Rooted Home</h3>
                <span>Architecture + Interiors // Bangalore</span>
              </div>
            </Link>
            <div className={styles.workRightCol}>
              <Link href="/portfolio/eleve-living-brigade-panorama" className={styles.workCardWide}>
                <div className={styles.workImgWrapper}>
                  <img src="/portfolio-indiranagar.jpg" alt="Elevé Living" />
                </div>
                <div className={styles.workMeta}>
                  <h3>Elevé Living</h3>
                  <span>Interiors // Bangalore</span>
                </div>
              </Link>
              <Link href="/portfolio/collaborative-hub" className={styles.workCardSquare}>
                <div className={styles.workImgWrapper}>
                  <img src="/portfolio-koramangala.jpg" alt="The Collaborative Hub" />
                </div>
                <div className={styles.workMeta}>
                  <h3>The Collaborative Hub</h3>
                  <span>Office Space // Bangalore</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES (Dark) ============ */}
      <section className={styles.darkServices}>
        <div className="container">
          <div className={styles.darkHeader}>
            <div className="gold-line" />
            <span className="tag" style={{ color: 'rgba(255,255,255,0.6)' }}>Expertise</span>
            <h2 className={styles.darkTitle}>Spaces with <br/><em className="text-secondary-cormorant">Precision.</em></h2>
          </div>
          <div className={styles.darkGrid}>
            {[
              { num: '01', title: 'Architectural Design', desc: 'Crafting the bones of modern living. Full-scale architectural planning, structural integrity and spatial flow.', image: '/portfolio-whitefield.jpg' },
              { num: '02', title: 'Interior Architecture & Styling', desc: 'Transforming volumes into experiences. We curate palettes, material textures and bespoke layouts.', image: '/portfolio-indiranagar.jpg' },
              { num: '03', title: 'Commercial & Retail Spaces', desc: 'High-performance environments designed to foster productivity and modern brand identity.', image: '/portfolio-koramangala.jpg' },
              { num: '04', title: 'Project Management', desc: 'Stress-free execution. We oversee every build ensuring concepts transition to reality seamlessly.', image: '/portfolio-bellandur.jpg' }
            ].map((s) => {
              const isExpanded = expandedIndex === s.num;
              return (
                <div 
                  key={s.num} 
                  className={`${styles.darkItem} ${isExpanded ? styles.darkItemExpanded : ''}`}
                  onClick={() => setExpandedIndex(isExpanded ? null : s.num)}
                >
                  <div className={styles.darkItemHeader}>
                    <span className={styles.darkNum}>{s.num}</span>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                  
                  {isExpanded && (
                    <div className={styles.darkItemExpandContent}>
                      <div className={styles.expandGrid}>
                        <div className={styles.expandVisual}>
                          <img src={s.image} alt={s.title} className={styles.expandImage} />
                        </div>
                        <div className={styles.expandText}>
                          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: '1.6' }}>We approach every project with calculating precision, engineering environments that maximize your spatial ROI while reflecting absolute design narrative.</p>
                          <Link href="/services" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
                            View Services →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ MATERIAL LANGUAGE ============ */}
      <section className={styles.materialSection}>
        <div className="container">
          <div className={styles.materialGrid}>
            <div className={styles.materialText}>
              <div className="gold-line" />
              <span className="tag">Sensory</span>
              <h2 className={styles.materialHeadline}>The Material <br/><em className="text-secondary-cormorant">Language.</em></h2>
              <ul className={styles.materialList}>
                <li><strong>Weathered Oak & Plaster:</strong> Honest textures that gain character with absolute age.</li>
                <li><strong>Aged Brass & Fluted Glass:</strong> Precise details that capture light dynamically.</li>
                <li><strong>Raw Concrete & Linen:</strong> Pure volumes balanced with soft tactile cushions.</li>
              </ul>
            </div>
            <div className={styles.materialVisual}>
              <div className={styles.matCollage}>
                 <img src="/portfolio-bellandur.jpg" alt="Material" className={styles.mat1} />
                 <img src="/portfolio-whitefield.jpg" alt="Material" className={styles.mat2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIAL ============ */}
      <section className={styles.testimonialSection}>
        <div className="container">
          <div className={styles.testimonyInner}>
            <blockquote className={styles.testimonyQuote}>
              &ldquo;We wanted a space that felt effortless. BeMore didn&apos;t just give us design; they gave us peace of mind with calculated, intentional layouts.&rdquo;
            </blockquote>
            <cite className={styles.testimonyCite}>— Rohan K., Koramangala Villa Client</cite>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactText}>
              <div className="gold-line" />
              <h2 className={styles.contactHeadline}>Begin your <br/><em className="text-secondary-cormorant">Narrative.</em></h2>
              <p>Discuss schedules, floor plans and design frameworks to scale your next property benchmarks correctly.</p>
              <Link href="/contact" className="btn btn-primary btn-lg">Start Conversation →</Link>
            </div>
            <div className={styles.contactInfo}>
              <div className={styles.infoBlock}>
                <h4>Reach Us</h4>
                <a href="tel:+919663424256">+91 96634 24256</a>
                <a href="mailto:hello@bemoredesiginstudio.com">hello@bemoredesignstudio.com</a>
              </div>
              <div className={styles.infoBlock}>
                <h4>Studio</h4>
                <span>Offset Bangalore, Highgrounds <br/>Karnataka, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    );
    }
    
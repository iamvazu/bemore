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

    return () => {
      clearInterval(tagInterval);
    };
  }, [professions.length]);

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
      <section className="hero-layout">
        {/* Protected Background */}
        <div className="hero-media-wrapper">
          <div className={styles.heroVideo}>
            <iframe
              src="https://www.youtube.com/embed/N3j9dDoiJ8I?autoplay=1&mute=1&loop=1&playlist=N3j9dDoiJ8I&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
          <div className="hero-scrim" />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '90px' }}>
          <div className={styles.heroInner}>
            <div className={`${styles.heroContent} ${mounted ? styles.heroVisible : ''}`} style={{ maxWidth: '850px', marginTop: '-20px' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <motion.div 
                  layout
                  className="tag" 
                  style={{ 
                    border: '1px solid var(--gold)', 
                    background: 'var(--bg-surface)', 
                    padding: '6px 20px',
                    gap: '0',
                    fontSize: '0.75rem'
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap' }}>Best&nbsp;</span>
                  <div style={{ position: 'relative', height: '1.2em', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={taglineIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        style={{ color: 'var(--gold)', whiteSpace: 'nowrap', display: 'inline-block' }}
                      >
                        {professions[taglineIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span style={{ whiteSpace: 'nowrap' }}>,&nbsp;Bangalore</span>
                </motion.div>
              </div>

              <h1 className="display-h1" style={{ marginBottom: '0.5rem', lineHeight: '1', fontSize: 'clamp(3rem, 8vw, 5rem)', minHeight: '2.1em' }}>
                <div style={{ position: 'relative', height: '1.2em', overflow: 'hidden' }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={taglineIndex}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "circOut" }}
                      style={{ display: 'block' }}
                    >
                      {headlineWords[taglineIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                Without <em>Limits.</em>
              </h1>

              <div className={styles.heroTrust} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', letterSpacing: '0.01em', opacity: 0.75 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Trusted by</span>
                  <strong style={{ color: 'var(--text-primary)' }}>240+ homeowners</strong>
                  <span style={{ opacity: 0.2 }}>|</span>
                  <strong style={{ color: 'var(--gold)' }}>₹180Cr+</strong>
                  <span style={{ color: 'var(--text-muted)' }}>in real estate</span>
                </div>
              </div>

              <p className="hero-subtext" style={{ marginBottom: '1.25rem', fontSize: '1.1rem', lineHeight: '1.5' }}>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '1.25rem', whiteSpace: 'nowrap' }}>
                  Innovative Architecture and Interior Design for Modern Living.
                </strong>
                Based in Bangalore, we engineer high-performance environments that resonate with your vision and appreciate over time.
              </p>

              <div className={styles.heroCtas} style={{ marginBottom: '0', marginTop: '0.75rem' }}>
                <Link href="/contact" className="btn btn-primary" id="hero-cta-calculator" style={{ padding: '12px 28px' }}>
                  Book Free Consultation
                  <span>→</span>
                </Link>
                <Link href="/portfolio" className="btn btn-ghost" id="hero-cta-consultation" style={{ padding: '12px 28px' }}>
                  View Portfolio
                </Link>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* ============ PHILOSOPHY ============ */}
      <section className={`${styles.philosophy} section--sm`}>
        <div className="container">
          <div className={styles.philosophyInner}>
            <div className="gold-line gold-line--center" />
            <h2 className={styles.philosophyTitle}>
              The beMore Philosophy
            </h2>
            <blockquote className={styles.philosophyQuote}>
              &ldquo;Clean, intentional spaces that balance aesthetics with real-life functionality — everything has a purpose. We design homes that feel effortless and personal, where materials, light, and layout work together to create a calm, elevated everyday experience.&rdquo;
            </blockquote>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1.5rem', fontStyle: 'italic' }}>
              Function first, form follows. Every space planned with clarity, proportion, and purpose — built to last.
            </p>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className={`${styles.stats} section--sm`} ref={statsRef}>
        <div className="container">
          <div className={styles.statsGrid}>
            {statsInView && (
              <>
                <StatCard value={100} suffix="%" label="Transparency in Material Specs" delay={0} />
                <StatCard value={0} suffix="%" label="Hidden Costs or Variances" delay={100} />
                <StatCard value={20} suffix="%" label="More Efficient Design ROI" delay={200} />
                <StatCard value={180} suffix="Cr+" label="Worth of Accurately Quoted Projects" delay={300} />
              </>
            )}
          </div>
        </div>
      </section>

      {/* ============ SOLUTIONS ============ */}
      <section className={styles.solutionsSection}>
        <div className="container">
          <div className="gold-line gold-line--center" />
          <h2 className={styles.solutionsTitle}>Core Services</h2>
          <div className={styles.solutionsGrid}>
            <Link href="/services#architectural" className={styles.solutionCard}>
              <div className={styles.solutionBg}>
                <img src="/portfolio-whitefield.jpg" alt="Architectural Design" />
              </div>
              <div className={styles.solutionContent}>
                <span className={styles.solutionNumber}>01.</span>
                <h3>Architectural Design</h3>
                <p>Crafting the bones of modern living. We provide full-scale architectural planning, focusing on structural integrity and spatial flow.</p>
                <div className={styles.solutionCta}>Explore Service →</div>
              </div>
            </Link>

            <Link href="/services#interior" className={styles.solutionCard}>
              <div className={styles.solutionBg}>
                <img src="/portfolio-indiranagar.jpg" alt="Interior Design" />
              </div>
              <div className={styles.solutionContent}>
                <span className={styles.solutionNumber}>02.</span>
                <h3>Interior Design & Styling</h3>
                <p>Transforming interiors into experiences. We curate palettes, textures, and bespoke furniture layouts for contemporary lifestyles.</p>
                <div className={styles.solutionCta}>Explore Service →</div>
              </div>
            </Link>

            <Link href="/services#commercial" className={styles.solutionCard}>
              <div className={styles.solutionBg}>
                <img src="/portfolio-koramangala.jpg" alt="Commercial Spaces" />
              </div>
              <div className={styles.solutionContent}>
                <span className={styles.solutionNumber}>03.</span>
                <h3>Commercial & Retail Spaces</h3>
                <p>Designing high-performance environments that foster productivity and brand identity. We create workplaces where teams thrive.</p>
                <div className={styles.solutionCta}>Explore Service →</div>
              </div>
            </Link>

            <Link href="/services#management" className={styles.solutionCard}>
              <div className={styles.solutionBg}>
                <img src="/portfolio-bellandur.jpg" alt="Project Management" />
              </div>
              <div className={styles.solutionContent}>
                <span className={styles.solutionNumber}>04.</span>
                <h3>Project Management</h3>
                <p>Design without the stress. We oversee every build, ensuring that the transition from concept to reality is seamless and timely.</p>
                <div className={styles.solutionCta}>Explore Service →</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className={`${styles.services} section`} ref={servicesRef}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="gold-line" />
            <span className="tag">What We Build</span>
            <h2 className={styles.sectionTitle}>
              Design Interventions That
              <br />
              <em className="text-gold">Move the Market</em>
            </h2>
            <p className={styles.sectionSub}>
              Every service we offer is weighted and valued against Bengaluru market data.
              No guesswork. Only investments.
            </p>
          </div>

          <div className={`${styles.servicesGrid} ${servicesInView ? styles.servicesVisible : ''}`}>
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>
      {/* ============ SPECIALIZED SERVICES ============ */}
      <section className={styles.specializedSection}>
        <div className={styles.specializedBg}>
          <img src="/portfolio-indiranagar.jpg" alt="Luxury Background" />
        </div>
        <div className={styles.specializedOverlay} />
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="gold-line" />
            <h2 className={styles.sectionTitle}>
              Expertise In Every <em className="text-gold">Internal Detail</em>
            </h2>
            <p className={styles.sectionSub}>
              We specialize in high-end, custom interventions that elevate standard living into a tailored statement.
            </p>
          </div>
          
          <div className={styles.specializedGrid}>
            {[
              { icon: '🪞', title: 'Foyers', desc: 'Welcoming entryways that make a lasting first impression.' },
              { icon: '🏗️', title: 'False Ceilings', desc: 'Stylish overhead designs that enhance your spatial volume.' },
              { icon: '🛁', title: 'Bathroom Designs', desc: 'Spa-like retreats calibrated for your daily rejuvenation.' },
              { icon: '📦', title: 'Storage Solutions', desc: 'Smart, custom storage to keep your home flawlessly organized.' },
              { icon: '🪔', title: 'Pooja Units', desc: 'Beautiful sacred spaces meticulously designed for spiritual moments.' },
              { icon: '🍳', title: 'Modular Kitchens', desc: 'Efficient, elite kitchens for high-performance culinary art.' },
              { icon: '🪴', title: 'Balcony Designs', desc: 'Outdoor urban retreats perfect for relaxation and air.' },
              { icon: '🛋️', title: 'Living Rooms', desc: 'Masterfully designed areas for living and hosting.' }
            ].map((item, i) => (
              <div key={i} className={styles.specializedItem}>
                <div className={styles.specializedIcon}>{item.icon}</div>
                <div className={styles.specializedText}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
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
              At the intersection of lifestyles and design, we streamline that journey for you. Excellence from ideation to execution using comprehensive Single-point frameworks.
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

      {/* ============ HOW IT WORKS ============ */}
      <section className={styles.workflowSection}>
        <div className="container">
          <div className={styles.sectionHead} style={{ textAlign: 'center' }}>
            <span className="tag">The beMore Process</span>
            <h2 className={styles.sectionTitle} style={{ margin: '0.5rem 0' }}>
              Your Journey In <em className="text-gold">4 Simple Steps</em>
            </h2>
          </div>

          <div className={styles.workflowSteps}>
            {[
              {
                num: '01',
                title: 'Discover & Design Concept',
                desc: 'We start with you: your needs, your story, your space. Site visits, budget discussions, and gathering inspiration define the project scope. We deliver a conceptual design presentation and a pre-design estimate.',
                img: '/portfolio-whitefield.jpg'
              },
              {
                num: '02',
                title: 'Design Development & Detailed Planning',
                desc: 'Once the concept is approved, we translate ideas into layouts, mood boards, 3D walkthroughs, and technical drawings. Every aspect of the space is thoughtfully designed, with meticulous material curation.',
                img: '/portfolio-indiranagar.jpg'
              },
              {
                num: '03',
                title: 'Production & Delivery',
                desc: 'BOQ approved, we translate designs into reality with our trusted vendors and service partners — ensuring quality craftsmanship, timely delivery, and transparent communication throughout. Typical timeline: 60 days.*',
                img: '/portfolio-koramangala.jpg'
              }
            ].map((step, i) => (
              <div key={i} className={styles.workflowStep}>
                <div className={styles.stepInfo}>
                  <div className={styles.stepNumber}>{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <Link href="/contact" className="btn btn-ghost" style={{ marginTop: '1.5rem' }}>Book Free Consultation</Link>
                </div>
                <div className={styles.stepVisual}>
                  <img src={step.img} alt={step.title} />
                  <div className={styles.stepVisualGlow} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PORTFOLIO ============ */}
      <section className={`${styles.featured} section`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="gold-line" />
            <span className="tag">Portfolio</span>
            <h2 className={styles.sectionTitle}>
              Featured <em className="text-gold">Design Assets</em>
            </h2>
          </div>
          
          <div className={styles.featuredGrid}>
            {FEATURED_PROJECTS.map((project, idx) => (
              <Link 
                href={`/portfolio/${project.id}`} 
                key={project.id} 
                className={styles.featuredCard}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className={styles.featuredImageWrapper}>
                  <img src={project.image} alt={project.title} className={styles.featuredImage} />
                  <div className={styles.featuredOverlay}>
                    <div className={styles.featuredRoi}>ROI: {project.roi}</div>
                  </div>
                </div>
                <div className={styles.featuredInfo}>
                  <span className={styles.featuredLoc}>{project.location}</span>
                  <h3 className={styles.featuredName}>{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.centerAction} style={{ marginTop: '3rem' }}>
            <Link href="/portfolio" className="btn btn-ghost">View Full Portfolio</Link>
          </div>
        </div>
      </section>



      {/* ============ LOCALITIES ============ */}
      <section className={`${styles.localities} section--sm`}>
        <div className="container">
          <div className={styles.sectionHead} style={{ marginBottom: '2rem' }}>
            <span className="tag">Coverage</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginTop: '0.75rem' }}>
              10 Bengaluru Micro-Markets. <em className="text-gold">One Studio.</em>
            </h3>
          </div>
          <div className={styles.localitiesGrid}>
            {LOCALITIES.map((l) => (
              <LocalityPill key={l.name} {...l} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaBandInner}>
            <div>
              <h2 className={styles.ctaTitle}>
                Ready to <em className="text-gold">invest</em> in your home?
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
                Book a free 30-minute discovery call with our design consultants.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/contact" className="btn btn-primary btn-lg" id="cta-band-calc">
                Book Discovery Call →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

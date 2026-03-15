'use client';

import { useEffect, useRef, useState } from 'react';
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
function LocalityPill({ name, lf, delay, slug }: { name: string; lf: number; delay: number; slug: string }) {
  return (
    <Link href={`/roi/interior-design-${slug}`} className={styles.localityPill} style={{ animationDelay: `${delay}ms` }}>
      <span className={styles.localityDot} />
      <span className={styles.localityName}>{name}</span>
      <span className={styles.localityLf}>{lf}x ROI</span>
    </Link>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInView();
  const { ref: servicesRef, inView: servicesInView } = useInView(0.1);
  const { ref: roiRef, inView: roiInView } = useInView(0.1);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      icon: '⬜',
      title: 'Design Documentation Locker',
      description:
        'Our 2026 resale-ready service. A certified Design Audit Report + 10-Year Transferable Warranty that makes your home sell 22% faster on the secondary market.',
      tag: 'Liquidity',
      delay: 400,
    },
  ];

  const LOCALITIES = [
    { name: 'Indiranagar', lf: 1.35, delay: 0, slug: 'indiranagar' },
    { name: 'Koramangala', lf: 1.32, delay: 60, slug: 'koramangala' },
    { name: 'HSR Layout', lf: 1.28, delay: 120, slug: 'hsr' },
    { name: 'Whitefield', lf: 1.25, delay: 180, slug: 'whitefield' },
    { name: 'Bellandur', lf: 1.22, delay: 240, slug: 'bellandur' },
    { name: 'Sarjapur Road', lf: 1.20, delay: 300, slug: 'sarjapur' },
    { name: 'JP Nagar', lf: 1.20, delay: 360, slug: 'jp-nagar' },
    { name: 'Hebbal', lf: 1.18, delay: 420, slug: 'hebbal' },
    { name: 'North Bangalore', lf: 1.15, delay: 480, slug: 'north-bangalore' },
    { name: 'Electronic City', lf: 1.10, delay: 540, slug: 'electronic-city' },
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
        {/* Background geometric decorations */}
        <div className={styles.heroBg}>
          <div className={styles.heroArch1} />
          <div className={styles.heroArch2} />
          <div className={styles.heroGlow} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={`${styles.heroContent} ${mounted ? styles.heroVisible : ''}`}>
            <span className="tag">Bengaluru&apos;s #1 Design Investment Studio</span>

            <h1 className={styles.heroTitle}>
              Design Without Limits.
            </h1>

            <p className={styles.heroSub}>
              Innovative Architecture and Interior Design for Modern Living.
              <br /><br />
              At beMore Design Studio, we don’t just build structures; we curate environments. Based in Bangalore, we are a multidisciplinary firm dedicated to creating smart, elegant, and highly functional spaces that resonate with your vision.
            </p>

            <div className={styles.heroCtas}>
              <Link href="/portfolio" className="btn btn-primary btn-lg" id="hero-cta-portfolio">
                Explore Our Portfolio
                <span>→</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost btn-lg" id="hero-cta-contact">
                Start Your Project
              </Link>
            </div>

            <div className={styles.heroTrust}>
              <span>Trusted by</span>
              <strong>240+ Bengaluru homeowners</strong>
              <span>·</span>
              <strong>₹180Cr+</strong>
              <span>in designed real estate</span>
            </div>
          </div>

          {/* Hero ROI teaser card */}
          <div className={`${styles.heroCard} ${mounted ? styles.heroCardVisible : ''}`}>
            <div className={styles.heroCardTop}>
              <span className="tag">Quick Estimate</span>
              <span className={styles.heroCardLive}>● LIVE</span>
            </div>
            <div className={styles.heroCardLocality}>Whitefield, Bengaluru</div>
            <div className={styles.heroCardData}>
              <div className={styles.heroMetric}>
                <span className={styles.heroMetricValue}>+28%</span>
                <span className={styles.heroMetricLabel}>Resale Premium</span>
              </div>
              <div className={styles.heroMetricDivider} />
              <div className={styles.heroMetric}>
                <span className={styles.heroMetricValue}>+9.4%</span>
                <span className={styles.heroMetricLabel}>Rental Yield</span>
              </div>
              <div className={styles.heroMetricDivider} />
              <div className={styles.heroMetric}>
                <span className={styles.heroMetricValue}>14 days</span>
                <span className={styles.heroMetricLabel}>Faster to Sell</span>
              </div>
            </div>
            <div className={styles.heroCardBar}>
              <div className={styles.heroCardBarLabel}>Hybrid vs Pure Modular</div>
              <div className={styles.heroCardBarTrack}>
                <div className={styles.heroCardBarFill} style={{ width: '68%' }} />
              </div>
              <div className={styles.heroCardBarLegend}>
                <span>Modular</span>
                <span className={styles.goldText}>Hybrid +22%</span>
              </div>
            </div>
            <Link href="/calculator" className={styles.heroCardBtn}>
              Personalise for your property →
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollHint}>
          <div className={styles.scrollLine} />
          <span>Scroll</span>
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
              &ldquo;We believe a space should do more than just exist—it should inspire. Our approach seamlessly integrates creativity with technical precision to elevate the way you live, work, and be more.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className={`${styles.stats} section--sm`} ref={statsRef}>
        <div className="container">
          <div className={styles.statsGrid}>
            {statsInView && (
              <>
                <StatCard value={22} suffix="%" label="Faster Resale with Certified Design" delay={0} />
                <StatCard value={15} suffix="%" label="Quiet Premium in High-Noise Areas" delay={100} />
                <StatCard value={12} suffix="%" label="Rental Yield Uplift — WFH Zones" delay={200} />
                <StatCard value={180} suffix="Cr+" label="Worth of Designed Properties" delay={300} />
              </>
            )}
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

      {/* ============ FEATURED PORTFOLIO ============ */}
      <section className={`${styles.featured} section`}>
        <div className="container">
          <div className={styles.sectionHead} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="gold-line" style={{ margin: '0 auto' }} />
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

          <div className={styles.centerAction} style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link href="/portfolio" className="btn btn-ghost">View Full Portfolio</Link>
          </div>
        </div>
      </section>

      {/* ============ ROI CALCULATOR TEASER ============ */}
      <section className={`${styles.roiTeaser} section`} ref={roiRef}>
        <div className="container">
          <div className={`${styles.roiTeaserInner} ${roiInView ? styles.roiTeaserVisible : ''}`}>
            <div className={styles.roiTeaserText}>
              <div className="gold-line" />
              <span className="tag">Be More Design Equity™</span>
              <h2 className={styles.roiTeaserTitle}>
                The Bengaluru
                <br />
                <em className="text-gold">Home Equity</em>
                <br />
                Calculator
              </h2>
              <p>
                The only ROI tool in India built specifically for Bengaluru&apos;s micro-markets.
                Input your property, toggle your design investment modules, and see — in real-time —
                how your home appreciates.
              </p>
              <ul className={styles.roiFeatures}>
                <li><span className={styles.checkGold}>✓</span> 10 Bengaluru locality profiles</li>
                <li><span className={styles.checkGold}>✓</span> Acoustic Quiet Premium calculator</li>
                <li><span className={styles.checkGold}>✓</span> Hybrid vs Modular vs Bespoke comparison</li>
                <li><span className={styles.checkGold}>✓</span> AI-powered investment insights (Gemini)</li>
                <li><span className={styles.checkGold}>✓</span> 5-year resale projection</li>
                <li><span className={styles.checkGold}>✓</span> Rental yield premium breakdown</li>
              </ul>
              <Link href="/calculator" className="btn btn-primary btn-lg" id="roi-teaser-cta">
                Open the Calculator →
              </Link>
            </div>
            <div className={styles.roiTeaserVisual}>
              {/* Formula display card */}
              <div className={styles.formulaCard}>
                <div className={styles.formulaTitle}>The ROI Formula</div>
                <div className={styles.formulaEq}>
                  V<sub>future</sub> = V<sub>base</sub> + (I × R<sub>f</sub> × L<sub>f</sub> × A<sub>f</sub> × M<sub>f</sub>)
                </div>
                <div className={styles.formulaVars}>
                  {[
                    { sym: 'I', label: 'Investment Amount' },
                    { sym: 'Rf', label: 'Design Tier Factor' },
                    { sym: 'Lf', label: 'Locality Multiplier' },
                    { sym: 'Af', label: 'Acoustic Premium' },
                    { sym: 'Mf', label: 'Maintenance Factor' },
                  ].map((v) => (
                    <div key={v.sym} className={styles.formulaVar}>
                      <span className={styles.formulaSym}>{v.sym}</span>
                      <span className={styles.formulaVarLabel}>{v.label}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.formulaNote}>
                  + Hybrid Bonus + Module Contributions
                </div>
              </div>
            </div>
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
              <Link href="/calculator" className="btn btn-primary btn-lg" id="cta-band-calc">
                Calculate ROI First →
              </Link>
              <Link href="/contact" className="btn btn-ghost btn-lg" id="cta-band-contact">
                Book Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

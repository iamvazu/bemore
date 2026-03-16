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
    <Link href={`/calculator`} className={styles.localityPill} style={{ animationDelay: `${delay}ms` }}>
      <span className={styles.localityDot} />
      <span className={styles.localityName}>{name}</span>
      <span className={styles.localityLf}>{mf}x Factor</span>
    </Link>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [locality, setLocality] = useState('Jayanagar, Bangalore');
  const [bhkIndex, setBhkIndex] = useState(0);

  const bhkTypes = [
    { type: '1BHK', essential: '12L', premium: '18L', luxury: '28L', progress: '92%' },
    { type: '2BHK', essential: '18L', premium: '28L', luxury: '45L', progress: '94%' },
    { type: '3BHK', essential: '28L', premium: '45L', luxury: '75L', progress: '95%' },
  ];

  const taglines = [
    "Best Interior Designer Bangalore",
    "Best Architect, Bangalore"
  ];

  const { ref: statsRef, inView: statsInView } = useInView();
  const { ref: servicesRef, inView: servicesInView } = useInView(0.1);
  const { ref: roiRef, inView: roiInView } = useInView(0.1);

  useEffect(() => {
    setMounted(true);
    
    // Tagline rotation
    const tagInterval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);

    // BHK rotation
    const bhkInterval = setInterval(() => {
      setBhkIndex((prev) => (prev + 1) % bhkTypes.length);
    }, 3500);

    // Real Locality Detection
    const detectLocation = async () => {
      try {
        // Step 1: Rapid IP detection (No prompt)
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        if (ipData.city) {
          setLocality(ipData.city === 'Bengaluru' ? 'Bangalore' : ipData.city);
        }

        // Step 2: High-precision GPS (Prompted)
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14`);
            const data = await res.json();
            if (data.address) {
              const area = data.address.suburb || data.address.neighbourhood || data.address.residential || data.address.locality;
              const city = data.address.city || data.address.town || 'Bangalore';
              setLocality(`${area ? area + ', ' : ''}${city}`);
            }
          }, (err) => console.log("GPS denied, using IP location"), { timeout: 5000 });
        }
      } catch (err) {
        console.error("Location fetch failed", err);
      }
    };

    detectLocation();

    return () => {
      clearInterval(tagInterval);
      clearInterval(bhkInterval);
    };
  }, [taglines.length, bhkTypes.length]);

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

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className={styles.heroInner}>
            <div className={`${styles.heroContent} ${mounted ? styles.heroVisible : ''}`}>
              <span className="tag" style={{ marginBottom: '1.5rem' }}>
                {taglines[taglineIndex]}
              </span>

              <h1 className="display-h1">
                Design Without 
                <br />
                <em>Limits.</em>
              </h1>

              <p className="hero-subtext">
                Innovative Architecture and Interior Design for Modern Living.
                Based in Bangalore, we engineer high-performance environments that resonate with your vision and appreciate over time.
              </p>

              <div className={styles.heroCtas}>
                <Link href="/calculator" className="btn btn-primary btn-lg" id="hero-cta-calculator">
                  Budget Estimator
                  <span>→</span>
                </Link>
                <Link href="/contact" className="btn btn-ghost btn-lg" id="hero-cta-consultation">
                  Book Free Consultation
                </Link>
              </div>

              <div className={styles.heroTrust}>
                <span>Trusted by</span>
                <strong>240+ homeowners</strong>
                <span>·</span>
                <strong>₹180Cr+</strong>
                <span>in real estate</span>
              </div>
            </div>

            {/* Estimator Teaser Card */}
            <div className={`${styles.heroCard} ${mounted ? styles.heroCardVisible : ''}`}>
              <div className={styles.heroCardTop}>
                <span className="tag">Budget Baseline</span>
                <span className={styles.heroCardLive}>● 2026 RATES</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={bhkIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={styles.heroCardLocality}>Premium {bhkTypes[bhkIndex].type}, {locality}</div>
                  <div className={styles.heroCardData}>
                    <div className={styles.heroMetric}>
                      <span className={styles.heroMetricValue}>₹{bhkTypes[bhkIndex].essential}</span>
                      <span className={styles.heroMetricLabel}>Essential</span>
                    </div>
                    <div className={styles.heroMetricDivider} />
                    <div className={styles.heroMetric}>
                      <span className={styles.heroMetricValue}>₹{bhkTypes[bhkIndex].premium}</span>
                      <span className={styles.heroMetricLabel}>Premium</span>
                    </div>
                    <div className={styles.heroMetricDivider} />
                    <div className={styles.heroMetric}>
                      <span className={styles.heroMetricValue}>₹{bhkTypes[bhkIndex].luxury}</span>
                      <span className={styles.heroMetricLabel}>Luxury</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className={styles.heroCardBar}>
                <div className={styles.heroCardBarLabel}>Transparency Index</div>
                <div className={styles.heroCardBarTrack}>
                  <motion.div 
                    className={styles.heroCardBarFill} 
                    initial={{ width: 0 }}
                    animate={{ width: bhkTypes[bhkIndex].progress }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <div className={styles.heroCardBarLegend}>
                  <span>Market Avg</span>
                  <span className={styles.goldText}>beMore Precision +100%</span>
                </div>
              </div>
              <Link href="/calculator" className={styles.heroCardLink}>
                Get your precise quote →
              </Link>
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
                title: 'Discovery & Mapping', 
                desc: 'We deeply understand your preferences, desires, and tactical requirements to create a personalized design foundation.',
                img: '/portfolio-whitefield.jpg'
              },
              { 
                num: '02', 
                title: 'Design Intent', 
                desc: 'Our design intent brings your vision to life, creating spaces tailored to your needs with high ROI focus.',
                img: '/portfolio-indiranagar.jpg'
              },
              { 
                num: '03', 
                title: 'Precision Estimation', 
                desc: 'We offer transparent, data-backed estimates, ensuring clarity and honesty throughout the project journey.',
                img: '/portfolio-koramangala.jpg'
              },
              { 
                num: '04', 
                title: 'Masterful Execution', 
                desc: 'Design transitions seamlessly into reality as we oversee every technical detail of the transformation.',
                img: '/portfolio-bellandur.jpg'
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

      {/* ============ BUDGET ESTIMATOR TEASER ============ */}
      <section className={`${styles.roiTeaser} section`} ref={roiRef}>
        <div className={styles.roiTeaserBg}>
          <img src="/portfolio-indiranagar.jpg" alt="Luxury Interior" />
        </div>
        <div className={styles.roiTeaserOverlay} />
        <div className="container">
          <div className={`${styles.roiTeaserInner} ${roiInView ? styles.roiTeaserVisible : ''}`}>
            <div className={styles.roiTeaserText}>
              <div className="gold-line" />
              <span className="tag">Budget Estimator™</span>
              <h2 className={styles.roiTeaserTitle}>
                Surgical
                <br />
                <em className="text-gold">Cost Transparency</em>
                <br />
                Engine
              </h2>
              <p>
                The only estimator in India built on actual 2026 market benchmarks. 
                Move beyond guesswork. Calculate precise Bill of Quantities (BOQ) 
                based on your specific property area, city multipliers, and material tiers.
              </p>
              <ul className={styles.roiFeatures}>
                <li><span className={styles.checkGold}>✓</span> Itemized BOQ (Wardrobes, Kitchen, Electrical)</li>
                <li><span className={styles.checkGold}>✓</span> City Multipliers (Bangalore, Mumbai, Jaipur)</li>
                <li><span className={styles.checkGold}>✓</span> Material Tiers: Essential, Premium, Luxury</li>
                <li><span className={styles.checkGold}>✓</span> Live calculation including GST & Fees</li>
                <li><span className={styles.checkGold}>✓</span> Detailed Specs for every tier selection</li>
                <li><span className={styles.checkGold}>✓</span> Comparison views for optimal budgeting</li>
              </ul>
              <Link href="/calculator" className="btn btn-primary btn-lg" id="roi-teaser-cta">
                Estimate Your Project →
              </Link>
            </div>
            <div className={styles.roiTeaserVisual}>
              {/* Formula display card */}
              <div className={styles.formulaCard}>
                <div className={styles.formulaTitle}>The Cost Formula</div>
                <div className={styles.formulaEq}>
                  Total = ∑(Rate<sub>city</sub> × Tier<sub>m</sub> × Qty) + Fee + GST
                </div>
                <div className={styles.formulaVars}>
                  {[
                    { sym: 'Rate', label: 'Base City Benchmark' },
                    { sym: 'Tier', label: 'Material Quality Multiplier' },
                    { sym: 'Qty', label: 'Precise Area/Unit Measurements' },
                    { sym: 'Fee', label: 'Architectural Designer Fee' },
                    { sym: 'GST', label: 'Standard 18% Statutory Tax' },
                  ].map((v) => (
                    <div key={v.sym} className={styles.formulaVar}>
                      <span className={styles.formulaSym}>{v.sym}</span>
                      <span className={styles.formulaVarLabel}>{v.label}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.formulaNote}>
                  Generated with Surgical Precision by beMore Design Studio
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
                Estimate Your Budget First →
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

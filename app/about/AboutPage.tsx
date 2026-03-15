'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './about.module.css';

function useInView(threshold = 0.15) {
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

const TEAM = [
  {
    name: 'Founder & Principal Designer',
    initials: 'BM',
    role: 'Architecture & Strategy',
    quote: '"Every room we design appreciates. Not just in beauty, but in rupees."',
  },
  {
    name: 'Head of Interiors',
    initials: 'S',
    role: 'Material & Finish Specialist',
    quote: '"We source globally and detail locally — that\'s the Be More edge."',
  },
  {
    name: 'Smart Home Lead',
    initials: 'R',
    role: 'KNX / Control4 Certified',
    quote: '"Technology should disappear into the walls. You should only see its value."',
  },
  {
    name: 'Acoustic Design Consultant',
    initials: 'A',
    role: 'Acoustic & WFH Specialist',
    quote: '"Silence is the most undervalued square foot in Bengaluru real estate."',
  },
];

const MILESTONES = [
  { year: '2016', title: 'Studio Founded', desc: 'Started with a single apartment in Indiranagar and a conviction that design must pay back.' },
  { year: '2018', title: 'Hybrid Method Born', desc: 'Developed our signature Hybrid Design™ approach — combining modular efficiency with bespoke craftsmanship.' },
  { year: '2020', title: 'Smart Home Division', desc: 'Launched dedicated KNX/Control4 integration team as Bengaluru\'s tech corridor demanded it.' },
  { year: '2022', title: 'Acoustic Design Offering', desc: 'Responded to ORR noise pollution crisis with India\'s first residential acoustic ROI framework.' },
  { year: '2024', title: '₹100Cr Portfolio', desc: 'Crossed ₹100Cr in designed real estate across 150+ homes in 8 Bengaluru micro-markets.' },
  { year: '2026', title: 'Design Equity™ Calculator', desc: 'Launched India\'s first data-driven interior design ROI calculator — the tool you\'re on right now.' },
];

const VALUES = [
  { icon: '◈', title: 'Investment-First Thinking', desc: 'Every design decision is run through an ROI filter. Beauty follows value, not the other way around.' },
  { icon: '◎', title: 'Hybrid Precision', desc: 'We refuse the false choice between modular efficiency and bespoke soul. Our hybrid method delivers both.' },
  { icon: '◇', title: 'Hyper-Local Expertise', desc: 'We know the price per sq.ft, rental demand, and buyer psychology of every Bengaluru micro-market we work in.' },
  { icon: '⬡', title: 'Documentation as Design', desc: 'Our Design Audit Reports and Transferable Warranties are as important as our floor plans.' },
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const { ref: valuesRef, inView: valuesInView } = useInView();
  const { ref: teamRef, inView: teamInView } = useInView();
  const { ref: timelineRef, inView: timelineInView } = useInView(0.05);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className={styles.page}>
      <Nav />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroGlow} />
          <div className={styles.heroLine1} />
          <div className={styles.heroLine2} />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <div className={`${styles.heroContent} ${mounted ? styles.visible : ''}`}>
            <span className="tag">Our Story</span>
            <h1 className={styles.heroTitle}>
              Purposeful Design.
              <br />
              <em className="text-gold">Technical Precision.</em>
            </h1>
            <p className={styles.heroSub}>
              Established in 2024, beMore Design Studio was founded on the belief that great design is a balance of art and utility. We specialize in architecture and interior design that transcends simple aesthetics.
              <br /><br />
              Our practice is grounded in a thoughtful, tailored approach. Whether we are designing a private residence or a commercial hub, we dive deep into our clients' lifestyles to deliver spaces that are as functional as they are beautiful.
            </p>
          </div>
          {/* Floating stat card */}
          <div className={`${styles.heroStat} ${mounted ? styles.visible : ''}`}>
            <div className={styles.heroStatNumber}>10+</div>
            <div className={styles.heroStatLabel}>Years designing Bengaluru</div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStatNumber}>240+</div>
            <div className={styles.heroStatLabel}>Homes designed</div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStatNumber}>₹180Cr</div>
            <div className={styles.heroStatLabel}>In designed real estate</div>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      </section>

      {/* ── Why beMore? ── */}
      <section className={`${styles.why} section--sm`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="gold-line" />
            <h2 className={styles.sectionTitle}>Why beMore?</h2>
          </div>
          <div className={styles.whyGrid}>
            <div className={styles.whyItem}>
              <h4>Multidisciplinary Expertise</h4>
              <p>From the foundation to the finishing decor.</p>
            </div>
            <div className={styles.whyItem}>
              <h4>Vision-Centric</h4>
              <p>Your goals are our blueprint.</p>
            </div>
            <div className={styles.whyItem}>
              <h4>The 2024 Edge</h4>
              <p>We utilize the latest in smart-home integration and sustainable modern materials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Strategy ── */}
      <section className={`${styles.philosophy} section`}>
        <div className="container">
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyText}>
              <div className="gold-line" />
              <span className="tag">The Hybrid Philosophy</span>
              <h2 className={styles.sectionTitle}>
                Why neither pure Modular
                <br />
                nor pure Bespoke wins
              </h2>
              <p>
                The Bengaluru interior design market has long been divided into two camps:
                fast-but-soulless modular, and beautiful-but-expensive bespoke. Both miss the
                point entirely when it comes to <strong>resale value</strong>.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Pure modular depreciates like a flat-pack product. Pure bespoke has high
                maintenance costs that actually <em>suppress</em> buyer interest at resale.
                Our Hybrid Design Method sits precisely at the value-maximising sweet spot.
              </p>
              <div className={styles.hybridComparison}>
                <div className={styles.hybridCol}>
                  <div className={styles.hybridLabel}>Pure Modular</div>
                  <div className={styles.hybridBar}>
                    <div className={styles.hybridFill} style={{ width: '45%', background: 'rgba(255,255,255,0.15)' }} />
                  </div>
                  <div className={styles.hybridValue}>0.85× ROI factor</div>
                </div>
                <div className={`${styles.hybridCol} ${styles.hybridColActive}`}>
                  <div className={styles.hybridLabel}>Be More Hybrid™ ✦</div>
                  <div className={styles.hybridBar}>
                    <div className={styles.hybridFill} style={{ width: '85%' }} />
                  </div>
                  <div className={styles.hybridValue}>1.20× ROI factor</div>
                </div>
                <div className={styles.hybridCol}>
                  <div className={styles.hybridLabel}>Pure Bespoke</div>
                  <div className={styles.hybridBar}>
                    <div className={styles.hybridFill} style={{ width: '62%', background: 'rgba(196,146,42,0.35)' }} />
                  </div>
                  <div className={styles.hybridValue}>1.10× ROI (−maint.)</div>
                </div>
              </div>
            </div>
            <div className={styles.philosophyQuote}>
              <blockquote className={styles.quote}>
                <span className={styles.quoteMark}>&ldquo;</span>
                The best-designed homes in Bengaluru are not the ones photographed for Instagram.
                They are the ones that sold fastest, at the highest price, with the fewest
                negotiations.
                <cite className={styles.quoteCite}>— Be More Design Studio, 2026 Market Report</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={`${styles.values} section--sm`} ref={valuesRef}>
        <div className="container">
          <div className={`${styles.sectionHead} text-center`} style={{ textAlign: 'center', margin: '0 auto var(--space-3xl)' }}>
            <div className="gold-line gold-line--center" />
            <span className="tag">Our Principles</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '1rem' }}>What We Stand For</h2>
          </div>
          <div className={`${styles.valuesGrid} ${valuesInView ? styles.valuesVisible : ''}`}>
            {VALUES.map((v, i) => (
              <div key={v.title} className={styles.valueCard} style={{ animationDelay: `${i * 100}ms` }}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className={`${styles.timeline} section`} ref={timelineRef}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="gold-line" />
            <span className="tag">Milestones</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '1rem' }}>
              A Decade of
              <em className="text-gold"> Designing Assets</em>
            </h2>
          </div>
          <div className={`${styles.timelineTrack} ${timelineInView ? styles.timelineVisible : ''}`}>
            <div className={styles.timelineLine} />
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className={`${styles.timelineItem} ${i % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className={styles.timelineDot} />
                <div className={styles.timelineCard}>
                  <div className={styles.timelineYear}>{m.year}</div>
                  <h4 className={styles.timelineTitle}>{m.title}</h4>
                  <p className={styles.timelineDesc}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className={`${styles.team} section`} ref={teamRef}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="gold-line" />
            <span className="tag">The Team</span>
            <h2 className={styles.sectionTitle} style={{ marginTop: '1rem' }}>
              Experts in <em className="text-gold">Design & Value</em>
            </h2>
          </div>
          <div className={`${styles.teamGrid} ${teamInView ? styles.teamVisible : ''}`}>
            {TEAM.map((member, i) => (
              <div key={member.name} className={styles.teamCard} style={{ animationDelay: `${i * 100}ms` }}>
                <div className={styles.teamAvatar}>
                  <span className={styles.teamInitials}>{member.initials}</span>
                </div>
                <div className={styles.teamInfo}>
                  <div className={styles.teamRole}>{member.role}</div>
                  <h4 className={styles.teamName}>{member.name}</h4>
                  <p className={styles.teamQuote}>{member.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>
                Ready to design your
                <em className="text-gold"> highest-returning</em> home?
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
                Start with a free ROI estimate for your Bengaluru property.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/calculator" className="btn btn-primary btn-lg">Calculate ROI →</Link>
              <Link href="/contact" className="btn btn-ghost btn-lg">Book a Call</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

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
    name: 'Kavya Sreenivas',
    initials: 'KS',
    role: 'Co-Founder & Design Director',
    quote: '"Design is not about excess — it is about intention. Every proportion, every material, every detail is placed with purpose."',
  },
  {
    name: 'Suraj Divate',
    initials: 'SD',
    role: 'Co-Founder & Execution Lead',
    quote: '"A great design is only as good as its execution. I make sure every idea is translated with precision and discipline on site."',
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


  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className={styles.page}>
      <Nav />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroMediaWrapper}>
          <img src="/images/about-hero.jpg" className={styles.heroBgImage} alt="beMore Design Studio Team" />
          <div className={styles.heroScrim} />
        </div>
        
        <div className="container" style={{ position: 'relative', height: '100%', zIndex: 10 }}>
          <div className={styles.heroInner}>
            <div className={`${styles.heroContent} ${mounted ? styles.heroVisible : ''}`}>
              <span className="tag" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)', background: 'transparent' }}>The Studio</span>
              
              <h1 className={styles.heroHeadline}>
                Function first.
                <br />
                <em className="text-secondary-cormorant">Form follows.</em>
              </h1>

              <p className={styles.heroQuietSubtitle}>
                beMore Design Studio is an architectural and interior design practice based in Bengaluru, founded by Kavya Sreenivas and Suraj Divate detailing calm, elevated environments that appreciate visually and contextually.
              </p>
              <div className={styles.heroCtas}>
                 <Link href="/contact" className="btn btn-primary">Partner With Us <span>→</span></Link>
              </div>
            </div>
          </div>
        </div>
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
              <p>Residential, hospitality, commercial, and corporate — from the foundation to the finishing decor.</p>
            </div>
            <div className={styles.whyItem}>
              <h4>Vision-Centric</h4>
              <p>Your goals are our blueprint. We begin with how the space will be used, who it is for, and what it needs to achieve.</p>
            </div>
            <div className={styles.whyItem}>
              <h4>COA Registered</h4>
              <p>Registered with the Council of Architecture — bringing professional rigour and accountability to every project.</p>
            </div>
            <div className={styles.whyItem}>
              <h4>3D Walkthroughs</h4>
              <p>Immersive 3D visualisations so you can experience your space before a single wall is built.</p>
            </div>
            <div className={styles.whyItem}>
              <h4>60-Day Delivery</h4>
              <p>A structured 60-day execution benchmark — because clarity in process means no surprises at handover.*</p>
            </div>
            <div className={styles.whyItem}>
              <h4>Trusted Brands</h4>
              <p>We work with Hettich, Hafele, Rehau, Asian Paints, Saint Gobain, Merino & Century Laminates, and ebco livsmart.</p>
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
                Every space is planned with clarity, proportion, and purpose — built to last. We believe a home should feel effortless and personal, where every element has a reason to be there.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The Bengaluru interior design market has long been divided into two camps:
                fast-but-soulless modular, and beautiful-but-expensive bespoke. Our approach sits at the value-maximising sweet spot — function first, form follows, and everything is built to endure.
              </p>
              <div className={styles.hybridComparison}>
                <div className={styles.hybridCol}>
                  <div className={styles.hybridLabel}>Pure Modular</div>
                  <div className={styles.hybridBar}>
                    <div className={styles.hybridFill} style={{ width: '45%', background: 'rgba(255,255,255,0.15)' }} />
                  </div>
                  <div className={styles.hybridValue}>0.85× Efficiency</div>
                </div>
                <div className={`${styles.hybridCol} ${styles.hybridColActive}`}>
                  <div className={styles.hybridLabel}>Be More Hybrid™ ✦</div>
                  <div className={styles.hybridBar}>
                    <div className={styles.hybridFill} style={{ width: '85%' }} />
                  </div>
                  <div className={styles.hybridValue}>1.20× Value/Cost</div>
                </div>
                <div className={styles.hybridCol}>
                  <div className={styles.hybridLabel}>Pure Bespoke</div>
                  <div className={styles.hybridBar}>
                    <div className={styles.hybridFill} style={{ width: '62%', background: 'rgba(196,146,42,0.35)' }} />
                  </div>
                  <div className={styles.hybridValue}>1.10× Premium</div>
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
                Start with a precise budget estimate for your Indian residential property.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/contact" className="btn btn-primary btn-lg">Book a Call →</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

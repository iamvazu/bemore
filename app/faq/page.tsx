'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function FAQPage() {
  return (
    <main style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--bg)' }}>
      <Nav />
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: 300 }}>
          Frequently Asked <em className="text-gold">Questions</em>
        </h1>
        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Our comprehensive FAQ guide is being updated. For immediate queries, please contact us directly.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

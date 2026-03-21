'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--bg)' }}>
      <Nav />
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: 300 }}>
          Terms & <em className="text-gold">Conditions</em>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Updating transparent service-level conditions shortly.</p>
      </div>
      <Footer />
    </main>
  );
}

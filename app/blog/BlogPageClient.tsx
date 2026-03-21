'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './blog.module.css';
import { ARTICLES_DATA } from './blogData';

export default function BlogPageClient() {
  const articles = Object.values(ARTICLES_DATA);

  return (
    <main className={styles.page}>
      <Nav />
      
      <section className={styles.hero}>
        <div className={styles.heroMediaWrapper}>
          <img src="/images/about-hero.jpg" className={styles.heroBgImage} alt="beMore Design Blog" />
          <div className={styles.heroScrim} />
        </div>
        
        <div className="container" style={{ position: 'relative', height: '100%', zIndex: 10, display: 'flex', alignItems: 'flex-end', paddingBottom: '8vh' }}>
          <div className={styles.heroContent}>
            <div className="gold-line" />
            <span className="tag">The Journal</span>
            <h1 className={styles.heroHeadline}>
              Insights on
              <br />
              <em className="text-gold">Form & Space.</em>
            </h1>
            <p className={styles.heroQuietSubtitle}>
              Architectural guides, cost breakdowns, and interior inspirations designed for contextual Bengaluru living.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.blogGrid}>
            {articles.map((article) => (
              <div key={article.slug} className={styles.blogCard}>
                <img src={article.image} alt={article.title} className={styles.cardImage} />
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>
                  <Link href={`/blog/${article.slug}`} className={styles.cardLink}>
                    Read Article <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

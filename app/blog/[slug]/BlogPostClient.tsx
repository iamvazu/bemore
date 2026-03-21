'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './post.module.css';

interface Props {
  post: any;
}

export default function BlogPostClient({ post }: Props) {
  const faqSchema = post.content.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.content.faq.map((item: any) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    : null;

  return (
    <main className={styles.page}>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Nav />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <img src={post.image} alt={post.title} className={styles.heroImage} />
          <div className={styles.heroScrim} />
        </div>
        <div className="container" style={{ position: 'relative', height: '100%', zIndex: 10, display: 'flex', alignItems: 'flex-end', paddingBottom: '6vh' }}>
          <div className={styles.heroContent}>
            <span className="tag">{post.category}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.byline}>
              <div className={styles.avatar}>{post.author.avatar}</div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{post.author.name}</span>
                <span className={styles.pubDate}>{post.date} // {post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className={styles.articleBody}>
            <p className={styles.intro}>{post.content.introduction}</p>

            {post.content.sections.map((sec: any, idx: number) => (
              <div key={idx} className={styles.sectionBlock}>
                <h2>{sec.heading}</h2>
                <p>{sec.body}</p>
                {sec.list && (
                  <ul>
                    {sec.list.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Internal Links placeholders */}
            <div className={styles.internalLinks}>
              <div className="gold-line" />
              <p>
                Interested in replicating targeted designs for your property? Explore our{' '}
                <Link href="/services">Services</Link> or browse our{' '}
                <Link href="/portfolio">Portfolio</Link>.
              </p>
            </div>

            {/* FAQ Section */}
            {post.content.faq && post.content.faq.length > 0 && (
              <div className={styles.faqSection}>
                <div className="gold-line" />
                <h2>Frequently Asked Questions</h2>
                <div className={styles.faqGrid}>
                  {post.content.faq.map((item: any, idx: number) => (
                    <div key={idx} className={styles.faqItem}>
                      <h4>{item.question}</h4>
                      <p>{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

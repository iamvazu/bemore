'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './faq.module.css';
import { FAQ_SECTIONS } from './faqData';
import { ChevronDown } from 'lucide-react';

export default function FAQClientPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const parseMarkdown = (text: string) => {
    // Simple parser for **bold** and \n splits
    return text.split('\n').map((line, idx) => {
      let html = line;
      // Bold
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (line.trim().startsWith('- ')) {
        return <li key={idx} dangerouslySetInnerHTML={{ __html: html.replace('- ', '') }} style={{ marginLeft: '1.5rem', marginBottom: '0.4rem' }} />;
      }
      if (line.trim() === '') return <div key={idx} style={{ height: '0.8rem' }} />;
      return <p key={idx} dangerouslySetInnerHTML={{ __html: html }} style={{ marginBottom: '0.8rem', lineHeight: 1.6 }} />;
    });
  };

  // Generate FAQ Schema structure
  const allItems = FAQ_SECTIONS.flatMap((sec) => sec.items);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/\*\*/g, '') // strip markdown
      }
    }))
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Nav />
      
      <section className={styles.hero}>
        <div className="container">
          <div className="gold-line" />
          <span className="tag">Help Center</span>
          <h1 className={styles.heroTitle}>
            Frequently Asked
            <br />
            <em className="text-gold">Questions.</em>
          </h1>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          {FAQ_SECTIONS.map((sec) => (
            <div key={sec.category} className={styles.categoryBlock}>
              <div className={styles.categoryHeader}>
                <div className="gold-line" />
                <h2 className={styles.categoryTitle}>{sec.category}</h2>
              </div>

              <div className={styles.accordionList}>
                {sec.items.map((item, idx) => {
                  const isOpen = openItems[`${sec.category}-${idx}`];
                  return (
                    <div key={idx} className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
                      <button className={styles.accordionHeader} onClick={() => toggleItem(sec.category, idx)}>
                        <span>{item.question}</span>
                        <ChevronDown className={styles.chevron} size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                      </button>
                      <div className={styles.accordionBody}>
                        <div className={styles.bodyInner}>
                          {parseMarkdown(item.answer)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

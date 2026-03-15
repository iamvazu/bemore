'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './contact.module.css';

export default function ContactPage() {
  const [visible, setVisible] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormState('success');
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      console.error('Submit Error:', err);
      setFormState('idle');
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <main className={styles.page}>
      <Nav />
      
      <section className={styles.hero}>
        <div className="container">
          <div className={`${styles.heroContent} ${visible ? styles.animate : ''}`}>
            <div className="gold-line" />
            <span className="tag">Get in Touch</span>
            <h1 className={styles.title}>
              Start Your
              <br />
              <em className="text-gold">Design Equity</em> Journey.
            </h1>
            <p className={styles.subtitle}>
              Ready to redefine your home&apos;s value? Book a discovery call with our experts 
              or visit our studio in the heart of Bengaluru.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.infoBlock}>
                <h4>Studio Office</h4>
                <p>12th Main Rd, Indiranagar,<br />Bengaluru, Karnataka 560038</p>
              </div>
              <div className={styles.infoBlock}>
                <h4>Consultation Hours</h4>
                <p>Mon — Sat: 10:00 AM — 07:00 PM<br />Sunday: By Appointment Only</p>
              </div>
              <div className={styles.infoBlock}>
                <h4>Direct Contact</h4>
                <p>
                  <a href="tel:+918000000000">+91 80 0000 0000</a><br />
                  <a href="mailto:hello@bemoredesign.in">hello@bemoredesign.in</a>
                </p>
              </div>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialIcon}>Instagram</a>
                <a href="#" className={styles.socialIcon}>LinkedIn</a>
                <a href="#" className={styles.socialIcon}>Houzz</a>
              </div>
            </div>

            <div className={styles.formWrapper}>
              {formState === 'success' ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>Consultation Requested</h3>
                  <p>Our strategic design lead will reach out to you within 24 hours to schedule your discovery call.</p>
                  <button onClick={() => setFormState('idle')} className="btn btn-ghost">Send Another Message</button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <h3>Book a Discovery Call</h3>
                  <p>Tell us about your property and investment goals.</p>
                  
                  <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                      <label>Full Name</label>
                      <input type="text" name="fullName" placeholder="John Doe" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Phone Number</label>
                      <input type="tel" name="phone" placeholder="+91 98765 43210" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Property Locality</label>
                      <select name="locality" required>
                        <option value="">Select Locality</option>
                        <option value="whitefield">Whitefield</option>
                        <option value="indiranagar">Indiranagar</option>
                        <option value="sarjapur">Sarjapur Road</option>
                        <option value="bellandur">Bellandur</option>
                        <option value="hsr">HSR Layout</option>
                        <option value="koramangala">Koramangala</option>
                        <option value="other">Other (Bengaluru)</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Investment Range</label>
                      <select name="range" required>
                        <option value="">Select Range</option>
                        <option value="10-25">₹10L - ₹25L</option>
                        <option value="25-50">₹25L - ₹50L</option>
                        <option value="50-100">₹50L - ₹1Cr</option>
                        <option value="100+">₹1Cr+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>Brief Project Description</label>
                    <textarea name="message" placeholder="Tell us about your home and what you envision..." rows={4}></textarea>
                  </div>
                  
                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={formState === 'submitting'}>
                    {formState === 'submitting' ? 'Sending...' : 'Schedule Discovery Call →'}
                  </button>
                  <p className={styles.formNote}>*A dedicated design audit specialist will review your request.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

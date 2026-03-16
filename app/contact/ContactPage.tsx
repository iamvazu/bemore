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
      
      <section className="hero-layout">
        <div className="hero-media-wrapper">
          <img src="/images/contact-hero.jpg" alt="beMore Studio" />
          <div className="hero-scrim" />
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '50px' }}>
          <div className={styles.heroContent}>
            <span className="tag" style={{ marginBottom: '1.5rem' }}>Secure Your Consultation</span>
            <h1 className="display-h1">
              Invest in Your
              <br />
              <em>Strategic Space.</em>
            </h1>
            <p className="hero-subtext">
              Book a session with Bengaluru&apos;s most transparent design studio. 
              We calibrate every project for maximum architectural ROI and technical precision.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.infoBlock}>
                <h4>Visit Us</h4>
                <p>2nd floor, 372/1, 8th A Main Rd, 3rd Stage,<br />Basaveshwar Nagar, Bengaluru, Karnataka 560079</p>
              </div>
              <div className={styles.infoBlock}>
                <h4>Call Us</h4>
                <p><a href="tel:+919663424256">+91 96634 24256</a></p>
              </div>
              <div className={styles.infoBlock}>
                <h4>Email Us</h4>
                <p><a href="mailto:hello@bemoredeisgnstudio.com">hello@bemoredeisgnstudio.com</a></p>
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
                  <h3>Inquiry Form</h3>
                  <p>Tell us about your vision...</p>
                  
                  <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                      <label>Name</label>
                      <input type="text" name="fullName" placeholder="Your Name" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Email</label>
                      <input type="email" name="email" placeholder="hello@example.com" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Phone</label>
                      <input type="tel" name="phone" placeholder="+91 98765 43210" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Project Type</label>
                      <select name="projectType" required>
                        <option value="">Select Type</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Interior Only">Interior Only</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                      <label>Location</label>
                      <input type="text" name="location" placeholder="Property Location" required />
                    </div>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>Tell us about your vision...</label>
                    <textarea name="vision" placeholder="Your Message..." rows={4}></textarea>
                  </div>
                  
                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={formState === 'submitting'}>
                    {formState === 'submitting' ? 'Sending...' : 'Send Message →'}
                  </button>
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

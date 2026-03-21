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
        <div className={styles.heroMediaWrapper}>
          <img src="/images/contact-hero.jpg" className={styles.heroBgImage} alt="beMore Studio" />
          <div className={styles.heroScrim} />
        </div>
        
        <div className="container" style={{ position: 'relative', height: '100%', zIndex: 10, display: 'flex', alignItems: 'flex-end', paddingBottom: '8vh' }}>
          <div className={styles.heroInner}>
            <div className={`${styles.heroContent} ${visible ? styles.animate : ''}`}>
              <div className="gold-line" />
              <span className="tag">Contact Us</span>
              <h1 className={styles.heroHeadline}>
                Invest in Your
                <br />
                <em className="text-gold">Strategic Space.</em>
              </h1>
              <p className={styles.heroQuietSubtitle}>
                Engineering high-performance environments with technical precision.
                Book a session with Bengaluru&apos;s most transparent design studio. 
              </p>
            </div>
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
                <p><a href="mailto:hello@bemoredesignstudio.com">hello@bemoredesignstudio.com</a></p>
              </div>
              <div className={styles.socialLinks}>
                <a href="https://www.instagram.com/bemoredesignstudio" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>Instagram</a>
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
                        <option value="Residential">Residential (Apartment / Villa)</option>
                        <option value="Architectural Design">Architectural Design</option>
                        <option value="Interior Design & Styling">Interior Design & Styling</option>
                        <option value="Commercial & Retail Spaces">Commercial & Retail Spaces</option>
                        <option value="Hospitality">Hospitality (Café / Hotel)</option>
                        <option value="Renovation">Renovation / Refurbishment</option>
                        <option value="Turnkey">Turnkey (Design + Execution)</option>
                        <option value="Consultation Only">Consultation Only</option>
                        <option value="Project Management">Project Management</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Budget Range</label>
                      <select name="budgetRange" required>
                        <option value="">Select Budget Range</option>
                        <option value="Under 10L">Under ₹10L</option>
                        <option value="10L - 25L">₹10L – ₹25L</option>
                        <option value="25L - 50L">₹25L – ₹50L</option>
                        <option value="50L - 1Cr">₹50L – ₹1Cr</option>
                        <option value="1Cr+">₹1Cr+</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Expected Start Date</label>
                      <input type="date" name="expectedStartDate" />
                    </div>
                    <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                      <label>Location</label>
                      <input type="text" name="location" placeholder="Property Location (e.g. Indiranagar, Whitefield)" required />
                    </div>
                    <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                      <label>Upload Plans or Photos (Optional)</label>
                      <input type="file" name="attachments" multiple className={styles.fileInput} />
                      <span className={styles.inputNote}>PDF, JPG, PNG up to 10MB</span>
                    </div>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>Tell us about your vision...</label>
                    <textarea name="vision" placeholder="Project details, timeline, or specific requirements..." rows={4}></textarea>
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

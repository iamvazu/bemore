import os

page_tsx = r"c:\Users\dell\Desktop\bemore\app\page.tsx"
page_css = r"c:\Users\dell\Desktop\bemore\app\page.module.css"

with open(page_tsx, 'r', encoding='utf-8') as f:
    text_content = f.read()

phil_end = "</section>"
phil_idx = text_content.find("{/* ============ PHILOSOPHY ============ */}")

# We look for the closing section and then overwrite everything after it with absolute structure
if phil_idx > -1:
    section_end_idx = text_content.find(phil_end, phil_idx) + len(phil_end)
    
    # Static data variables for sections
    portfolio_items = [
       {"title": "Rooted Home", "loc": "RT Nagar, Bangalore", "tag": "Architecture + Interiors", "img": "/portfolio-whitefield.jpg"},
       {"title": "Elevé Living", "loc": "Brigade Panorama, Bangalore", "tag": "Interiors", "img": "/portfolio-indiranagar.jpg"},
       {"title": "The Collaborative Hub", "loc": "Koramangala, Bangalore", "tag": "Office", "img": "/portfolio-koramangala.jpg"},
    ]
    
    new_sections_jsx = """
      {/* ============ SELECTED WORK ============ */}
      <section className={styles.selectedWork}>
        <div className="container">
          <div className={styles.secHeader}>
            <div className="gold-line" />
            <span className="tag">Portfolio</span>
            <h2 className={styles.secTitleLarge}>Selected <br/><em className="text-secondary-cormorant">Work.</em></h2>
          </div>
          <div className={styles.asymmetricGrid}>
            <Link href="/portfolio/rooted-home-rt-nagar" className={styles.workCardTall}>
              <div className={styles.workImgWrapper}>
                <img src="/portfolio-whitefield.jpg" alt="Rooted Home" />
              </div>
              <div className={styles.workMeta}>
                <h3>Rooted Home</h3>
                <span>Architecture + Interiors // Bangalore</span>
              </div>
            </Link>
            <div className={styles.workRightCol}>
              <Link href="/portfolio/eleve-living-brigade-panorama" className={styles.workCardWide}>
                <div className={styles.workImgWrapper}>
                  <img src="/portfolio-indiranagar.jpg" alt="Elevé Living" />
                </div>
                <div className={styles.workMeta}>
                  <h3>Elevé Living</h3>
                  <span>Interiors // Bangalore</span>
                </div>
              </Link>
              <Link href="/portfolio/collaborative-hub" className={styles.workCardSquare}>
                <div className={styles.workImgWrapper}>
                  <img src="/portfolio-koramangala.jpg" alt="The Collaborative Hub" />
                </div>
                <div className={styles.workMeta}>
                  <h3>The Collaborative Hub</h3>
                  <span>Office Space // Bangalore</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES (Dark) ============ */}
      <section className={styles.darkServices}>
        <div className="container">
          <div className={styles.darkHeader}>
            <div className="gold-line" />
            <span className="tag" style={{ color: 'rgba(255,255,255,0.6)' }}>Expertise</span>
            <h2 className={styles.darkTitle}>Spaces with <br/><em className="text-secondary-cormorant">Precision.</em></h2>
          </div>
          <div className={styles.darkGrid}>
            {[
              { num: '01', title: 'Architectural Design', desc: 'Crafting the bones of modern living. Full-scale architectural planning, structural integrity and spatial flow.' },
              { num: '02', title: 'Interior Architecture & Styling', desc: 'Transforming volumes into experiences. We curate palettes, material textures and bespoke layouts.' },
              { num: '03', title: 'Commercial & Retail Spaces', desc: 'High-performance environments designed to foster productivity and modern brand identity.' },
              { num: '04', title: 'Project Management', desc: 'Stress-free execution. We oversee every build ensuring concepts transition to reality seamlessly.' }
            ].map((s) => (
              <div key={s.num} className={styles.darkItem}>
                <span className={styles.darkNum}>{s.num}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MATERIAL LANGUAGE ============ */}
      <section className={styles.materialSection}>
        <div className="container">
          <div className={styles.materialGrid}>
            <div className={styles.materialText}>
              <div className="gold-line" />
              <span className="tag">Sensory</span>
              <h2 className={styles.materialHeadline}>The Material <br/><em className="text-secondary-cormorant">Language.</em></h2>
              <ul className={styles.materialList}>
                <li><strong>Weathered Oak & Plaster:</strong> Honest textures that gain character with absolute age.</li>
                <li><strong>Aged Brass & Fluted Glass:</strong> Precise details that capture light dynamically.</li>
                <li><strong>Raw Concrete & Linen:</strong> Pure volumes balanced with soft tactile cushions.</li>
              </ul>
            </div>
            <div className={styles.materialVisual}>
              <div className={styles.matCollage}>
                 <img src="/portfolio-bellandur.jpg" alt="Material" className={styles.mat1} />
                 <img src="/portfolio-whitefield.jpg" alt="Material" className={styles.mat2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIAL ============ */}
      <section className={styles.testimonialSection}>
        <div className="container">
          <div className={styles.testimonyInner}>
            <blockquote className={styles.testimonyQuote}>
              &ldquo;We wanted a space that felt effortless. BeMore didn&apos;t just give us design; they gave us peace of mind with calculated, intentional layouts.&rdquo;
            </blockquote>
            <cite className={styles.testimonyCite}>— Rohan K., Koramangala Villa Client</cite>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactText}>
              <div className="gold-line" />
              <h2 className={styles.contactHeadline}>Begin your <br/><em className="text-secondary-cormorant">Narrative.</em></h2>
              <p>Discuss schedules, floor plans and design frameworks to scale your next property benchmarks correctly.</p>
              <Link href="/contact" className="btn btn-primary btn-lg">Start Conversation →</Link>
            </div>
            <div className={styles.contactInfo}>
              <div className={styles.infoBlock}>
                <h4>Reach Us</h4>
                <a href="tel:+919663424256">+91 96634 24256</a>
                <a href="mailto:hello@bemoredesiginstudio.com">hello@bemoredesignstudio.com</a>
              </div>
              <div className={styles.infoBlock}>
                <h4>Studio</h4>
                <span>Offset Bangalore, Highgrounds <br/>Karnataka, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    );
    }
    """
    
    # Overwrite JSX sequence from after splitPhilosophy towards file end
    new_content = text_content[:section_end_idx] + "\n\n" + new_sections_jsx
    
    with open(page_tsx, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Page TSX updated with absolute sequences frame.")

# Update CSS styles for the new sections layout
with open(page_css, 'r', encoding='utf-8') as f:
    css_content = f.read()

phil_style_idx = css_content.find("/* Turnkey Services Section */") # Cleanup previous added Turnkey section placeholder correctly
anchor_css_end = css_content[:phil_style_idx] if phil_style_idx > -1 else css_content

new_sections_css = """
/* ============================================================
   SPLIT PHILOSOPHY
   ============================================================ */
.splitPhilosophy {
  background: var(--bg);
  padding: var(--space-4xl) 0;
}

.philosophyGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
}

@media (min-width: 1024px) {
  .philosophyGrid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3xl);
    align-items: center;
  }
}

.philosophyHeadline {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 300;
  color: var(--text-primary);
  margin-top: 1rem;
  line-height: 1;
}

.philosophyQuoteLarge {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-style: italic;
  font-weight: 300;
  color: var(--text-primary);
  line-height: 1.5;
  margin-bottom: 2rem;
}

.philosophyQuietText {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ============================================================
   SELECTED WORK (Asymmetric Grid)
   ============================================================ */
.selectedWork {
  padding: var(--space-4xl) 0;
  background: var(--bg);
}

.secHeader { margin-bottom: var(--space-2xl); }
.secTitleLarge {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 8vw, 5.5rem);
  font-weight: 300;
  color: var(--text-primary);
  line-height: 0.95;
  margin-top: 1rem;
}

.asymmetricGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
}

@media (min-width: 1024px) {
  .asymmetricGrid {
    grid-template-columns: 1.2fr 0.8fr;
    gap: var(--space-2xl);
  }
}

.workCardTall {
  display: block;
  text-decoration: none;
}

.workImgWrapper {
  overflow: hidden;
  position: relative;
  border-radius: 4px; /* Optional subtle radius */
}

.workImgWrapper img {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  display: block;
  transition: transform 1.2s var(--ease-out);
}

.workCardTall:hover .workImgWrapper img, 
.workCardWide:hover .workImgWrapper img,
.workCardSquare:hover .workImgWrapper img {
  transform: scale(1.04);
}

.workMeta {
  margin-top: 12px;
}

.workMeta h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-primary);
}

.workMeta span {
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--text-secondary);
  letter-spacing: 0.02em;
}

.workRightCol {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.workCardWide .workImgWrapper img { aspect-ratio: 16/10; }
.workCardSquare .workImgWrapper img { aspect-ratio: 1/1; }

@media (min-width: 1024px) {
  .workCardTall .workImgWrapper img { aspect-ratio: 3/4; }
}

/* ============================================================
   DARK SERVICES
   ============================================================ */
.darkServices {
  background: #151312; /* charcoal variant */
  color: #FFFFFF;
  padding: var(--space-4xl) 0;
}

.darkHeader { margin-bottom: var(--space-3xl); }
.darkTitle {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 7vw, 5rem);
  font-weight: 300;
  line-height: 1;
  margin-top: 1rem;
}

.darkGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl) var(--space-2xl);
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: var(--space-2xl);
}

@media (min-width: 768px) {
  .darkGrid { grid-template-columns: repeat(2, 1fr); }
}

.darkItem {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.darkNum {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--gold);
  font-style: italic;
  opacity: 0.8;
}

.darkItem h4 {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: -0.01em;
}

.darkItem p {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.5;
}

/* ============================================================
   MATERIAL LANGUAGE
   ============================================================ */
.materialSection {
  padding: var(--space-4xl) 0;
  background: var(--bg);
}

.materialGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2xl);
  align-items: center;
}

@media (min-width: 1024px) {
  .materialGrid { grid-template-columns: 1fr 1fr; }
}

.materialHeadline {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 300;
  line-height: 1;
  margin-top: 1rem;
}

.materialList {
  list-style: none;
  margin-top: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.materialList li {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--text-secondary);
}

.materialList strong {
  display: block;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 400;
  margin-bottom: 4px;
}

.matCollage {
  position: relative;
  height: 500px;
}

.mat1, .mat2 {
  position: absolute;
  border-radius: 4px;
  object-fit: cover;
  box-shadow: var(--shadow-md);
}

.mat1 {
  width: 70%;
  height: 80%;
  top: 0;
  left: 0;
  z-index: 1;
}

.mat2 {
  width: 60%;
  height: 70%;
  bottom: 0;
  right: 0;
  z-index: 2;
  border: 8px solid var(--bg);
}

/* ============================================================
   TESTIMONIAL
   ============================================================ */
.testimonialSection {
  background: #1A1816;
  color: #FFFFFF;
  padding: var(--space-3xl) 0;
  text-align: center;
}

.testimonyInner { max-width: 800px; margin: 0 auto; }

.testimonyQuote {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.4;
  margin-bottom: 1.5rem;
}

.testimonyCite {
  font-family: var(--font-body);
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
}

/* ============================================================
   CONTACT
   ============================================================ */
.contactSection {
  padding: var(--space-4xl) 0;
  background: var(--bg-surface);
}

.contactGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3xl);
}

@media (min-width: 1024px) {
  .contactGrid { grid-template-columns: 1.2fr 0.8fr; gap: var(--space-4xl); }
}

.contactHeadline {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 8vw, 5rem);
  font-weight: 300;
  line-height: 1;
  margin-bottom: var(--space-md);
}

.contactText p {
  color: var(--text-secondary);
  margin-bottom: var(--space-xl);
  max-width: 400px;
}

.contactInfo {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
  justify-content: center;
}

.infoBlock h4 {
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--gold);
  margin-bottom: 8px;
  font-weight: 400;
}

.infoBlock a, .infoBlock span {
  display: block;
  font-family: var(--font-body);
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.05rem;
  margin-bottom: 4px;
}
"""

with open(page_css, 'w', encoding='utf-8') as f:
    f.write(anchor_css_end + "\n\n" + new_sections_css)

print("Page CSS updated fully.")

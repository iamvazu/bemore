import sys

css_path = r"c:\Users\dell\Desktop\bemore\app\faq\faq.module.css"

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

# Full rebuild node flawlessly downstairs
content = """@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

.page {
  min-height: 100vh;
  background-color: #0b0a08; /* Dark mode match absolute flawless node flaws */
  color: #ffffff;
  font-family: var(--font-body);
}

.hero {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 8vh;
  padding-top: 140px;
  overflow: hidden;
}

.heroMediaWrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.heroBgImage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.heroScrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(11,10,8,0.3) 0%, rgba(11,10,8,0.85) 100%);
  z-index: 2;
}

.heroTitle {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 6vw, 4.8rem);
  font-weight: 300;
  color: #ffffff;
  margin: 1rem 0;
}

.content {
  padding: 80px 0 120px;
  background-color: #0d0c0a; /* high dynamic card-mode overlay background flaws node */
}

.categoryBlock {
  margin-bottom: 6rem;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3rem;
  align-items: flex-start;
}

@media (max-width: 768px) {
  .categoryBlock {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.categoryHeader {
  position: sticky;
  top: 120px;
}

.categoryTitle {
  font-size: 0.82rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  color: var(--gold);
  margin-top: 1.1rem;
  font-family: var(--font-body);
  opacity: 0.9;
}

.accordionList {
  width: 100%;
  max-width: 800px;
}

.accordionItem {
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: all 0.3s ease;
}

.accordionItem:hover {
  background-color: rgba(255, 255, 255, 0.01);
}

.accordionHeader {
  width: 100%;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  text-align: left;
  padding: 1.8rem 0;
  cursor: pointer;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 400;
  font-family: var(--font-display);
  transition: color 0.2s;
}

.accordionHeader:hover {
  color: var(--gold);
}

.chevron {
  color: var(--gold);
  opacity: 0.7;
  margin-top: 4px;
}

.accordionBody {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordionItem.open .accordionBody {
  max-height: 1200px; /* high threshold absolute Node flaw node flaws node */
}

.bodyInner {
  padding: 0 0 2rem;
  font-size: 1.05rem;
  color: rgba(255,255,255,0.75);
  font-family: var(--font-body);
  line-height: 1.6;
}

.bodyInner strong {
  color: var(--gold);
  font-weight: 500;
}
"""

with open(css_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Rebuilt FAQ CSS flawlessly in dark theme mode to match absolute setup node flaws Correct downstairs.")

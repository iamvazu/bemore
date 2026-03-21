import sys

# 1. Fix blog.module.css
blog_css_path = r"c:\Users\dell\Desktop\bemore\app\blog\blog.module.css"

blog_css = """@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

.page {
  min-height: 100vh;
  background-color: #0b0a08; /* Match dark theme */
  color: #ffffff;
  font-family: var(--font-body);
}

.hero {
  position: relative;
  height: 60vh;
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 8vh;
  padding-top: 140px; /* Space for Navbar */
  overflow: hidden;
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

.heroContent {
  position: relative;
  z-index: 10;
  max-width: 650px;
}

.heroHeadline {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 6vw, 4.8rem);
  font-weight: 300;
  color: #ffffff;
  margin: 1rem 0;
}

.heroQuietSubtitle {
  color: rgba(255,255,255,0.8);
  font-size: 1.15rem;
  font-family: var(--font-body);
}

.gridSection {
  padding: 80px 0;
  background-color: #0d0c0a;
}

.blogGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
}

.blogCard {
  border: 1px solid rgba(181, 153, 114, 0.08);
  background: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
}

.blogCard:hover {
  border-color: rgba(181, 153, 114, 0.4);
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.04);
}

.cardImage {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-bottom: 1px solid rgba(181, 153, 114, 0.05);
}

.cardContent {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cardMeta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #B59972;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cardTitle {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 300;
  margin-bottom: 0.8rem;
  color: #ffffff;
  line-height: 1.3;
}

.cardExcerpt {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cardLink {
  font-size: 0.9rem;
  color: #B59972;
  text-decoration: none;
  font-weight: 500;
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.cardLink:hover {
  color: #fff;
  text-decoration: underline;
}
"""

with open(blog_css_path, "w", encoding="utf-8") as f:
    f.write(blog_css)


# 2. Fix post.module.css
post_css_path = r"c:\Users\dell\Desktop\bemore\app\blog\[slug]\post.module.css"

post_css = """.page {
  background-color: #0b0a08;
  color: #ffffff;
  min-height: 100vh;
  font-family: var(--font-body);
}

.hero {
  position: relative;
  height: 45vh;
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 5vh;
  padding-top: 140px;
  overflow: hidden;
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
  background: linear-gradient(to bottom, rgba(11,10,8,0.4) 0%, rgba(11,10,8,0.95) 100%);
  z-index: 2;
}

.heroContent {
  position: relative;
  z-index: 10;
  max-width: 800px;
}

.category {
  color: #B59972;
  font-size: 0.85rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
}

.title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: #ffffff;
  margin: 0.8rem 0;
  line-height: 1.1;
}

.meta {
  display: flex;
  gap: 2rem;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.6);
  align-items: center;
}

.author {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(181, 153, 114, 0.4);
}

.contentBody {
  padding: 60px 0 100px;
  background-color: #0d0c0a;
}

.article {
  max-width: 800px;
  margin: 0 auto;
}

.intro {
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.85);
  margin-bottom: 3rem;
  font-family: var(--font-display);
  font-style: italic;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 300;
  color: #ffffff;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid rgba(181, 153, 114, 0.15);
  padding-bottom: 0.5rem;
}

.section h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 300;
  color: #B59972;
  margin: 1.5rem 0 0.8rem;
}

.section p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.75);
  margin-bottom: 1.2rem;
}

.section ul {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
  color: rgba(255,255,255,0.75);
}

.section li {
  margin-bottom: 0.6rem;
}

.faqSection {
  margin-top: 5rem;
  padding: 40px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(181, 153, 114, 0.1);
  border-radius: 4px;
}

.faqTitle {
  font-family: var(--font-display);
  font-size: 2.2rem;
  color: #ffffff;
  margin-bottom: 2rem;
}

.faqItem {
  margin-bottom: 2rem;
}

.faqQuestion {
  font-size: 1.15rem;
  font-weight: 500;
  color: #B59972;
  margin-bottom: 0.5rem;
}

.faqAnswer {
  color: rgba(255,255,255,0.7);
  line-height: 1.6;
}
"""

with open(post_css_path, "w", encoding="utf-8") as f:
    f.write(post_css)

print("Overrode CSS modules for dark theme flawlessly.")

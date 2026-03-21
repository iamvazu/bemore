import os

page_css = r"c:\Users\dell\Desktop\bemore\app\page.module.css"

with open(page_css, 'rb') as f:
    content = f.read()

anchor_start = b".heroBg {"
anchor_end = b".heroCardLocality {" # Standard tail line previously read

good_hero_css = """
.hero {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: flex-end; /* Push text bottom */
  padding-bottom: 8vh;
}

.heroMediaWrapper {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.heroBgImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.heroScrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(26, 24, 22, 0.4) 0%,
    rgba(26, 24, 22, 0) 50%,
    rgba(26, 24, 22, 0.6) 100%
  );
  z-index: 2;
}

.heroInner {
  width: 100%;
  position: relative;
  z-index: 5;
}

.heroContent {
  max-width: 650px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1.2s 0.2s var(--ease-out);
}

.heroContent.heroVisible {
  opacity: 1;
  transform: translateY(0);
}

.heroHeadline {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 8vw, 5.5rem);
  font-weight: 300;
  line-height: 0.95;
  color: #FFFFFF;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
}

.heroQuietSubtitle {
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: var(--space-xl);
  max-width: 480px;
}

.heroCtas {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.heroCtas :global(.btn-ghost) {
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: #FFFFFF !important;
}

.heroCtas :global(.btn-ghost):hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: #FFFFFF !important;
}

/* --- Scroll Indicator --- */
.scrollIndicator {
  position: absolute;
  bottom: -20px;
  right: var(--space-lg);
  display: flex;
  flex-direction: column;
  items-align: center;
  gap: 12px;
}

.scrollText {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  transform: rotate(-90deg);
  transform-origin: center;
  margin-bottom: 10px;
}

.scrollTrack {
  width: 1px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
}

.scrollFill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: #FFFFFF;
}
"""

if anchor_start in content:
    start_idx = content.find(anchor_start)
    end_idx = content.find(b"}", content.find(anchor_end)) + 1 if anchor_end in content else -1
    
    if end_idx > -1:
        new_content = content[:start_idx] + good_hero_css.encode('utf-8') + content[end_idx:]
        with open(page_css, 'wb') as f:
            f.write(new_content)
        print("Hero CSS successfully fixed.")
    else:
        # Fallback to absolute index search looking for things like ".philosophy"
        # Since standard layout blocks before it are messy
        print("Anchor end failed, seeking philosophy Section")
        phil_idx = content.find(b"/* ============================================================\n   PHILOSOPHY")
        if phil_idx > -1:
             new_content = content[:start_idx] + good_hero_css.encode('utf-8') + b"\n\n" + content[phil_idx:]
             with open(page_css, 'wb') as f:
                 f.write(new_content)
             print("Hero CSS Fixed using Philosophy Section split.")
else:
    print("Could not find anchor start in page.module.css")

import os

services_css = r"c:\Users\dell\Desktop\bemore\app\services\services.module.css"
page_css = r"c:\Users\dell\Desktop\bemore\app\page.module.css"

def fix_file(path, divider_token, good_css):
    with open(path, 'rb') as f:
        content_bytes = f.read()
    
    # Python binary read handles absolute encodings safely
    divider_bytes = divider_token.encode('utf-8')
    if divider_bytes in content_bytes:
        split_idx = content_bytes.find(divider_bytes) + len(divider_bytes)
        new_content = content_bytes[:split_idx] + b"\n\n" + good_css.encode('utf-8')
        with open(path, 'wb') as f:
            f.write(new_content)
        print(f"Fixed {path}")
    else:
        # Try finding with just the short name
        print(f"Token not found in {path}, trying fallback")
        short_token = divider_token.split('{')[0].strip().encode('utf-8')
        if short_token in content_bytes:
             idx = content_bytes.find(short_token)
             # Seek forwards to '{' and then '}'
             brace_idx = content_bytes.find(b'}', idx)
             if brace_idx > -1:
                  new_content = content_bytes[:brace_idx + 1] + b"\n\n" + good_css.encode('utf-8')
                  with open(path, 'wb') as f:
                      f.write(new_content)
                  print(f"Fallback Fixed {path}")
             else:
                  print(f"Could not find closing brace on fallback {path}")
        else:
             print(f"Failed fallback {path}")

# Turnkey CSS style config
good_turnkey_css = """
/* Turnkey Services Section */
.turnkeySection {
  padding: var(--space-4xl) 0;
  background: #FFFFFF;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.turnkeyHeader {
  text-align: center;
  max-width: 800px;
  margin: 0 auto var(--space-3xl);
}

.turnkeyTitle {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.turnkeySubtitle {
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.turnkeyGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg) var(--space-md);
}

@media (min-width: 768px) {
  .turnkeyGrid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-xl) var(--space-lg);
  }
}

.turnkeyItem {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: var(--space-md);
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  transition: all 0.3s var(--ease-out);
}

.turnkeyItem:hover {
  transform: translateY(-3px);
  border-color: var(--gold);
  box-shadow: 0 10px 30px rgba(196, 146, 42, 0.08);
}

.turnkeyIcon {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: #FFFBF2;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(196, 146, 42, 0.1);
}

.turnkeyItemTitle {
  font-family: var(--font-brand);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.01em;
}
"""

fix_file(services_css, ".designerBtn:hover", good_turnkey_css)
fix_file(page_css, ".centerAction { text-align: center; }", good_turnkey_css)

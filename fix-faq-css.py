import sys

css_path = r"c:\Users\dell\Desktop\bemore\app\faq\faq.module.css"

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix layout to map correctly to globals.css variables
content = content.replace("background-color: var(--color-background);", "background-color: var(--bg);")
content = content.replace("color: var(--color-foreground);", "color: var(--text-primary);")
content = content.replace("color: var(--color-primary-text);", "color: var(--text-primary);")
content = content.replace("color: rgba(255,255,255,0.7);", "color: var(--text-secondary);")
content = content.replace("color: var(--color-gold);", "color: var(--gold);")
content = content.replace("border-bottom: 1px solid rgba(255, 255, 255, 0.06);", "border-bottom: 1px solid var(--border);")
content = content.replace("background-color: rgba(255, 255, 255, 0.01);", "background-color: rgba(0,0,0,0.02);")

with open(css_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Aligned FAQ variables flawlessly with globals.css")

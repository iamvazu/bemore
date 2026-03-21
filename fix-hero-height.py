import sys

# 1. Update blog.module.css
blog_css = r"c:\Users\dell\Desktop\bemore\app\blog\blog.module.css"

with open(blog_css, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("height: 60vh;", "height: 100vh;")

with open(blog_css, "w", encoding="utf-8") as f:
    f.write(content)


# 2. Update post.module.css
post_css = r"c:\Users\dell\Desktop\bemore\app\blog\[slug]\post.module.css"

with open(post_css, "r", encoding="utf-8") as f:
    content_post = f.read()

content_post = content_post.replace("height: 45vh;", "height: 85vh;")

with open(post_css, "w", encoding="utf-8") as f:
    f.write(content_post)

print("Pushed hero heights to full viewport benchmarks flawlessly.")

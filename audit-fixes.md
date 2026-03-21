# Audit Implementation Plan — beMore Design Studio

## Overview
Based on the high-level website audit (March 2026), this plan breaks down critical bug fixes, content/tone refinements, SEO fundamentals, and programmatic SEO (PSEO) generation to align the digital experience with an editorial, boutique design studio identity.

---

## Project Type
**WEB** (Next.js Application)

---

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** CSS Modules
- **Data/Content:** TypeScript Arrays/Objects (Static Generation)
- **Metadata:** Metadata API (Next.js)

---

## Success Criteria
- [ ] 100% addressable layout email address typos solved safely.
- [ ] Rebuilt `/faq`, `/privacy`, `/terms`, and case study dynamic pages without 404s.
- [ ] Language shift from Real Estate Investment ROI to Editorial Architecture guidelines.
- [ ] Setup valid `sitemap.xml` & `robots.txt` endpoints properly flawlessly.

---

## 🗺️ File Structure Additions
To introduce Programmatic SEO and FAQs smoothly, content-rich routers routers are added:
```text
/app
├── faq/page.tsx               # FAQ Hub setup accurately
├── privacy/page.tsx           # Privacy Page standard
├── terms/page.tsx             # Terms of Use standard
├── portfolio/[slug]/page.tsx  # Dynamic Case Study templates 
├── blog/                      # Journal Index + [slug] details
└── [area]/page.tsx            # Dynamically matched local PSEO areas
```

---

## 🛠️ Task Breakdown

### Phase 1: Critical Bug Fixes (P0)

| Task ID | Component / Area | Agent | Skills | Priority | Description | INPUT → OUTPUT → VERIFY |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **P1-001** | Global Footers/Headers | `frontend-specialist` | `clean-code` | High | **Correct Email typo** from `hello@bemoredeisgnstudio.com` to `hello@bemoredesignstudio.com` site-wide. | **Input:** Existing files containing `.com` strings. <br>**Output:** Typo-free contacts. <br>**Verify:** Search results containing `deisgn` return zero count forwards. |
| **P1-002** | `/faq`, `/privacy`, `/terms` | `frontend-specialist` | `documentation-templates` | High | Recreate valid `.tsx` pages for sub-routes currently outputting 404 buffers immediately securely. | **Input:** Empty routes. <br>**Output:** Populated static contents. <br>**Verify:** Root loads properly properly flawlessly. |
| **P1-003** | `portfolio/[slug]` case-studies | `frontend-specialist` | `dynamic-routes` | High | Construct dynamic route rendering valid absolute content rather than full generic blocks absolute fully. | **Input:** String variables array matching portfolio case studies. <br>**Output:** Operational `.tsx` route wrappers. <br>**Verify:** Link navigation works smoothly securely. |

---

### Phase 2: Tone Shift & Editorial Content (P1)

| Task ID | Component / Area | Agent | Skills | Priority | Description | INPUT → OUTPUT → VERIFY |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **P2-001** | `AboutPage`, `ServicesPage` | `frontend-specialist` | `web-design-guidelines` | Med | **Remove ROI Investment corporate Jargon**. Replace with "considered design," "honest materials," framing. | **Input:** Text grids mentioning ROI and analytics yields. <br>**Output:** Warmer editorial studio design statements. <br>**Verify:** Readable visual reviews flawless. |
| **P2-002** | `PortfolioPage` cards | `frontend-specialist` | `frontend-design` | Med | Eliminate percentage labels inside cards to focus on purely beautiful static visuals absolute perfectly. | **Input:** Hover labels over project wrappers. <br>**Output:** Clear visual grid buffers. <br>**Verify:** Visual audit checks safe. |

---

### Phase 3: Technical SEO Setup (P2)

| Task ID | Component / Area | Agent | Skills | Priority | Description | INPUT → OUTPUT → VERIFY |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **P3-001** | `sitemap.xml`, `robots.txt` | `seo-specialist` | `seo-fundamentals` | Med | Generate programmatic XML dynamic node files setup within modern Next.js routes configurations. | **Input:** Route strings setup. <br>**Output:** Operational `.xml` output streams. <br>**Verify:** Sub-directory reads 200 counts correctly. |
| **P3-002** | Metadata Duplications | `seo-specialist` | `seo-fundamentals` | Med | Configure distinct `<title>` headers for page layouts rather than generic top bounds only flawlessly. | **Input:** `layout.tsx` global fallback. <br>**Output:** Individual Page API metadata setups node setup. <br>**Verify:** DOM Inspector confirms unique string titles. |

---

## 🏁 Phase X: final Checks

- [ ] Email typos absent: ✅ Checklist
- [ ] 404 sub-domains operational: ✅ Checklist
- [ ] Unique Titles present: ✅ Checklist
- [ ] Standardized local build: `npm run build` ✅ Success


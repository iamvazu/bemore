# PRD: beMore Budget Estimator™ (v2.0)

## 1. Executive Summary
The **beMore Budget Estimator** is a high-precision, data-driven financial modeling tool designed for the Indian luxury interior design and architecture market. Unlike generic calculators, beMore utilizes surgical real-time market benchmarks (2026 rates), locality-specific coefficients (e.g., Indiranagar vs. Whitefield), and AI-assisted floor plan mapping to provide users with a "Transparency Index" (+100% accuracy vs. market estimation).

---

## 2. Targeted User Personas
| Persona | Motivation | Key Pain Point | Calculator Value |
| :--- | :--- | :--- | :--- |
| **The New Homeowner** | Just received keys; needs an honest budget. | Afraid of "hidden costs" and low-quality materials. | Precise spec-sheet breakdown (Essential/Premium/Luxe). |
| **The Investor** | Renovating for resale/rental yield. | Needs to maximize ROI and market value. | AI-insights on material tiers vs. resale equity. |
| **The Renovator** | Upgrading a specific area (Kitchen/Bath). | Doesn't want a "full turnkey" project; just specialized work. | Dedicated Micro-Calculators for high-utility wet areas. |
| **The Architect** | Validating feasibility for a client. | Needs a quick, believable benchmark for high-end builds. | Architectural type multipliers (Independent Home/Commercial). |

---

## 3. High-Level User Journey
1.  **Intelligent Intake**: System automatically detects user's **Locality** via IP/GPS. User selects **Property Architecture** (Apartment, Villa, Commercial, etc.).
2.  **Surgical Context**: User uploads **2D Floor Plans** (Optional). User selects **No. of Rooms** (1BHK to 5BHK) and Carpet Area.
3.  **Visual Interaction**: AI Mappings are displayed on the floor plan in a "Precision Mapping" viewer to validate layout accuracy.
4.  **Material Philosophies**: User toggles between **Essential, Premium, and Luxury** tiers, seeing the global estimate shift in real-time.
5.  **The Reveal (Gated)**: To see the detailed Itemized BOQ (Bill of Quantities) and per-room totals, user performs a "Lead Reveal."
6.  **Actionable Intelligence**: User receives a shareable summary and can "Book a Discovery Call" with the data already synced to the design studio.

---

## 4. Feature Matrix & Functional Requirements

### FR-1: High-Precision Locality Engine
- **City Detection**: IP-based city identification (Bangalore, Mumbai, etc.).
- **Micro-Market Detection**: GPS-based suburb detection (e.g., Jayanagar, Bangalore).
- **Multipliers**: Systematic application of coefficients based on real estate demand (Mumbai 1.2x, Bangalore 1.0x).

### FR-2: Architectural Variability
- **Property Types**: Support for Apartments, Independent Homes, Commercial Spaces, and Hospitality.
- **Scaling Logic**: Multipliers for complexity (Independent home +15%, Hospitality +80% vs. base residential).
- **Configurations**: Support for "No. of Rooms" up to 5BHK and Villa class.

### FR-3: 2D Floor Plan Asset Management
- **Upload Utility**: Drag-and-drop or PDF/Image upload for builder drawings.
- **AI Mapping Mock**: A specialized UI layer that overlays "Active Mapping" markers to signal expert-level analysis of the user's specific floor plan.

### FR-4: Material Tier Logic (The Spec Sheet)
- **Essential**: Functional, entry-level premium brands (Saint-Gobain Grid, Standard Plywood).
- **Premium**: Market gold standard (BWP Marine Ply, Hettich soft-close, Quartz).
- **Luxury**: Bespoke statement pieces (Veneer, PU finishes, Blum Aventos, Kohler Luxury).

### FR-5: Specialized Micro-Calculators
- **Kitchen Calculator**: Inputs for Layout (L-shape, Island), hardware specs, and appliance integration.
- **Bathroom Calculator**: Inputs for waterproofing depth, fixture tiers (standard to luxury), and vanity storage.

---

## 5. Technical Workflow (State & Calculation)

### The State Machine (`zustand`)
- **`EstimatorInputs`**: Tracks 10+ variables including scope, carpet area, tier, and city.
- **`EstimatorResult`**: Reactive object updated every time an input changes, calculating `BaseTotal`, `GST`, `DesignerFee`, and `GrandTotal`.

### The Calculation Engine (`lib/budget-engine.ts`)
- **Formula**: `ItemCost = (BaseRate * CityMultiplier * ArchitectureMultiplier * Quantity) * (1 + WasteMargin)`
- **Auto-Population**: Changing property type (e.g., 2BHK → 3BHK) triggers a re-baselining of quantities (Wardrobes, Toilets, Electrical points) to match architectural standards.

---

## 6. Success Metrics (KPIs)
- **Lead Quality**: Conversion rate of "Estimate Starts" to "BOQ Reveals."
- **Accuracy**: Variance between the calculator output and the final signed contract (Target: <5%).
- **Time-to-Value**: Percentage of users who reach an estimated grand total in under 45 seconds.

---

## 7. Future Roadmap (The "Expert" Backlog)
- **3D Viewer Integration**: Real-time material swapping in a pre-rendered 3D room.
- **Regional Compliance**: Auto-calculating local building permits for Independent Homes.
- **Live Vendor Feed**: Integrated pricing from premium hardware partners (Hettich/Hafele).

---
*Generated by beMore Design Studio | Architecture & Interiors | 2026 Ready*

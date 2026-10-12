# Technical & Visual Design Document

## 1. Visual Hierarchy & Theme Specification

### Color Palette
* **Primary Background:** Light Gray / Off-White (`#E5E5E5` / `#EBEBEB`)
* **Footer Background:** Deep Black (`#0A0A0A` / `#000000`)
* **Primary Text:** Dark Charcoal / Black (`#1A1A1A` / `#000000`)
* **Secondary Text / Muted:** Neutral Gray (`#666666` / `#888888`)
* **Accent / Success (Stock status):** Soft Forest Green (`#2E7D32` / `#10B981`)
* **Borders / Dividers:** Subtle Gray (`#D1D1D1` / `#CCCCCC`)
* **Primary Button:** Solid Black (`#000000`) with White Text (`#FFFFFF`)

### Typography
* **Primary Font Family:** Clean Sans-serif (e.g., `Inter`, `Helvetica Neue`, `Arial`)
* **Display / Title Font (Optional Luxury Accent):** High-contrast Serif or Elegant Sans (e.g., `Didot`, `Bodoni`, or `Playfair Display` for Brand titles/headings)
* **Font Sizes & Weights:**
  * Top Bar: `11px`, Regular, Uppercase
  * Product Title: `24px - 28px`, Bold
  * Price: `18px`, Medium
  * Accordion Titles: `13px - 14px`, Bold, Letter-spacing `1px`
  * Body & Descriptions: `13px - 14px`, Regular

---

## 2. Component Layout & Architecture

```
+-----------------------------------------------------------------------+
|  Top Announcement Bar (Promo message, Trustpilot rating)              |
+-----------------------------------------------------------------------+
|  Header Nav (Hamburger | Logo: 50ml | Search, Account, Cart)          |
+-----------------------------------------------------------------------+
|                                                                       |
|   +--------------------------+   +--------------------------------+   |
|   |                          |   | BRAND (INNOXA)                 |   |
|   |                          |   | Product Title (Unica AJ)       |   |
|   |                          |   | Sub-description                |   |
|   |                          |   | Rating & Price ($94.30)        |   |
|   |   Product Image          |   | Capacity Options (50ml | 100ml)|   |
|   |   (Centred / Responsive) |   | Qty Counter | [ADD TO CART] ❤ |   |
|   |                          |   +--------------------------------+   |
|   |                          |   | Accordions (Desc / Info / Feat) |   |
|   |                          |   +--------------------------------+   |
|   |                          |   | Service Badges (Ship, Sample)  |   |
|   +--------------------------+   +--------------------------------+   |
|                                                                       |
+-----------------------------------------------------------------------+
|  Review Form Section ("You're reviewing: Unica AJ")                   |
|  - Star Rating Picker                                                 |
|  - Nickname, Summary, Review Textarea                                 |
|  - Submit Button & Captcha Note                                       |
+-----------------------------------------------------------------------+
|  Footer Dark Section                                                  |
|  - Brand Info & Logistics/Payment Logos                               |
|  - Newsletter Input & Terms Checkbox                                  |
|  - Links Navigation Grid                                              |
|  - Top Brands Directory Grid                                          |
|  - Copyright Bar                                                      |
+-----------------------------------------------------------------------+
```

---

## 3. Data Structure (Local Simulation)

Since no backend is integrated, product state will be managed via a local JavaScript state object.

```javascript
const productData = {
  id: "innoxa-unica-aj",
  brand: "INNOXA",
  name: "Unica AJ",
  subtitle: "anti-aging face cream for all skin types",
  basePrice: 94.30,
  currency: "$",
  rating: 0,
  inStock: true,
  capacities: [
    { label: "50 ml", priceMultiplier: 1.0, selected: true },
    { label: "100 ml", priceMultiplier: 1.6, selected: false }
  ],
  description: "Krim wajah anti-penuaan yang dirancang khusus untuk memberikan kelembapan mendalam dan meremajakan sel kulit pada semua jenis kulit.",
  moreInfo: "Diproduksi di Italia. Ukuran kemasan kaca dengan tutup aksen emas eksklusif.",
  features: [
    "Formulasi anti-aging canggih",
    "Tekstur lembut dan cepat meresap",
    "Cocok untuk kulit sensitif"
  ]
};
```

---

## 4. Interaction Logic & State Management

### 4.1 Capacity Selector Logic
* Clicking a capacity pill updates the `selected` attribute in state.
* Triggers UI class re-assignment (`active` CSS class).
* Optionally updates the displayed price depending on selected variant.

### 4.2 Quantity Selector Logic
* Default `qty = 1`.
* `btnMinus` click: If `qty > 1`, `qty--`, else keep `1`.
* `btnPlus` click: `qty++`.
* UI updates numerical value dynamically.

### 4.3 Accordion Toggle Logic
* Clicking `.accordion-header` toggles `.open` state on `.accordion-item`.
* CSS handles expanding `.accordion-content` height smoothly via `max-height` transition.

### 4.4 Review Form Logic
* Interactive star rating set via `click` event on star icons (1-5).
* Form submission listener verifies:
  1. `rating > 0`
  2. `nickname.value.trim() !== ''`
  3. `summary.value.trim() !== ''`
  4. `review.value.trim() !== ''`
* Display custom validation errors if invalid; display success toast and reset input elements if valid.
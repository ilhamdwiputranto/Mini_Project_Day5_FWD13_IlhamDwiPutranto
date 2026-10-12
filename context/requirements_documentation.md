# Functional & Non-Functional Requirements Document

## 1. Project Overview
* **Project Name:** Product Detail Page (PDP) - Unica AJ (Innoxa)
* **Technology Stack:** HTML5, CSS3 (Vanilla), JavaScript (ES6+ Vanilla)
* **Source:** PRD Document & Figma Screenshot Analysis

---

## 2. Functional Requirements

### FR-1: Announcement & Navigation Bar
* **FR-1.1:** Display a top notification bar with promotional text ("PICK YOUR FREE SAMPLES...", "SECURE ONLINE PAYMENTS", "OFFICIAL ONLINE RETAILER", Trustpilot rating).
* **FR-1.2:** Display header bar containing:
  * Hamburger menu button for navigation (mobile/tablet view context).
  * Brand logo (`50ml`).
  * Action icons: Search (`magnifying glass`), User Account (`profile`), Shopping Cart (`bag`).

### FR-2: Product Visual & Primary Details
* **FR-2.1:** Display product main showcase image (Innoxa PG 33 Unica A.J. gold jar) with high clarity and preserved aspect ratio.
* **FR-2.2:** Display Brand Name (`INNOXA` - Uppercase).
* **FR-2.3:** Display Product Title (`Unica AJ`).
* **FR-2.4:** Display Subtitle/Short Description (`anti-aging face cream for all skin types`).
* **FR-2.5:** Display Price Tag (`As low as $94.30`).
* **FR-2.6:** Display Star Rating system placeholder (5-star indicator).
* **FR-2.7:** Display Stock Indicator (`In stock` with subtle green accent).

### FR-3: Capacity Selection & Quantity Control
* **FR-3.1:** Display Capacity options as pill buttons (`50 ml`, `100 ml`).
* **FR-3.2:** Active capacity state must be clearly highlighted. Default state selected: `50 ml`.
* **FR-3.3:** Quantity selector with decrement (`-`), numerical display, and increment (`+`) buttons.
* **FR-3.4:** Quantity minimum boundary is strictly set to `1`. Decrement button becomes disabled or ineffective when value is `1`.
* **FR-3.5:** Display primary call-to-action button `ADD TO CART` (Full width dark button).
* **FR-3.6:** Display Wishlist button (Heart icon) beside or inline with the add to cart button.

### FR-4: Information Accordions
* **FR-4.1:** Provide three expandable/collapsible sections:
  1. `DESCRIPTION`
  2. `MORE INFORMATION`
  3. `FEATURES`
* **FR-4.2:** Accordion toggle icon (e.g., `+` / `-`) reflects current state.
* **FR-4.3:** Expanding one section may either keep others open or auto-collapse depending on UI toggle behavior (standard accordion).

### FR-5: Trust Badges / Service Highlights
* **FR-5.1:** Display 3 highlight items with icons and text:
  1. `FREE SHIPPING FROM 150$`
  2. `FREE SAMPLE UPON REQUEST`
  3. `BUY NOW, PAY LATER WITH KLARNA AND PAYPAL`

### FR-6: Product Review Form
* **FR-6.1:** Section header specifying target product: `You're reviewing: Unica AJ`.
* **FR-6.2:** Interactive Star Rating selection (`Your Rating*` mandatory field).
* **FR-6.3:** Input field for `Nickname*` (Text, mandatory).
* **FR-6.4:** Input field for `Summary*` (Text, mandatory).
* **FR-6.5:** Textarea for `Review*` (Textarea, mandatory).
* **FR-6.6:** Submit button `SUBMIT REVIEW`.
* **FR-6.7:** Validation logic: If submitted empty or missing required fields, show clear error/warning messages.
* **FR-6.8:** On successful submission, show a confirmation success toast/alert and reset the form.

### FR-7: Newsletter Subscription
* **FR-7.1:** Email input field with a `SUBSCRIBE` button.
* **FR-7.2:** Mandatory checkbox for privacy policy agreement before subscribing.
* **FR-7.3:** Email format validation.

### FR-8: Footer Section
* **FR-8.1:** Brand summary description and legal background.
* **FR-8.2:** Supported payment & logistics partner icons (Visa, PayPal, Apple Pay, Google Pay, InPost, TNT, BRT, FedEx).
* **FR-8.3:** Navigation Link Columns (`ABOUT 50ML`, `ONLINE SHOPPING`, `TOP BRANDS`).
* **FR-8.4:** Copyright notice with address and VAT reference.

---

## 3. Non-Functional Requirements

### NFR-1: Performance & Compatibility
* **NFR-1.1:** Pure Vanilla Stack: HTML5, CSS3, ES6+ JavaScript. No external libraries or heavy JavaScript frameworks.
* **NFR-1.2:** Fast load time under 1.5s on standard broadband connections.

### NFR-2: Responsiveness & Layout
* **NFR-2.1:** Mobile-First / Responsive Layout adapting seamlessly between Mobile (320px - 767px), Tablet (768px - 1023px), and Desktop (1024px+).
* **NFR-2.2:** On smaller screens, product image stack vertically on top of product metadata and actions without horizontal scroll overflow.

### NFR-3: Usability & Design Fidelity
* **NFR-3.1:** High-fidelity adherence to the provided Figma design (light gray monochromatic background `#e2e2e2` / neutral tones, minimalist luxury editorial aesthetic).
* **NFR-3.2:** Clear interactive states (hover, focus, active, disabled) for buttons, inputs, and clickable elements.
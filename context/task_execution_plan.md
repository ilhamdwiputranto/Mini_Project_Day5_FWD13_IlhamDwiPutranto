# Development Task Breakdown & Checklist

## Phase 1: Environment & Project Setup
- [ ] **Task 1.1:** Create project folder structure (`index.html`, `styles.css`, `app.js`, `assets/images/`).
- [ ] **Task 1.2:** Initialize Git repository and set up base HTML5 boilerplate.
- [ ] **Task 1.3:** Link web fonts (Inter / Serif accents) and icon library (Lucide or SVGs).

---

## Phase 2: HTML Layout Structuring (DOM Markup)
- [ ] **Task 2.1:** Build Top Bar & Header layout (Logo, Hamburger icon, Search/User/Cart icons).
- [ ] **Task 2.2:** Build Product Main Section:
  - Container grid/flex layout (Product Image on Left, Details on Right).
  - Product Metadata (Brand, Title, Subtitle, Price, Rating, Stock).
  - Capacity options container.
  - Quantity counter + Add to Cart & Wishlist container.
- [ ] **Task 2.3:** Build Accordion components (Description, More Information, Features).
- [ ] **Task 2.4:** Build Service Badges Section (Shipping, Samples, Payment info).
- [ ] **Task 2.5:** Build Review Section ("You're reviewing: Unica AJ" & Form fields).
- [ ] **Task 2.6:** Build Footer Section:
  - Brand description & payment icons.
  - Newsletter subscription form & checkbox.
  - Navigation links grid.
  - Top Brands list.
  - Copyright line.

---

## Phase 3: CSS Styling & Responsive Design
- [ ] **Task 3.1:** Setup CSS custom properties (variables) for colors, typography, and spacing.
- [ ] **Task 3.2:** Style Top Bar and Navigation header.
- [ ] **Task 3.3:** Style Product Detail section matching Figma design (clean light gray aesthetics).
- [ ] **Task 3.4:** Style Capacity pills, Quantity control, and Black `ADD TO CART` button.
- [ ] **Task 3.5:** Style Accordion expander transitions and icons.
- [ ] **Task 3.6:** Style Review Form and input focus states.
- [ ] **Task 3.7:** Style Dark Footer layout and Top Brands columns.
- [ ] **Task 3.8:** Implement Responsive Breakpoints (Mobile: `< 768px`, Desktop: `≥ 768px`).

---

## Phase 4: JavaScript Interactive Features
- [ ] **Task 4.1:** Implement Capacity option selection highlight and state update.
- [ ] **Task 4.2:** Implement Quantity counter decrement/increment with boundary check (`min: 1`).
- [ ] **Task 4.3:** Implement Add to Cart feedback (notification/toast on button click).
- [ ] **Task 4.4:** Implement Accordion toggle accordion expand/collapse logic.
- [ ] **Task 4.5:** Implement Interactive Star Rating system in Review Form.
- [ ] **Task 4.6:** Implement Review Form submission validation & success response logic.
- [ ] **Task 4.7:** Implement Newsletter agreement validation and email check.

---

## Phase 5: Testing & Acceptance Criteria Verification
- [ ] **Task 5.1:** Verify AC-01: Page load correctness.
- [ ] **Task 5.2:** Verify AC-02 & AC-03 & AC-04: Capacity & Quantity functionality.
- [ ] **Task 5.3:** Verify AC-05: Accordions open/close smoothly.
- [ ] **Task 5.4:** Verify AC-06 & AC-07: Review form validation and success notifications.
- [ ] **Task 5.5:** Verify AC-08: Mobile responsiveness without layout overflow.
document.addEventListener("DOMContentLoaded", () => {
  /* --- STATE MANAGEMENT --- */
  const state = {
    product: {
      brand: "INNOXA",
      title: "Unica AJ",
      variants: {
        50: { price: 94.3, stock: 10 },
        100: { price: 150.88, stock: 5 },
      },
      selectedCapacity: 50,
      currentPrice: 94.3,
      quantity: 1,
      isValidQty: true,
      isWishlist: false,
    },
    cart: [],
    reviews: [
      {
        rating: 5,
        nickname: "Sofia M.",
        summary: "Incredible anti-aging cream!",
        body: "Kulit terasa sangat halus dan lembap sepanjang hari.",
        date: "2 days ago",
      },
      {
        rating: 4,
        nickname: "Alessandro G.",
        summary: "Very good quality",
        body: "Kemasan kaca sangat elegan dan hasil pemakaian 2 minggu memberikan hidrasi maksimal.",
        date: "1 week ago",
      },
    ],
    selectedRating: 0,
  };

  /* --- DOM ELEMENTS --- */
  const priceEl = document.getElementById("product-price");
  const variantLabelEl = document.getElementById("selected-variant-label");
  const liveSubtotalEl = document.getElementById("live-subtotal");
  const stockStatusEl = document.getElementById("stock-status");
  const qtyInputEl = document.getElementById("qty-input");
  const qtyFeedbackEl = document.getElementById("qty-feedback");
  const btnMinus = document.getElementById("btn-minus");
  const btnPlus = document.getElementById("btn-plus");
  const capacityButtons = document.querySelectorAll(".capacity-pill");
  const btnAddToCart = document.getElementById("btn-add-to-cart");
  const btnWishlist = document.getElementById("btn-wishlist");
  const toastEl = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-message");

  /* --- HELPER: CALCULATE REMAINING STOCK PER VARIANT --- */
  function getRemainingStock(capacity = state.product.selectedCapacity) {
    const variantData = state.product.variants[capacity];
    const variantLabel = `${capacity} ml`;

    // Hanya menghitung qty di keranjang untuk variasi yang sama
    const inCartForVariant = state.cart.filter((item) => item.capacity === variantLabel).reduce((sum, item) => sum + item.qty, 0);

    return Math.max(0, variantData.stock - inCartForVariant);
  }

  /* --- HELPER: UPDATE SUMMARY & SUBTOTAL UI --- */
  function updateSummaryUI() {
    const remaining = getRemainingStock();
    stockStatusEl.textContent =
      remaining > 0
        ? `In stock (${remaining} available for ${state.product.selectedCapacity} ml)`
        : `Out of stock (0 available for ${state.product.selectedCapacity} ml)`;

    variantLabelEl.textContent = `${state.product.selectedCapacity} ml`;
    priceEl.textContent = `$${state.product.currentPrice.toFixed(2)}`;

    if (state.product.isValidQty) {
      const subtotal = _.round(state.product.currentPrice * state.product.quantity, 2);
      liveSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      btnAddToCart.disabled = remaining === 0;
    } else {
      liveSubtotalEl.textContent = "$0.00";
      btnAddToCart.disabled = true;
    }

    btnMinus.disabled = !state.product.isValidQty || state.product.quantity <= 1;
    btnPlus.disabled = !state.product.isValidQty || state.product.quantity >= remaining;
  }

  /* --- QUANTITY VALIDATION LOGIC --- */
  function validateAndSetQuantity(rawValue) {
    const remainingStock = getRemainingStock();
    const trimmed = String(rawValue).trim();

    if (trimmed === "") {
      setQtyError("Quantity cannot be empty. Enter a positive integer.");
      return false;
    }

    const parsed = Number(trimmed);

    if (Number.isNaN(parsed) || !Number.isInteger(parsed)) {
      setQtyError("Invalid quantity: decimal/fractional values are not allowed.");
      return false;
    }

    if (parsed <= 0) {
      setQtyError("Invalid quantity: must be at least 1 (zero or negative not allowed).");
      return false;
    }

    if (remainingStock === 0) {
      setQtyError(`Out of stock for ${state.product.selectedCapacity} ml variant.`);
      return false;
    }

    if (parsed > remainingStock) {
      setQtyError(`Exceeds available stock! Maximum for ${state.product.selectedCapacity} ml is ${remainingStock}.`);
      return false;
    }

    // Valid state
    state.product.quantity = parsed;
    state.product.isValidQty = true;
    qtyFeedbackEl.textContent = "";
    qtyFeedbackEl.classList.add("hidden");
    qtyInputEl.classList.remove("text-red-600");
    updateSummaryUI();
    return true;
  }

  function setQtyError(message) {
    state.product.isValidQty = false;
    qtyFeedbackEl.textContent = message;
    qtyFeedbackEl.classList.remove("hidden");
    qtyInputEl.classList.add("text-red-600");
    updateSummaryUI();
  }

  /* --- CAPACITY SELECTOR LOGIC --- */
  capacityButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      capacityButtons.forEach((b) => {
        b.classList.remove("bg-black", "text-white", "border-black");
        b.classList.add("bg-transparent", "text-gray-800", "border-gray-400");
      });

      btn.classList.remove("bg-transparent", "text-gray-800", "border-gray-400");
      btn.classList.add("bg-black", "text-white", "border-black");

      const selectedCap = parseInt(btn.dataset.capacity, 10);
      state.product.selectedCapacity = selectedCap;
      state.product.currentPrice = state.product.variants[selectedCap].price;

      // Sesuaikan input quantity terhadap stok variasi yang baru dipilih
      const remaining = getRemainingStock(selectedCap);
      qtyInputEl.value = remaining > 0 ? 1 : 0;
      validateAndSetQuantity(qtyInputEl.value);

      showToast(`Selected variant: ${selectedCap} ml`);
    });
  });
  /* --- QUANTITY EVENT LISTENERS --- */
  btnMinus.addEventListener("click", () => {
    const current = parseInt(qtyInputEl.value, 10) || 1;
    if (current > 1) {
      qtyInputEl.value = current - 1;
      validateAndSetQuantity(qtyInputEl.value);
    }
  });

  btnPlus.addEventListener("click", () => {
    const remaining = getRemainingStock();
    const current = parseInt(qtyInputEl.value, 10) || 0;
    if (current < remaining) {
      qtyInputEl.value = current + 1;
      validateAndSetQuantity(qtyInputEl.value);
    }
  });

  qtyInputEl.addEventListener("input", (e) => {
    validateAndSetQuantity(e.target.value);
  });

  /* --- WISHLIST TOGGLE --- */
  btnWishlist.addEventListener("click", () => {
    state.product.isWishlist = !state.product.isWishlist;
    const icon = btnWishlist.querySelector("i");
    if (state.product.isWishlist) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid", "text-red-500");
      showToast("Added to your wishlist");
    } else {
      icon.classList.remove("fa-solid", "text-red-500");
      icon.classList.add("fa-regular");
      showToast("Removed from your wishlist");
    }
  });

  /* --- ACCORDIONS TOGGLE --- */
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains("active");

      document.querySelectorAll(".accordion-item").forEach((i) => {
        i.classList.remove("active");
        i.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("active");
        header.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* --- CART DRAWER LOGIC --- */
  const cartBtn = document.getElementById("cart-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartBackdrop = document.getElementById("cart-drawer-backdrop");
  const cartBadge = document.getElementById("cart-badge");
  const cartContainer = document.getElementById("cart-items-container");
  const cartSubtotal = document.getElementById("cart-subtotal");

  function toggleCart(open) {
    if (open) {
      cartBackdrop.classList.remove("hidden");
      setTimeout(() => cartBackdrop.classList.add("opacity-100"), 10);
      cartDrawer.classList.remove("translate-x-full");
    } else {
      cartBackdrop.classList.remove("opacity-100");
      cartDrawer.classList.add("translate-x-full");
      setTimeout(() => cartBackdrop.classList.add("hidden"), 300);
    }
  }

  cartBtn.addEventListener("click", () => toggleCart(true));
  closeCartBtn.addEventListener("click", () => toggleCart(false));
  cartBackdrop.addEventListener("click", () => toggleCart(false));

  btnAddToCart.addEventListener("click", () => {
    // Re-validate before adding to cart
    if (!validateAndSetQuantity(qtyInputEl.value)) {
      showToast("Please enter a valid quantity before adding to cart.");
      return;
    }

    const cartItem = {
      title: `${state.product.brand} ${state.product.title}`,
      capacity: `${state.product.selectedCapacity} ml`,
      price: state.product.currentPrice,
      qty: state.product.quantity,
    };

    const existingIndex = state.cart.findIndex((i) => i.capacity === cartItem.capacity);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += cartItem.qty;
    } else {
      state.cart.push(cartItem);
    }

    renderCart();
    showToast(`Added ${cartItem.qty}x Unica AJ (${cartItem.capacity}) to cart!`);

    // Reset quantity input to 1 (or 0 if stock depleted) & re-validate against remaining stock
    const remainingAfterAdd = getRemainingStock();
    qtyInputEl.value = remainingAfterAdd > 0 ? 1 : 0;
    validateAndSetQuantity(qtyInputEl.value);
    toggleCart(true);
  });

  function renderCart() {
    const totalItems = state.cart.reduce((acc, item) => acc + item.qty, 0);
    cartBadge.textContent = totalItems;

    if (state.cart.length === 0) {
      cartContainer.innerHTML = '<p class="text-xs text-gray-500 text-center py-8">Your cart is currently empty.</p>';
      cartSubtotal.textContent = "$0.00";
      return;
    }

    let html = "";
    let subtotal = 0;

    state.cart.forEach((item, index) => {
      const itemTotal = _.round(item.price * item.qty, 2);
      subtotal = _.round(subtotal + itemTotal, 2);

      html += `
        <div class="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <h4 class="text-xs font-bold text-black">${_.escape(item.title)}</h4>
            <p class="text-[11px] text-gray-500">Size: ${_.escape(item.capacity)} | Qty: ${item.qty}</p>
            <span class="text-xs font-semibold">$${item.price.toFixed(2)}</span>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-xs font-bold">$${itemTotal.toFixed(2)}</span>
            <button type="button" data-remove-index="${index}" class="remove-cart-item text-gray-400 hover:text-red-500 text-xs" aria-label="Remove item">
              <i class="fa-solid fa-trash pointer-events-none"></i>
            </button>
          </div>
        </div>
      `;
    });

    cartContainer.innerHTML = html;
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Event delegation using addEventListener (replaces inline onclick)
  cartContainer.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-cart-item");
    if (removeBtn) {
      const index = parseInt(removeBtn.dataset.removeIndex, 10);
      state.cart.splice(index, 1);
      renderCart();
      // Re-validate quantity input against restored stock
      if (parseInt(qtyInputEl.value, 10) === 0 && getRemainingStock() > 0) {
        qtyInputEl.value = 1;
      }
      validateAndSetQuantity(qtyInputEl.value);
      showToast("Item removed from cart.");
    }
  });

  /* --- REVIEW STAR RATING INTERACTION --- */
  const starIcons = document.querySelectorAll("#star-picker i");
  const ratingInput = document.getElementById("review-rating-val");

  starIcons.forEach((star) => {
    star.addEventListener("click", () => {
      const rating = parseInt(star.dataset.rating, 10);
      state.selectedRating = rating;
      ratingInput.value = rating;

      starIcons.forEach((s, idx) => {
        if (idx < rating) {
          s.classList.remove("fa-regular", "text-gray-400");
          s.classList.add("fa-solid", "text-amber-500");
        } else {
          s.classList.remove("fa-solid", "text-amber-500");
          s.classList.add("fa-regular", "text-gray-400");
        }
      });
    });
  });

  /* --- REVIEW LIST RENDER & SUBMISSION --- */
  const reviewsList = document.getElementById("reviews-list");
  const reviewForm = document.getElementById("review-form");

  function renderInitialReviews() {
    reviewsList.innerHTML = "";
    state.reviews.forEach((rev) => addReviewToDOM(rev, false));
  }

  function addReviewToDOM(review, prepend = true) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      starsHTML += i <= review.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    }

    const reviewCard = document.createElement("div");
    reviewCard.className = "bg-white/60 p-5 rounded-xl border border-gray-200 space-y-2";
    reviewCard.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-black">${_.escape(review.nickname)}</span>
        <span class="text-[10px] text-gray-400">${_.escape(review.date)}</span>
      </div>
      <div class="text-amber-500 text-xs flex">${starsHTML}</div>
      <h4 class="text-xs font-semibold text-gray-800">${_.escape(review.summary)}</h4>
      <p class="text-xs text-gray-600 leading-relaxed">${_.escape(review.body)}</p>
    `;

    if (prepend && reviewsList.firstChild) {
      reviewsList.insertBefore(reviewCard, reviewsList.firstChild);
    } else {
      reviewsList.appendChild(reviewCard);
    }
  }

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nickname = document.getElementById("review-nickname").value.trim();
    const summary = document.getElementById("review-summary").value.trim();
    const body = document.getElementById("review-body").value.trim();

    let isValid = true;

    if (state.selectedRating === 0) {
      document.getElementById("rating-error").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("rating-error").classList.add("hidden");
    }

    if (!nickname) {
      document.getElementById("nickname-error").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("nickname-error").classList.add("hidden");
    }

    if (!summary) {
      document.getElementById("summary-error").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("summary-error").classList.add("hidden");
    }

    if (!body) {
      document.getElementById("body-error").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("body-error").classList.add("hidden");
    }

    if (isValid) {
      const newReview = {
        rating: state.selectedRating,
        nickname,
        summary,
        body,
        date: "Just now",
      };

      state.reviews.unshift(newReview);
      addReviewToDOM(newReview, true);
      reviewForm.reset();

      starIcons.forEach((s) => {
        s.classList.remove("fa-solid", "text-amber-500");
        s.classList.add("fa-regular", "text-gray-400");
      });
      state.selectedRating = 0;

      showToast("Thank you! Your review has been submitted.");
    }
  });

  /* --- NEWSLETTER FORM VALIDATION --- */
  const newsletterForm = document.getElementById("newsletter-form");
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletter-email").value.trim();
    const privacy = document.getElementById("newsletter-privacy").checked;

    if (!email || !validateEmail(email)) {
      showToast("Please enter a valid email address.");
      return;
    }

    if (!privacy) {
      showToast("Please agree to the privacy policy checkbox.");
      return;
    }

    showToast("Subscribed successfully to 50ml newsletter!");
    newsletterForm.reset();
  });

  /* --- HELPER FUNCTIONS --- */
  let toastTimeout;
  function showToast(message) {
    toastMsg.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove("show");
    }, 3000);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* --- INITIALIZE UI --- */
  renderInitialReviews();
  updateSummaryUI();
});

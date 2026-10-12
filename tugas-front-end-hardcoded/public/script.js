document.addEventListener("DOMContentLoaded", () => {
  /* --- STATE MANAGEMENT --- */
  const state = {
    product: {
      brand: "INNOXA",
      title: "Unica AJ",
      basePrice: 94.3,
      selectedCapacity: 50,
      currentPrice: 94.3,
      quantity: 1,
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
  const qtyValEl = document.getElementById("qty-val");
  const btnMinus = document.getElementById("btn-minus");
  const btnPlus = document.getElementById("btn-plus");
  const capacityButtons = document.querySelectorAll(".capacity-pill");
  const btnAddToCart = document.getElementById("btn-add-to-cart");
  const btnWishlist = document.getElementById("btn-wishlist");
  const toastEl = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-message");

  /* --- CAPACITY SELECTOR LOGIC --- */
  capacityButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      capacityButtons.forEach((b) => {
        b.classList.remove("bg-black", "text-white", "border-black");
        b.classList.add("bg-transparent", "text-gray-800", "border-gray-400");
      });

      btn.classList.remove("bg-transparent", "text-gray-800", "border-gray-400");
      btn.classList.add("bg-black", "text-white", "border-black");

      state.product.selectedCapacity = parseInt(btn.dataset.capacity);
      state.product.currentPrice = parseFloat(btn.dataset.price);

      // Update UI Price Display
      priceEl.textContent = `$${state.product.currentPrice.toFixed(2)}`;
      showToast(`Updated capacity to ${state.product.selectedCapacity} ml`);
    });
  });

  /* --- QUANTITY CONTROLLER --- */
  btnMinus.addEventListener("click", () => {
    if (state.product.quantity > 1) {
      state.product.quantity--;
      updateQtyUI();
    }
  });

  btnPlus.addEventListener("click", () => {
    state.product.quantity++;
    updateQtyUI();
  });

  function updateQtyUI() {
    qtyValEl.textContent = state.product.quantity;
    btnMinus.disabled = state.product.quantity <= 1;
  }
  updateQtyUI(); // Initial check

  /* --- WISHLIST TOGGLE --- */
  btnWishlist.addEventListener("click", () => {
    state.product.isWishlist = !state.product.isWishlist;
    const icon = btnWishlist.querySelector("i");
    if (state.product.isWishlist) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid", "text-red-500");
      showToast("Added to your wishlist ❤️");
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

      // Optional: Close other accordions
      document.querySelectorAll(".accordion-item").forEach((i) => i.classList.remove("active"));

      if (!isOpen) {
        item.classList.add("active");
        header.setAttribute("aria-expanded", "true");
      } else {
        header.setAttribute("aria-expanded", "false");
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
    const cartItem = {
      title: `${state.product.brand} ${state.product.title}`,
      capacity: `${state.product.selectedCapacity} ml`,
      price: state.product.currentPrice,
      qty: state.product.quantity,
    };

    // Check existing item
    const existingIndex = state.cart.findIndex((i) => i.capacity === cartItem.capacity);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += cartItem.qty;
    } else {
      state.cart.push(cartItem);
    }

    renderCart();
    showToast(`Added ${state.product.quantity}x Unica AJ (${state.product.selectedCapacity}ml) to cart!`);
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
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;

      html += `
                <div class="flex items-center justify-between border-b border-gray-200 pb-3">
                    <div>
                        <h4 class="text-xs font-bold text-black">${item.title}</h4>
                        <p class="text-[11px] text-gray-500">Size: ${item.capacity} | Qty: ${item.qty}</p>
                        <span class="text-xs font-semibold">$${item.price.toFixed(2)}</span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="text-xs font-bold">$${itemTotal.toFixed(2)}</span>
                        <button onclick="removeItem(${index})" class="text-gray-400 hover:text-red-500 text-xs"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
    });

    cartContainer.innerHTML = html;
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  }

  window.removeItem = function (index) {
    state.cart.splice(index, 1);
    renderCart();
  };

  /* --- REVIEW STAR RATING INTERACTION --- */
  const starIcons = document.querySelectorAll("#star-picker i");
  const ratingInput = document.getElementById("review-rating-val");

  starIcons.forEach((star) => {
    star.addEventListener("click", () => {
      const rating = parseInt(star.dataset.rating);
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

  /* --- REVIEW FORM VALIDATION & SUBMISSION --- */
  const reviewForm = document.getElementById("review-form");
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nickname = document.getElementById("review-nickname").value.trim();
    const summary = document.getElementById("review-summary").value.trim();
    const body = document.getElementById("review-body").value.trim();

    let isValid = true;

    // Validate Rating
    if (state.selectedRating === 0) {
      document.getElementById("rating-error").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("rating-error").classList.add("hidden");
    }

    // Validate Nickname
    if (!nickname) {
      document.getElementById("nickname-error").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("nickname-error").classList.add("hidden");
    }

    // Validate Summary
    if (!summary) {
      document.getElementById("summary-error").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("summary-error").classList.add("hidden");
    }

    // Validate Body
    if (!body) {
      document.getElementById("body-error").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("body-error").classList.add("hidden");
    }

    if (isValid) {
      // Append new review
      const newReview = {
        rating: state.selectedRating,
        nickname,
        summary,
        body,
        date: "Just now",
      };

      addReviewToDOM(newReview);
      reviewForm.reset();

      // Reset Stars
      starIcons.forEach((s) => {
        s.classList.remove("fa-solid", "text-amber-500");
        s.classList.add("fa-regular", "text-gray-400");
      });
      state.selectedRating = 0;

      showToast("Thank you! Your review has been submitted.");
    }
  });

  function addReviewToDOM(review) {
    const reviewsList = document.getElementById("reviews-list");
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      starsHTML += i <= review.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    }

    const reviewCard = document.createElement("div");
    reviewCard.className = "bg-white/60 p-5 rounded-xl border border-gray-200 space-y-2 animate-fade-in";
    reviewCard.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-black">${escapeHTML(review.nickname)}</span>
                <span class="text-[10px] text-gray-400">${review.date}</span>
            </div>
            <div class="text-amber-500 text-xs flex">${starsHTML}</div>
            <h4 class="text-xs font-semibold text-gray-800">${escapeHTML(review.summary)}</h4>
            <p class="text-xs text-gray-600 leading-relaxed">${escapeHTML(review.body)}</p>
        `;

    reviewsList.insertBefore(reviewCard, reviewsList.children[1]);
  }

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
  function showToast(message) {
    toastMsg.textContent = message;
    toastEl.classList.add("show");
    setTimeout(() => {
      toastEl.classList.remove("show");
    }, 3000);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[tag] || tag);
  }
});
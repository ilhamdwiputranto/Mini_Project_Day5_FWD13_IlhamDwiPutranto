document.addEventListener("DOMContentLoaded", () => {
  /* --- STATE MANAGEMENT --- */
  const state = {
    currentProductId: 1, // Track current API product ID
    product: null,
    selectedCapacity: "50 ml",
    currentMultiplier: 1.0,
    quantity: 1,
    calculatedPrice: 0,
    selectedRating: 0,
    isWishlist: false,
    cart: [],
    reviews: [],
  };

  /* --- DOM ELEMENTS --- */
  const brandEl = document.getElementById("product-brand");
  const titleEl = document.getElementById("product-title");
  const subtitleEl = document.getElementById("product-subtitle");
  const priceEl = document.getElementById("product-price");
  const oldPriceEl = document.getElementById("product-old-price");
  const discountBadge = document.getElementById("discount-badge");
  const productBadge = document.getElementById("product-badge");
  const ratingTextEl = document.getElementById("product-rating-text");
  const starsContainer = document.getElementById("product-stars-container");
  const stockStatusEl = document.getElementById("stock-status");
  const mainImg = document.getElementById("main-product-img");
  const imageSkeleton = document.getElementById("image-skeleton");
  const thumbnailsContainer = document.getElementById("gallery-thumbnails");

  // Navigation Buttons
  const btnPrevProduct = document.getElementById("btn-prev-product");
  const btnNextProduct = document.getElementById("btn-next-product");
  const directIdInput = document.getElementById("direct-id-input");
  const btnJumpId = document.getElementById("btn-jump-id");

  // Accordions & Info
  const accordionDescText = document.getElementById("accordion-desc-text");
  const infoWarranty = document.getElementById("info-warranty");
  const infoShipping = document.getElementById("info-shipping");
  const infoReturn = document.getElementById("info-return");
  const infoMinOrder = document.getElementById("info-min-order");
  const infoSku = document.getElementById("info-sku");
  const infoCategory = document.getElementById("info-category");
  const infoStockCount = document.getElementById("info-stock-count");
  const infoRatingScore = document.getElementById("info-rating-score");

  // Review Form DOM
  const reviewTargetName = document.getElementById("review-target-name");
  const reviewsCountBadge = document.getElementById("reviews-count-badge");
  const reviewsAvgText = document.getElementById("reviews-avg-text");
  const reviewsList = document.getElementById("reviews-list");

  // API Status DOM
  const apiStatusBanner = document.getElementById("api-status-banner");
  const apiStatusText = document.getElementById("api-status-text");

  /* --- SHOW LOADING SKELETON STATE --- */
  function showLoadingState() {
    apiStatusBanner.classList.remove("hidden");
    apiStatusBanner.className =
      "mb-6 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm transition-all duration-300";
    apiStatusText.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-blue-600 text-sm mr-2.5"></i> <span>Mengambil data produk #${state.currentProductId} dari <strong> API</strong>...</span>`;

    document.getElementById("brand-skeleton").classList.remove("hidden");
    document.getElementById("title-skeleton").classList.remove("hidden");
    brandEl.classList.add("hidden");
    titleEl.classList.add("hidden");

    mainImg.classList.add("opacity-0");
    imageSkeleton.classList.remove("hidden");
    thumbnailsContainer.innerHTML = "";
  }

  /* --- ASYNCHRONOUS API FETCH FUNCTION --- */
  async function fetchProductFromAPI(productId) {
    showLoadingState();
    state.currentProductId = productId;
    directIdInput.value = productId;

    // Update Button Disabled States
    btnPrevProduct.disabled = productId <= 1;

    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      state.product = data;
      state.reviews = data.reviews || [];

      // Hide Skeletons & Show Actual Elements
      document.getElementById("brand-skeleton").classList.add("hidden");
      document.getElementById("title-skeleton").classList.add("hidden");
      brandEl.classList.remove("hidden");
      titleEl.classList.remove("hidden");

      // Success Banner Update
      apiStatusBanner.className =
        "mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm";
      apiStatusText.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600 text-sm mr-2.5"></i> <span>Data produk #${data.id} (<strong>${data.title}</strong>) berhasil dimuat!</span>`;

      populateProductDetails();
    } catch (error) {
      console.error("Error fetching API:", error);
      apiStatusBanner.className =
        "mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm";
      apiStatusText.innerHTML = `<i class="fa-solid fa-circle-exclamation text-red-600 text-sm mr-2.5"></i> <span>Gagal memuat produk ID #${productId}. Coba angka lain.</span>`;
    }
  }

  /* --- NEXT / BACK PRODUCT LISTENERS --- */
  btnPrevProduct.addEventListener("click", () => {
    if (state.currentProductId > 1) {
      fetchProductFromAPI(state.currentProductId - 1);
    }
  });

  btnNextProduct.addEventListener("click", () => {
    fetchProductFromAPI(state.currentProductId + 1);
  });

  btnJumpId.addEventListener("click", () => {
    const targetId = parseInt(directIdInput.value, 10);
    if (targetId && targetId >= 1) {
      fetchProductFromAPI(targetId);
    }
  });

  directIdInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      btnJumpId.click();
    }
  });

  /* --- POPULATE UI FROM API DATA --- */
  function populateProductDetails() {
    const p = state.product;

    // 1. Basic Metadata
    brandEl.textContent = p.brand || "BEAUTY ESSENCE";
    titleEl.textContent = p.title;
    subtitleEl.textContent = `${p.category.toUpperCase()} • ${p.description}`;
    reviewTargetName.textContent = p.title;

    // Reset Quantity on product switch
    state.quantity = 1;
    document.getElementById("qty-val").textContent = 1;

    // 2. Pricing & Discount Calculation
    calculatePrice();

    // 3. Stock Status
    if (p.stock > 0) {
      stockStatusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1.5 animate-pulse"></span> In Stock (${p.stock} available)`;
      stockStatusEl.className = "text-xs font-semibold text-emerald-700 flex items-center";
    } else {
      stockStatusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-red-500 inline-block mr-1.5"></span> Out of Stock`;
      stockStatusEl.className = "text-xs font-semibold text-red-600 flex items-center";
    }

    // 4. Rating Stars
    renderStars(p.rating);

    // 5. Main Image & Gallery Thumbnails
    if (p.images && p.images.length > 0) {
      mainImg.src = p.images[0];
      mainImg.onload = () => {
        imageSkeleton.classList.add("hidden");
        mainImg.classList.remove("opacity-0");
      };

      // Thumbnails
      thumbnailsContainer.innerHTML = "";
      p.images.forEach((imgUrl, index) => {
        const thumb = document.createElement("img");
        thumb.src = imgUrl;
        thumb.alt = `Thumbnail ${index + 1}`;
        thumb.className = `w-14 h-14 object-cover rounded-lg border-2 cursor-pointer transition ${index === 0 ? "border-black opacity-100 scale-105" : "border-transparent opacity-60 hover:opacity-100"}`;

        thumb.addEventListener("click", () => {
          mainImg.src = imgUrl;
          document.querySelectorAll("#gallery-thumbnails img").forEach((t) => {
            t.classList.remove("border-black", "scale-105");
            t.classList.add("border-transparent", "opacity-60");
          });
          thumb.classList.remove("border-transparent", "opacity-60");
          thumb.classList.add("border-black", "scale-105", "opacity-100");
        });

        thumbnailsContainer.appendChild(thumb);
      });
    } else {
      imageSkeleton.classList.add("hidden");
      mainImg.src = p.thumbnail || "";
      mainImg.classList.remove("opacity-0");
    }

    // 6. Accordions Info
    accordionDescText.textContent = p.description;
    infoWarranty.textContent = p.warrantyInformation || "N/A";
    infoShipping.textContent = p.shippingInformation || "N/A";
    infoReturn.textContent = p.returnPolicy || "N/A";
    infoMinOrder.textContent = `${p.minimumOrderQuantity || 1} Item(s)`;
    infoSku.textContent = p.sku || `SKU-${p.id}`;
    infoCategory.textContent = p.category || "General";
    infoStockCount.textContent = p.stock || 0;
    infoRatingScore.textContent = p.rating || 0;

    // 7. Render Reviews List
    renderReviewsList();
  }

  /* --- PRICE CALCULATION LOGIC --- */
  function calculatePrice() {
    if (!state.product) return;

    const basePrice = state.product.price;
    const discount = state.product.discountPercentage || 0;

    // Adjust price based on selected capacity multiplier
    const unitPrice = basePrice * state.currentMultiplier;
    state.calculatedPrice = unitPrice;

    priceEl.textContent = `$${unitPrice.toFixed(2)}`;

    if (discount > 0) {
      const originalPrice = unitPrice / (1 - discount / 100);
      oldPriceEl.textContent = `$${originalPrice.toFixed(2)}`;
      oldPriceEl.classList.remove("hidden");

      discountBadge.textContent = `${Math.round(discount)}% OFF`;
      discountBadge.classList.remove("hidden");

      productBadge.textContent = `SAVE ${Math.round(discount)}%`;
      productBadge.classList.remove("opacity-0");
    } else {
      oldPriceEl.classList.add("hidden");
      discountBadge.classList.add("hidden");
      productBadge.classList.add("opacity-0");
    }
  }

  /* --- STAR RATING RENDERER --- */
  function renderStars(rating) {
    starsContainer.innerHTML = "";
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsContainer.innerHTML += '<i class="fa-solid fa-star"></i>';
      } else if (i === fullStars + 1 && hasHalf) {
        starsContainer.innerHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
      } else {
        starsContainer.innerHTML += '<i class="fa-regular fa-star"></i>';
      }
    }
    ratingTextEl.textContent = `(${rating.toFixed(1)} / 5.0)`;
  }

  /* --- CAPACITY SELECTION LISTENERS --- */
  document.querySelectorAll(".capacity-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".capacity-pill").forEach((b) => {
        b.classList.remove("bg-black", "text-white", "border-black");
        b.classList.add("bg-transparent", "text-gray-800", "border-gray-400");
      });

      btn.classList.remove("bg-transparent", "text-gray-800", "border-gray-400");
      btn.classList.add("bg-black", "text-white", "border-black");

      state.selectedCapacity = btn.dataset.capacity;
      state.currentMultiplier = parseFloat(btn.dataset.multiplier);

      calculatePrice();
      showToast(`Capacity switched to ${state.selectedCapacity}`);
    });
  });

  /* --- QUANTITY COUNTER --- */
  const qtyValEl = document.getElementById("qty-val");
  const btnMinus = document.getElementById("btn-minus");
  const btnPlus = document.getElementById("btn-plus");

  btnMinus.addEventListener("click", () => {
    if (state.quantity > 1) {
      state.quantity--;
      qtyValEl.textContent = state.quantity;
      btnMinus.disabled = state.quantity <= 1;
    }
  });

  btnPlus.addEventListener("click", () => {
    state.quantity++;
    qtyValEl.textContent = state.quantity;
    btnMinus.disabled = false;
  });

  /* --- WISHLIST TOGGLE --- */
  const btnWishlist = document.getElementById("btn-wishlist");
  btnWishlist.addEventListener("click", () => {
    state.isWishlist = !state.isWishlist;
    const icon = btnWishlist.querySelector("i");
    if (state.isWishlist) {
      icon.className = "fa-solid fa-heart text-base text-red-500";
      showToast("Added to your wishlist ❤️");
    } else {
      icon.className = "fa-regular fa-heart text-base";
      showToast("Removed from wishlist");
    }
  });

  /* --- ACCORDIONS TOGGLE --- */
  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains("active");

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
  const btnAddToCart = document.getElementById("btn-add-to-cart");

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
    if (!state.product) return;

    const cartItem = {
      title: state.product.title,
      capacity: state.selectedCapacity,
      price: state.calculatedPrice,
      qty: state.quantity,
      image: state.product.thumbnail || state.product.images[0],
    };

    const existingIndex = state.cart.findIndex((i) => i.capacity === cartItem.capacity && i.title === cartItem.title);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += cartItem.qty;
    } else {
      state.cart.push(cartItem);
    }

    renderCart();
    showToast(`Added ${state.quantity}x ${state.product.title} (${state.selectedCapacity}) to cart!`);
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
                            <div class="flex items-center space-x-3">
                                <img src="${item.image}" class="w-12 h-12 object-contain rounded border bg-gray-50">
                                <div>
                                    <h4 class="text-xs font-bold text-black">${item.title}</h4>
                                    <p class="text-[11px] text-gray-500">Size: ${item.capacity} | Qty: ${item.qty}</p>
                                    <span class="text-xs font-semibold">$${item.price.toFixed(2)}</span>
                                </div>
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

  /* --- SEARCH MODAL OVERLAY --- */
  const searchBtn = document.getElementById("search-btn");
  const searchModal = document.getElementById("search-modal");
  const closeSearchBtn = document.getElementById("close-search-btn");

  searchBtn.addEventListener("click", () => {
    searchModal.classList.remove("hidden");
    searchModal.classList.add("flex");
  });

  closeSearchBtn.addEventListener("click", () => {
    searchModal.classList.add("hidden");
    searchModal.classList.remove("flex");
  });

  /* --- REVIEW STAR PICKER --- */
  const starIcons = document.querySelectorAll("#star-picker i");
  starIcons.forEach((star) => {
    star.addEventListener("click", () => {
      const rating = parseInt(star.dataset.rating);
      state.selectedRating = rating;

      starIcons.forEach((s, idx) => {
        if (idx < rating) {
          s.className = "fa-solid fa-star text-amber-500";
        } else {
          s.className = "fa-regular fa-star text-gray-400";
        }
      });
    });
  });

  /* --- REVIEWS LIST & FORM SUBMISSION --- */
  const reviewForm = document.getElementById("review-form");
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
      state.reviews.unshift({
        reviewerName: nickname,
        comment: `${summary} - ${body}`,
        rating: state.selectedRating,
        date: new Date().toISOString(),
      });

      renderReviewsList();
      reviewForm.reset();

      starIcons.forEach((s) => {
        s.className = "fa-regular fa-star text-gray-400";
      });
      state.selectedRating = 0;

      showToast("Review submitted successfully! Thank you.");
    }
  });

  function renderReviewsList() {
    reviewsCountBadge.textContent = state.reviews.length;
    reviewsList.innerHTML = "";

    if (state.reviews.length === 0) {
      reviewsList.innerHTML = '<p class="text-xs text-gray-500 italic">No reviews yet. Be the first to review!</p>';
      return;
    }

    let sumRating = 0;

    state.reviews.forEach((review) => {
      sumRating += review.rating;
      let starsHTML = "";
      for (let i = 1; i <= 5; i++) {
        starsHTML += i <= review.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
      }

      const reviewDate = new Date(review.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

      const reviewCard = document.createElement("div");
      reviewCard.className = "bg-white/60 p-5 rounded-xl border border-gray-200 space-y-2";
      reviewCard.innerHTML = `
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-black">${escapeHTML(review.reviewerName || "Anonymous")}</span>
                            <span class="text-[10px] text-gray-400">${reviewDate}</span>
                        </div>
                        <div class="text-amber-500 text-xs flex">${starsHTML}</div>
                        <p class="text-xs text-gray-700 leading-relaxed">${escapeHTML(review.comment)}</p>
                    `;
      reviewsList.appendChild(reviewCard);
    });

    const avg = (sumRating / state.reviews.length).toFixed(1);
    reviewsAvgText.textContent = `Average Rating: ${avg} / 5.0`;
  }

  /* --- NEWSLETTER FORM --- */
  const newsletterForm = document.getElementById("newsletter-form");
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletter-email").value.trim();
    const privacy = document.getElementById("newsletter-privacy").checked;

    if (!privacy) {
      showToast("Please agree to the privacy policy.");
      return;
    }

    showToast(`Subscribed successfully with ${email}!`);
    newsletterForm.reset();
  });

  /* --- HELPER UTILITIES --- */
  function showToast(message) {
    document.getElementById("toast-message").textContent = message;
    const toastEl = document.getElementById("toast");
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 3200);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[tag] || tag);
  }

  /* --- INITIALIZATION --- */
  fetchProductFromAPI(1);
});

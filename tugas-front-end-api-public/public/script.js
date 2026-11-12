document.addEventListener("DOMContentLoaded", () => {
  /* --- STATE MANAGEMENT --- */
  const state = {
    currentProductId: 1,
    product: null,
    quantity: 1,
    isValidQty: true,
    calculatedPrice: 0,
    selectedRating: 0,
    isWishlist: false,
    cart: [],
    reviews: [],
    abortController: null,
  };

  /* --- DOM ELEMENTS --- */
  const productDetailWrapper = document.getElementById("product-detail-wrapper");
  const reviewSection = document.getElementById("review-section");
  const apiErrorState = document.getElementById("api-error-state");
  const apiErrorDetail = document.getElementById("api-error-detail");

  const brandEl = document.getElementById("product-brand");
  const titleEl = document.getElementById("product-title");
  const subtitleEl = document.getElementById("product-subtitle");
  const priceEl = document.getElementById("product-price");
  const oldPriceEl = document.getElementById("product-old-price");
  const discountBadge = document.getElementById("discount-badge");
  const liveSubtotalEl = document.getElementById("live-subtotal");
  const productBadge = document.getElementById("product-badge");
  const ratingTextEl = document.getElementById("product-rating-text");
  const starsContainer = document.getElementById("product-stars-container");
  const stockStatusEl = document.getElementById("stock-status");
  const stockDotEl = document.getElementById("stock-dot");
  const mainImg = document.getElementById("main-product-img");
  const imageSkeleton = document.getElementById("image-skeleton");
  const thumbnailsContainer = document.getElementById("gallery-thumbnails");

  // Quantity & Action Elements
  const qtyInputEl = document.getElementById("qty-input");
  const qtyFeedbackEl = document.getElementById("qty-feedback");
  const btnMinus = document.getElementById("btn-minus");
  const btnPlus = document.getElementById("btn-plus");
  const btnAddToCart = document.getElementById("btn-add-to-cart");

  // Navigation & Retry Buttons
  const btnPrevProduct = document.getElementById("btn-prev-product");
  const btnNextProduct = document.getElementById("btn-next-product");
  const directIdInput = document.getElementById("direct-id-input");
  const btnJumpId = document.getElementById("btn-jump-id");
  const btnCloseBanner = document.getElementById("btn-close-banner");
  const btnRetryApi = document.getElementById("btn-retry-api");
  const btnRetryCard = document.getElementById("btn-retry-card");
  const btnResetId1 = document.getElementById("btn-reset-id-1");

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
  const apiStatusIcon = document.getElementById("api-status-icon");
  const apiStatusText = document.getElementById("api-status-text");

  /* --- LOADING & ERROR STATE HANDLERS --- */
  function showLoadingState(productId) {
    // Tampilkan container produk & sembunyikan error state
    apiErrorState.classList.add("hidden");
    productDetailWrapper.classList.remove("hidden");
    reviewSection.classList.remove("hidden");

    // Update Banner ke mode Loading
    apiStatusBanner.classList.remove(
      "hidden",
      "bg-emerald-50",
      "border-emerald-200",
      "text-emerald-900",
      "bg-red-50",
      "border-red-200",
      "text-red-900",
    );
    apiStatusBanner.classList.add("bg-blue-50", "border-blue-200", "text-blue-900");
    apiStatusIcon.className = "fa-solid fa-spinner fa-spin text-blue-600 text-sm";
    apiStatusText.textContent = `Mengambil data produk #${productId} dari DummyJSON API...`;
    btnRetryApi.classList.add("hidden");
    btnRetryApi.classList.remove("inline-flex");

    // Aktifkan Skeleton & Nonaktifkan tombol aksi selama memuat
    document.getElementById("brand-skeleton").classList.remove("hidden");
    document.getElementById("title-skeleton").classList.remove("hidden");
    brandEl.classList.add("hidden");
    titleEl.classList.add("hidden");

    mainImg.classList.add("opacity-0");
    imageSkeleton.classList.remove("hidden");
    thumbnailsContainer.innerHTML = "";
    btnAddToCart.disabled = true;
  }

  function hideLoadingState() {
    document.getElementById("brand-skeleton").classList.add("hidden");
    document.getElementById("title-skeleton").classList.add("hidden");
    imageSkeleton.classList.add("hidden");
  }

  function showErrorState(productId, errorMessage) {
    hideLoadingState();
    state.product = null;

    // Sembunyikan detail produk yang kosong dan tampilkan kartu error
    productDetailWrapper.classList.add("hidden");
    reviewSection.classList.add("hidden");
    apiErrorState.classList.remove("hidden");
    apiErrorDetail.textContent = `Gagal memuat produk ID #${productId} (${errorMessage}). Silakan tekan Retry untuk mencoba ulang atau pilih ID produk lain.`;

    // Update Banner ke mode Error
    apiStatusBanner.classList.remove(
      "hidden",
      "bg-blue-50",
      "border-blue-200",
      "text-blue-900",
      "bg-emerald-50",
      "border-emerald-200",
      "text-emerald-900",
    );
    apiStatusBanner.classList.add("bg-red-50", "border-red-200", "text-red-900");
    apiStatusIcon.className = "fa-solid fa-circle-exclamation text-red-600 text-sm";
    apiStatusText.textContent = `Error memuat produk #${productId}: ${errorMessage}`;

    btnRetryApi.classList.remove("hidden");
    btnRetryApi.classList.add("inline-flex");
  }

  /* --- ASYNCHRONOUS API FETCH FUNCTION (WITH ABORT CONTROLLER & RESPONSE.OK CHECK) --- */
  async function fetchProductFromAPI(productId) {
    // Batalkan request sebelumnya jika masih berjalan agar tidak duplikat
    if (state.abortController) {
      state.abortController.abort();
    }
    state.abortController = new AbortController();

    state.currentProductId = productId;
    directIdInput.value = productId;
    btnPrevProduct.disabled = productId <= 1;

    showLoadingState(productId);

    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`, {
        signal: state.abortController.signal,
      });

      // Wajib periksa response.ok sebelum membaca JSON
      if (!response.ok) {
        throw new Error(`HTTP Status ${response.status} (${response.statusText || "Not Found"})`);
      }

      const data = await response.json();
      state.product = data;
      state.reviews = Array.isArray(data.reviews) ? [...data.reviews] : [];

      hideLoadingState();
      brandEl.classList.remove("hidden");
      titleEl.classList.remove("hidden");

      // Update Banner ke mode Sukses, lalu sembunyikan otomatis setelah 3 detik
      apiStatusBanner.classList.remove(
        "hidden",
        "bg-blue-50",
        "border-blue-200",
        "text-blue-900",
        "bg-red-50",
        "border-red-200",
        "text-red-900",
        "bg-white/80",
        "border-gray-300",
        "text-gray-700",
      );
      apiStatusBanner.classList.add("bg-emerald-50", "border-emerald-200", "text-emerald-900");
      apiStatusIcon.className = "fa-solid fa-circle-check text-emerald-600 text-sm";
      apiStatusText.textContent = `Data produk #${data.id} (${data.title}) berhasil dimuat dari API.`;

      clearTimeout(state.bannerTimeout);
      state.bannerTimeout = setTimeout(() => {
        apiStatusBanner.classList.add("hidden");
      }, 3000);

      populateProductDetails();
    } catch (error) {
      // Abaikan error jika request sengaja dibatalkan oleh user yang berpindah produk cepat
      if (error.name === "AbortError") return;

      console.error("API Fetch Error:", error);
      showErrorState(productId, error.message || "Network connection error");
    }
  }

  /* --- NEXT / BACK / RETRY PRODUCT LISTENERS --- */
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
    if (!Number.isNaN(targetId) && targetId >= 1) {
      fetchProductFromAPI(targetId);
    } else {
      showToast("Masukkan ID produk bilangan bulat >= 1.");
    }
  });

  directIdInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      btnJumpId.click();
    }
  });

  btnRetryApi.addEventListener("click", () => fetchProductFromAPI(state.currentProductId));
  btnRetryCard.addEventListener("click", () => fetchProductFromAPI(state.currentProductId));
  btnResetId1.addEventListener("click", () => fetchProductFromAPI(1));
  btnCloseBanner.addEventListener("click", () => apiStatusBanner.classList.add("hidden"));

  /* --- HELPER: CALCULATE REMAINING STOCK FOR CURRENT API PRODUCT --- */
  function getRemainingStock() {
    if (!state.product) return 0;
    const totalStock = Number(state.product.stock) || 0;
    const inCartQty = state.cart.filter((item) => item.id === state.product.id).reduce((sum, item) => sum + item.qty, 0);

    return Math.max(0, totalStock - inCartQty);
  }

  /* --- UPDATE SUMMARY & SUBTOTAL UI --- */
  function updateSummaryUI() {
    if (!state.product) return;

    const remaining = getRemainingStock();
    if (remaining > 0) {
      stockStatusEl.textContent = `In Stock (${remaining} available)`;
      stockStatusEl.parentElement.className = "text-xs font-semibold text-emerald-700 flex items-center";
      stockDotEl.className = "w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1.5 animate-pulse";
    } else {
      stockStatusEl.textContent = "Out of Stock (0 available)";
      stockStatusEl.parentElement.className = "text-xs font-semibold text-red-600 flex items-center";
      stockDotEl.className = "w-2 h-2 rounded-full bg-red-500 inline-block mr-1.5";
    }

    priceEl.textContent = `$${state.calculatedPrice.toFixed(2)}`;

    if (state.isValidQty && remaining > 0) {
      const subtotal = _.round(state.calculatedPrice * state.quantity, 2);
      liveSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      btnAddToCart.disabled = false;
    } else {
      liveSubtotalEl.textContent = "$0.00";
      btnAddToCart.disabled = true;
    }

    btnMinus.disabled = !state.isValidQty || state.quantity <= 1;
    btnPlus.disabled = !state.isValidQty || state.quantity >= remaining;
  }

  /* --- QUANTITY VALIDATION LOGIC (POSITIVE INTEGER <= STOCK) --- */
  function validateAndSetQuantity(rawValue) {
    if (!state.product) return false;
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
      setQtyError("Product is out of stock.");
      return false;
    }

    if (parsed > remainingStock) {
      setQtyError(`Exceeds available stock! Maximum quantity available is ${remainingStock}.`);
      return false;
    }

    state.quantity = parsed;
    state.isValidQty = true;
    qtyFeedbackEl.textContent = "";
    qtyFeedbackEl.classList.add("hidden");
    qtyInputEl.classList.remove("text-red-600");
    updateSummaryUI();
    return true;
  }

  function setQtyError(message) {
    state.isValidQty = false;
    qtyFeedbackEl.textContent = message;
    qtyFeedbackEl.classList.remove("hidden");
    qtyInputEl.classList.add("text-red-600");
    updateSummaryUI();
  }

  /* --- POPULATE UI FROM API DATA --- */
  function populateProductDetails() {
    const p = state.product;

    // 1. Basic Metadata
    brandEl.textContent = p.brand || "50ML SELECTION";
    titleEl.textContent = p.title;
    subtitleEl.textContent = `${(p.category || "general").toUpperCase()} • ${p.description}`;
    reviewTargetName.textContent = p.title;

    // 2. Pricing & Discount Display
    const unitPrice = Number(p.price) || 0;
    const discount = Number(p.discountPercentage) || 0;
    state.calculatedPrice = unitPrice;

    if (discount > 0 && discount < 100) {
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

    // 3. Reset & Validate Quantity against Stock
    const remaining = getRemainingStock();
    qtyInputEl.max = remaining;
    qtyInputEl.value = remaining > 0 ? 1 : 0;
    validateAndSetQuantity(qtyInputEl.value);

    // 4. Rating Stars
    renderStars(Number(p.rating) || 0);

    // 5. Main Image & Gallery Thumbnails
    const imageList = Array.isArray(p.images) && p.images.length > 0 ? p.images : p.thumbnail ? [p.thumbnail] : [];
    if (imageList.length > 0) {
      mainImg.src = imageList[0];
      mainImg.alt = p.title;
      mainImg.onload = () => {
        imageSkeleton.classList.add("hidden");
        mainImg.classList.remove("opacity-0");
      };
      mainImg.onerror = () => {
        imageSkeleton.classList.add("hidden");
        mainImg.classList.remove("opacity-0");
      };

      thumbnailsContainer.innerHTML = "";
      imageList.forEach((imgUrl, index) => {
        const thumb = document.createElement("img");
        thumb.src = imgUrl;
        thumb.alt = `${p.title} thumbnail ${index + 1}`;
        thumb.className = `w-14 h-14 object-cover rounded-lg border-2 cursor-pointer transition ${
          index === 0 ? "border-black opacity-100 scale-105" : "border-transparent opacity-60 hover:opacity-100"
        }`;

        thumb.addEventListener("click", () => {
          mainImg.src = imgUrl;
          document.querySelectorAll("#gallery-thumbnails img").forEach((t) => {
            t.classList.remove("border-black", "scale-105", "opacity-100");
            t.classList.add("border-transparent", "opacity-60");
          });
          thumb.classList.remove("border-transparent", "opacity-60");
          thumb.classList.add("border-black", "scale-105", "opacity-100");
        });

        thumbnailsContainer.appendChild(thumb);
      });
    } else {
      imageSkeleton.classList.add("hidden");
      mainImg.src = "";
    }

    // 6. Accordions Info
    accordionDescText.textContent = p.description || "-";
    infoWarranty.textContent = p.warrantyInformation || "N/A";
    infoShipping.textContent = p.shippingInformation || "N/A";
    infoReturn.textContent = p.returnPolicy || "N/A";
    infoMinOrder.textContent = `${p.minimumOrderQuantity || 1} Item(s)`;
    infoSku.textContent = p.sku || `PROD-${p.id}`;
    infoCategory.textContent = p.category || "General";
    infoStockCount.textContent = `${p.stock ?? 0} units`;
    infoRatingScore.textContent = `${p.rating ?? 0} / 5.0`;

    // 7. Render Reviews List
    renderReviewsList();
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
  const btnWishlist = document.getElementById("btn-wishlist");
  btnWishlist.addEventListener("click", () => {
    state.isWishlist = !state.isWishlist;
    const icon = btnWishlist.querySelector("i");
    if (state.isWishlist) {
      icon.className = "fa-solid fa-heart text-base text-red-500";
      showToast("Added to your wishlist");
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
    if (!state.product) return;

    if (!validateAndSetQuantity(qtyInputEl.value)) {
      showToast("Please enter a valid quantity before adding to cart.");
      return;
    }

    const cartItem = {
      id: state.product.id,
      title: state.product.title,
      price: state.calculatedPrice,
      qty: state.quantity,
      image: state.product.thumbnail || (state.product.images && state.product.images[0]) || "",
    };

    const existingIndex = state.cart.findIndex((i) => i.id === cartItem.id);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += cartItem.qty;
    } else {
      state.cart.push(cartItem);
    }

    renderCart();
    showToast(`Added ${cartItem.qty}x ${cartItem.title} to cart!`);

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
          <div class="flex items-center space-x-3">
            <img src="${_.escape(item.image)}" alt="${_.escape(item.title)}" class="w-12 h-12 object-contain rounded border bg-gray-50">
            <div>
              <h4 class="text-xs font-bold text-black">${_.escape(item.title)}</h4>
              <p class="text-[11px] text-gray-500">Qty: ${item.qty}</p>
              <span class="text-xs font-semibold">$${item.price.toFixed(2)}</span>
            </div>
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

      if (state.product) {
        if (parseInt(qtyInputEl.value, 10) === 0 && getRemainingStock() > 0) {
          qtyInputEl.value = 1;
        }
        validateAndSetQuantity(qtyInputEl.value);
      }
      showToast("Item removed from cart.");
    }
  });

  /* --- SEARCH MODAL OVERLAY --- */
  const searchBtn = document.getElementById("search-btn");
  const searchModal = document.getElementById("search-modal");
  const closeSearchBtn = document.getElementById("close-search-btn");
  const searchInput = document.getElementById("search-input");

  searchBtn.addEventListener("click", () => {
    searchModal.classList.remove("hidden");
    searchModal.classList.add("flex");
  });

  closeSearchBtn.addEventListener("click", () => {
    searchModal.classList.add("hidden");
    searchModal.classList.remove("flex");
  });

  document.querySelectorAll(".search-suggestion").forEach((el) => {
    el.addEventListener("click", () => {
      searchInput.value = el.dataset.searchTerm || "";
      searchInput.focus();
    });
  });

  /* --- REVIEW STAR PICKER --- */
  const starIcons = document.querySelectorAll("#star-picker i");
  starIcons.forEach((star) => {
    star.addEventListener("click", () => {
      const rating = parseInt(star.dataset.rating, 10);
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
      reviewsAvgText.textContent = "Rating: 0 / 5.0";
      return;
    }

    let sumRating = 0;

    state.reviews.forEach((review) => {
      sumRating += review.rating;
      let starsHTML = "";
      for (let i = 1; i <= 5; i++) {
        starsHTML += i <= review.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
      }

      const reviewDate = new Date(review.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const reviewCard = document.createElement("div");
      reviewCard.className = "bg-white/60 p-5 rounded-xl border border-gray-200 space-y-2";
      reviewCard.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-black">${_.escape(review.reviewerName || "Anonymous")}</span>
          <span class="text-[10px] text-gray-400">${_.escape(reviewDate)}</span>
        </div>
        <div class="text-amber-500 text-xs flex">${starsHTML}</div>
        <p class="text-xs text-gray-700 leading-relaxed">${_.escape(review.comment)}</p>
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
  let toastTimeout;
  function showToast(message) {
    document.getElementById("toast-message").textContent = message;
    const toastEl = document.getElementById("toast");
    toastEl.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toastEl.classList.remove("show"), 3200);
  }

  /* --- INITIALIZATION --- */
  fetchProductFromAPI(1);
});

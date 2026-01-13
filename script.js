// ===========================
// Dark Mode Management
// ===========================
const initDarkMode = () => {
  const theme = localStorage.getItem("saalify-theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeIcon(theme);
};

const toggleDarkMode = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("saalify-theme", newTheme);
  updateThemeIcon(newTheme);
};

const updateThemeIcon = (theme) => {
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
};

// ===========================
// Toast Notification System
// ===========================
const showToast = (message, type = "info") => {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  };

  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas ${icons[type] || icons.info}"></i>
    </div>
    <div class="toast-message">${message}</div>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

// ===========================
// Cookie Consent Management
// ===========================
const initCookieConsent = () => {
  const cookieConsent = document.getElementById("cookie-consent");
  const hasConsent = localStorage.getItem("saalify-cookie-consent");

  if (!hasConsent && cookieConsent) {
    setTimeout(() => cookieConsent.classList.add("show"), 1000);
  }

  const acceptBtn = document.getElementById("accept-cookies");
  const declineBtn = document.getElementById("decline-cookies");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("saalify-cookie-consent", "accepted");
      cookieConsent.classList.remove("show");
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener("click", () => {
      localStorage.setItem("saalify-cookie-consent", "declined");
      cookieConsent.classList.remove("show");
    });
  }
};

// ===========================
// Back to Top Button
// ===========================
const initBackToTop = () => {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

// ===========================
// Sorting and Filtering
// ===========================
let currentFilter = "all";
let currentSort = "default";
let maxPrice = 500;

const sortProducts = (productsArray, sortType) => {
  const sorted = [...productsArray];

  switch (sortType) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};

const filterProducts = (productsArray) => {
  let filtered = productsArray;

  if (currentFilter !== "all") {
    filtered = filtered.filter((p) => p.category === currentFilter);
  }

  filtered = filtered.filter((p) => p.price <= maxPrice);

  return filtered;
};

// ===========================
// Sample Product Data
// ===========================
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    category: "fashion",
    price: 29.99,
    rating: 4.5,
    reviews: 128,
    badge: "New",
    icon: "fa-tshirt",
    description:
      "Premium cotton blend t-shirt with a classic fit. Perfect for everyday wear.",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "electronics",
    price: 149.99,
    rating: 4.8,
    reviews: 256,
    badge: "Hot",
    icon: "fa-headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
  },
  {
    id: 3,
    name: "Leather Watch",
    category: "accessories",
    price: 199.99,
    rating: 4.6,
    reviews: 89,
    badge: "",
    icon: "fa-watch",
    description:
      "Elegant leather watch with Japanese quartz movement and sapphire crystal.",
  },
  {
    id: 4,
    name: "Modern Desk Lamp",
    category: "home",
    price: 79.99,
    rating: 4.4,
    reviews: 143,
    badge: "",
    icon: "fa-lightbulb",
    description:
      "Adjustable LED desk lamp with touch controls and multiple brightness levels.",
  },
  {
    id: 5,
    name: "Running Shoes",
    category: "fashion",
    price: 89.99,
    rating: 4.7,
    reviews: 312,
    badge: "Sale",
    icon: "fa-shoe-prints",
    description:
      "Comfortable running shoes with breathable mesh and cushioned sole.",
  },
  {
    id: 6,
    name: "Smart Watch",
    category: "electronics",
    price: 299.99,
    rating: 4.9,
    reviews: 421,
    badge: "Hot",
    icon: "fa-clock",
    description:
      "Advanced smartwatch with fitness tracking, heart rate monitor, and GPS.",
  },
  {
    id: 7,
    name: "Leather Backpack",
    category: "accessories",
    price: 129.99,
    rating: 4.5,
    reviews: 176,
    badge: "New",
    icon: "fa-backpack",
    description:
      "Stylish leather backpack with laptop compartment and multiple pockets.",
  },
  {
    id: 8,
    name: "Coffee Maker",
    category: "home",
    price: 119.99,
    rating: 4.6,
    reviews: 234,
    badge: "",
    icon: "fa-mug-hot",
    description:
      "Programmable coffee maker with thermal carafe and auto-brew feature.",
  },
  {
    id: 9,
    name: "Denim Jacket",
    category: "fashion",
    price: 79.99,
    rating: 4.4,
    reviews: 98,
    badge: "",
    icon: "fa-vest",
    description:
      "Classic denim jacket with a comfortable fit and durable construction.",
  },
  {
    id: 10,
    name: "Bluetooth Speaker",
    category: "electronics",
    price: 59.99,
    rating: 4.7,
    reviews: 287,
    badge: "Sale",
    icon: "fa-volume-high",
    description:
      "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
  },
  {
    id: 11,
    name: "Sunglasses",
    category: "accessories",
    price: 149.99,
    rating: 4.8,
    reviews: 156,
    badge: "Hot",
    icon: "fa-glasses",
    description:
      "UV protection sunglasses with polarized lenses and lightweight frame.",
  },
  {
    id: 12,
    name: "Throw Pillow Set",
    category: "home",
    price: 39.99,
    rating: 4.3,
    reviews: 267,
    badge: "",
    icon: "fa-couch",
    description:
      "Set of 2 decorative throw pillows with premium fabric and hidden zippers.",
  },
];

// ===========================
// Subcategory Highlights Data
// ===========================
const subcategoryData = {
  fashion: [
    {
      tag: "Tops",
      title: "Tailored Layers",
      description:
        "Wrinkle-resistant shirts and breathable knits for office or weekend.",
    },
    {
      tag: "Footwear",
      title: "Performance Runners",
      description: "Lightweight soles with extra cushioning for daily miles.",
    },
    {
      tag: "Outerwear",
      title: "All-Weather Jackets",
      description:
        "Packable shells and insulated parkas for year-round coverage.",
    },
  ],
  electronics: [
    {
      tag: "Audio",
      title: "Noise-Canceling Picks",
      description: "Immersive sound with adaptive ANC and 30+ hour batteries.",
    },
    {
      tag: "Wearables",
      title: "Health-first Wearables",
      description: "Track recovery, HRV, and sleep with AMOLED clarity.",
    },
    {
      tag: "Home Tech",
      title: "Smart Home Staples",
      description: "Voice-ready hubs, secure cams, and energy-saving lights.",
    },
  ],
  accessories: [
    {
      tag: "Bags",
      title: "Carry Essentials",
      description: "Laptop-friendly totes with water-resistant finishes.",
    },
    {
      tag: "Jewelry",
      title: "Minimal Metals",
      description: "Everyday pieces in stainless steel and vermeil.",
    },
    {
      tag: "Eyewear",
      title: "UV Polarized",
      description: "Featherlight frames with anti-glare lenses.",
    },
  ],
  home: [
    {
      tag: "Lighting",
      title: "Ambient Glow",
      description: "Warm-dim lamps and task lighting for focused work.",
    },
    {
      tag: "Decor",
      title: "Cozy Textures",
      description:
        "Woven throws, cushions, and artful ceramics to refresh rooms.",
    },
    {
      tag: "Kitchen",
      title: "Daily Brew",
      description: "Brew gear and prep tools built for busy mornings.",
    },
  ],
};

const introSubcategories = [
  {
    tag: "Fashion",
    title: "Fresh wardrobe staples",
    description: "Choose a collection to see curated picks.",
  },
  {
    tag: "Electronics",
    title: "Smart upgrades",
    description: "Tap a category to reveal top subcategories.",
  },
  {
    tag: "Accessories",
    title: "Finish the look",
    description: "See belts, bags, and eyewear per category.",
  },
  {
    tag: "Home",
    title: "Cozy living",
    description: "Select a collection for room-by-room ideas.",
  },
];

// ===========================
// Cart Management
// ===========================
let cart = JSON.parse(localStorage.getItem("saalify-cart")) || [];

function updateCartUI() {
  const cartCount = document.querySelector(".cart-count");
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.querySelector(".total-price");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    totalPrice.textContent = "£0.00";
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <i class="fas ${item.icon}"></i>
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">£${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${
                          item.id
                        }, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${
                          item.id
                        }, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${
                  item.id
                })">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `
      )
      .join("");

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalPrice.textContent = `£${total.toFixed(2)}`;
  }

  localStorage.setItem("saalify-cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      icon: product.icon,
      quantity: 1,
    });
  }

  updateCartUI();
  showToast("Product added to cart!", "success");

  document.getElementById("cart-sidebar").classList.add("active");
  document.getElementById("overlay").classList.add("active");
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
    }
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
  showToast("Product removed from cart", "info");
}

// ===========================
// Product Display
// ===========================
function renderProducts(filter = "all", sort = "default") {
  const productsGrid = document.getElementById("products-grid");
  const loadingSkeleton = document.getElementById("loading-skeleton");

  if (loadingSkeleton) {
    loadingSkeleton.style.display = "grid";
    productsGrid.style.display = "none";
  }

  setTimeout(() => {
    currentFilter = filter;
    currentSort = sort;

    let filtered = filterProducts(products);
    let sorted = sortProducts(filtered, sort);

    if (loadingSkeleton) {
      loadingSkeleton.style.display = "none";
      productsGrid.style.display = "grid";
    }

    if (sorted.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
          <i class="fas fa-search" style="font-size: 4rem; color: var(--text-light); opacity: 0.3; margin-bottom: 1rem;"></i>
          <h3>No products found</h3>
          <p style="color: var(--text-light);">Try adjusting your filters</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = sorted
      .map(
        (product) => `
        <div class="product-card" data-category="${
          product.category
        }" role="listitem">
            <div class="product-image">
                <i class="fas ${product.icon}"></i>
                ${
                  product.badge
                    ? `<span class="product-badge">${product.badge}</span>`
                    : ""
                }
                <div class="product-actions">
                    <button class="action-btn" onclick="quickView(${
                      product.id
                    })" title="Quick View" aria-label="Quick view ${
          product.name
        }">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="addToWishlist(${
                      product.id
                    })" title="Add to Wishlist" aria-label="Add ${
          product.name
        } to wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">£${product.price.toFixed(
                      2
                    )}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${
                      product.id
                    })" aria-label="Add ${product.name} to cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `
      )
      .join("");

    renderSubcategories(currentFilter);
  }, 300);
}

function renderSubcategories(category = "all") {
  const grid = document.getElementById("subcategory-grid");
  const label = document.getElementById("subcategory-label");
  const panel = document.getElementById("subcategory-panel");

  if (!grid || !label || !panel) return;

  const buildCard = (item) => `
    <div class="subcategory-card">
      <span class="tag">${item.tag}</span>
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    </div>
  `;

  if (category === "all") {
    label.textContent = "Tap a category to see curated picks.";
    grid.innerHTML = introSubcategories.map(buildCard).join("");
    return;
  }

  const items = subcategoryData[category] || [];
  label.textContent = `Featured ${category} subcategories curated for you.`;
  grid.innerHTML =
    items.length > 0
      ? items.map(buildCard).join("")
      : '<div class="subcategory-card"><h4>More coming soon</h4><p>We are adding subcategories for this collection.</p></div>';
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  if (halfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

// ===========================
// Quick View Modal
// ===========================
function quickView(productId) {
  const product = products.find((p) => p.id === productId);
  const modal = document.getElementById("quick-view-modal");
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
        <div class="modal-product">
            <div class="modal-product-image">
                <i class="fas ${product.icon}"></i>
            </div>
            <div class="modal-product-info">
                <div class="product-category">${product.category}</div>
                <h2>${product.name}</h2>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${
                      product.reviews
                    } reviews)</span>
                </div>
                <div class="product-price">£${product.price.toFixed(2)}</div>
                <p class="modal-product-description">${product.description}</p>
                <button class="btn btn-primary btn-block" onclick="addToCart(${
                  product.id
                }); closeModal()">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-secondary btn-block" onclick="addToWishlist(${
                  product.id
                })">
                    <i class="fas fa-heart"></i> Add to Wishlist
                </button>
            </div>
        </div>
    `;

  modal.classList.add("active");
  document.getElementById("overlay").classList.add("active");
}

function closeModal() {
  document.getElementById("quick-view-modal").classList.remove("active");
  if (!document.getElementById("cart-sidebar").classList.contains("active")) {
    document.getElementById("overlay").classList.remove("active");
  }
}

// ===========================
// Wishlist
// ===========================
let wishlist = JSON.parse(localStorage.getItem("saalify-wishlist")) || [];

function addToWishlist(productId) {
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem("saalify-wishlist", JSON.stringify(wishlist));
    showToast("Added to wishlist!", "success");
  } else {
    showToast("Already in wishlist", "info");
  }
}

// ===========================
// Search Functionality
// ===========================
function searchProducts(query) {
  const searchTerm = query.toLowerCase();
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
  );

  const productsGrid = document.getElementById("products-grid");

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No products found</h3>
                <p style="color: #666;">Try searching with different keywords</p>
            </div>
        `;
  } else {
    productsGrid.innerHTML = filteredProducts
      .map(
        (product) => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <i class="fas ${product.icon}"></i>
                    ${
                      product.badge
                        ? `<span class="product-badge">${product.badge}</span>`
                        : ""
                    }
                    <div class="product-actions">
                        <button class="action-btn" onclick="quickView(${
                          product.id
                        })" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn" onclick="addToWishlist(${
                          product.id
                        })" title="Add to Wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">
                            ${generateStars(product.rating)}
                        </div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-footer">
                        <div class="product-price">$${product.price.toFixed(
                          2
                        )}</div>
                        <button class="add-to-cart-btn" onclick="addToCart(${
                          product.id
                        })">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }
}

// ===========================
// Notification System
// ===========================
function showNotification(message) {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
  notification.textContent = message;

  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===========================
// Event Listeners
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  initCookieConsent();
  initBackToTop();

  renderProducts();
  renderSubcategories(currentFilter);
  updateCartUI();

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleDarkMode);
  }

  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderProducts(currentFilter, currentSort);
    });
  }

  const priceRange = document.getElementById("price-range");
  if (priceRange) {
    priceRange.addEventListener("input", (e) => {
      maxPrice = parseInt(e.target.value, 10);
      document.getElementById("price-max-label").textContent = maxPrice;
      renderProducts(currentFilter, currentSort);
    });
  }

  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      const isExpanded = navMenu.classList.contains("active");
      mobileMenuToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderProducts(currentFilter, currentSort);
      renderSubcategories(currentFilter);
    });
  });

  const collectionCards = document.querySelectorAll(".collection-card");
  collectionCards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;
      const targetBtn = document.querySelector(`[data-filter="${category}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
      document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
    });
  });

  const cartBtn = document.getElementById("cart-btn");
  const closeCart = document.getElementById("close-cart");
  const cartSidebar = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("overlay");
  const continueShoppingBtn = document.getElementById("continue-shopping");

  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      cartSidebar.classList.add("active");
      overlay.classList.add("active");
    });
  }

  if (closeCart) {
    closeCart.addEventListener("click", () => {
      cartSidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
      cartSidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      cartSidebar.classList.remove("active");
      overlay.classList.remove("active");
      closeModal();
    });
  }

  const closeModalBtn = document.getElementById("close-modal");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  const modal = document.getElementById("quick-view-modal");
  if (modal) {
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }

      if (e.key === "Tab") {
        const focusableElements = modal.querySelectorAll(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  const searchInput = document.getElementById("search-input");
  const searchBtn = document.querySelector(".search-btn");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) {
        searchProducts(query);
        const shopSection = document.querySelector("#shop");
        if (shopSection) {
          shopSection.scrollIntoView({ behavior: "smooth" });
          shopSection.focus();
        }
      }
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          searchProducts(query);
          const shopSection = document.querySelector("#shop");
          if (shopSection) {
            shopSection.scrollIntoView({ behavior: "smooth" });
            shopSection.focus();
          }
        }
      }
    });
  }

  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = e.target.querySelector("input").value;
      showToast("Thank you for subscribing!", "success");
      const feedback = document.getElementById("newsletter-feedback");
      if (feedback) {
        feedback.textContent = `You're in! We'll email ${email} with drops and offers.`;
        feedback.classList.add("show");
        setTimeout(() => {
          feedback.classList.remove("show");
          feedback.textContent = "";
        }, 5000);
      }
      e.target.reset();
    });
  }

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showToast("Your cart is empty!", "warning");
      } else {
        window.location.href = "checkout.html";
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});

// ===========================
// Scroll animations
// ===========================
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
  }
});

/**
 * cart.js — Shopping cart system using localStorage
 * Segoro Banyuwangi
 */

const CART_KEY = "segoro_cart";

/* ═══════════════════════════════════════════════
   CORE CART OPERATIONS
═══════════════════════════════════════════════ */

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(item) {
  const cart = getCart();
  // Check if same product + variant + bumbu exists
  const existingIdx = cart.findIndex(c =>
    c.productId === item.productId &&
    c.variant === item.variant &&
    c.bumbu === item.bumbu
  );

  if (existingIdx !== -1) {
    cart[existingIdx].quantity += item.quantity;
    cart[existingIdx].subtotal = cart[existingIdx].unitPrice * cart[existingIdx].quantity;
  } else {
    cart.push({
      cartId: Date.now(),
      productId: item.productId,
      name: item.name,
      image: item.image,
      variant: item.variant || "",
      bumbu: item.bumbu || "",
      additions: item.additions || [],
      note: item.note || "",
      quantity: item.quantity || 1,
      unitPrice: item.unitPrice,
      subtotal: item.unitPrice * (item.quantity || 1)
    });
  }
  saveCart(cart);
}

function removeFromCart(cartId) {
  const cart = getCart().filter(item => item.cartId !== cartId);
  saveCart(cart);
}

function updateQuantity(cartId, newQty) {
  if (newQty < 1) return;
  const cart = getCart();
  const idx = cart.findIndex(item => item.cartId === cartId);
  if (idx !== -1) {
    cart[idx].quantity = newQty;
    cart[idx].subtotal = cart[idx].unitPrice * newQty;
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.subtotal, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/* ═══════════════════════════════════════════════
   CART PAGE RENDERER
═══════════════════════════════════════════════ */

function renderCartPage() {
  const container = document.getElementById("cart-list");
  const emptyState = document.getElementById("cart-empty");
  const summarySection = document.getElementById("cart-summary");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.style.display = "flex";
    if (summarySection) summarySection.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (summarySection) summarySection.style.display = "block";

  container.innerHTML = cart.map(item => `
    <article class="cart-item" data-cart-id="${item.cartId}">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        ${item.variant ? `<span class="cart-item-variant">${item.variant}</span>` : ""}
        ${item.bumbu ? `<span class="cart-item-variant">${item.bumbu}</span>` : ""}
        ${item.additions.length ? `<span class="cart-item-addition">${item.additions.map(a => a.name).join(", ")}</span>` : ""}
        <strong class="cart-item-price">${formatPrice(item.unitPrice)}</strong>
      </div>
      <div class="cart-item-actions">
        <div class="quantity">
          <button class="qty-minus" data-cart-id="${item.cartId}" aria-label="Kurangi jumlah">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-plus" data-cart-id="${item.cartId}" aria-label="Tambah jumlah">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <button class="cart-item-delete" data-cart-id="${item.cartId}" aria-label="Hapus item">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <div class="cart-item-subtotal">${formatPrice(item.subtotal)}</div>
    </article>
  `).join("");

  // Update total
  updateCartSummary();

  // Events
  container.querySelectorAll(".qty-minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.cartId);
      const item = getCart().find(i => i.cartId === id);
      if (item && item.quantity > 1) {
        updateQuantity(id, item.quantity - 1);
      } else {
        removeFromCart(id);
      }
      renderCartPage();
    });
  });

  container.querySelectorAll(".qty-plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.cartId);
      const item = getCart().find(i => i.cartId === id);
      if (item) {
        updateQuantity(id, item.quantity + 1);
        renderCartPage();
      }
    });
  });

  container.querySelectorAll(".cart-item-delete").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.cartId);
      removeFromCart(id);
      renderCartPage();
      showToast("Item dihapus dari keranjang", "error");
    });
  });
}

function updateCartSummary() {
  const total = getCartTotal();
  const totalEl = document.getElementById("cart-total");
  const checkoutTotalEl = document.getElementById("checkout-total-preview");
  if (totalEl) totalEl.textContent = formatPrice(total);
  if (checkoutTotalEl) checkoutTotalEl.textContent = formatPrice(total);
}

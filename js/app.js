/**
 * app.js — Shared utilities: toast, hamburger nav, cart badge, WhatsApp
 * Segoro Banyuwangi
 */

/* ══════════════════════════════════════════
   WHATSAPP CONFIG — ubah nomor di sini saja
══════════════════════════════════════════ */
const RESTAURANT_WHATSAPP = "6281234567890"; // Ganti dengan nomor WA restoran

/* ══════════════════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════════════════ */
function showToast(message, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-circle-xmark"}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("toast--show"));
  });

  setTimeout(() => {
    toast.classList.remove("toast--show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ══════════════════════════════════════════
   CART BADGE — update semua badge di halaman
══════════════════════════════════════════ */
function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-badge").forEach(badge => {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "flex" : "none";
  });
}

/* ══════════════════════════════════════════
   HAMBURGER MENU
══════════════════════════════════════════ */
function initHamburger() {
  const openBtns = document.querySelectorAll(".hamburger-btn, .menu-button");
  const closeBtn = document.getElementById("nav-close");
  const overlay  = document.getElementById("nav-overlay");
  const drawer   = document.getElementById("nav-drawer");

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("open");
    if (overlay) overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  openBtns.forEach(btn => btn.addEventListener("click", openDrawer));
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay)  overlay.addEventListener("click", closeDrawer);

  // Close on Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeDrawer();
  });
}

/* ══════════════════════════════════════════
   ACTIVE NAV LINK
══════════════════════════════════════════ */
function setActiveNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach(link => {
    const href = link.getAttribute("href") || "";
    const isActive =
      (href === "index.html" && (page === "index.html" || page === "")) ||
      (href !== "index.html" && page.startsWith(href.replace(".html", "")));
    link.classList.toggle("active", isActive);
  });
}

/* ══════════════════════════════════════════
   FAVORITE
══════════════════════════════════════════ */
function getFavorites() {
  return JSON.parse(localStorage.getItem("segoro_favorites") || "[]");
}

function toggleFavorite(productId) {
  let favs = getFavorites();
  const idx = favs.indexOf(productId);
  if (idx === -1) {
    favs.push(productId);
    showToast("Ditambahkan ke favorit");
  } else {
    favs.splice(idx, 1);
    showToast("Dihapus dari favorit", "error");
  }
  localStorage.setItem("segoro_favorites", JSON.stringify(favs));
  return favs.includes(productId);
}

function isFavorite(productId) {
  return getFavorites().includes(productId);
}

/* ══════════════════════════════════════════
   WHATSAPP — generate pesan dari cart
══════════════════════════════════════════ */
function generateWhatsAppMessage(cart) {
  if (!cart || cart.length === 0) return "";

  let msg = "Halo Segoro Banyuwangi, saya ingin memesan:\n\n";

  cart.forEach((item, i) => {
    msg += `${i + 1}. *${item.name}*\n`;
    if (item.variant) msg += `   Varian: ${item.variant}\n`;
    if (item.bumbu)   msg += `   Bumbu: ${item.bumbu}\n`;
    if (item.additions && item.additions.length) {
      msg += `   Tambahan: ${item.additions.map(a => a.name).join(", ")}\n`;
    }
    if (item.note)    msg += `   Catatan: ${item.note}\n`;
    msg += `   Qty: ${item.quantity}\n`;
    msg += `   Subtotal: ${formatPrice(item.subtotal)}\n\n`;
  });

  const total = cart.reduce((s, item) => s + item.subtotal, 0);
  msg += `*Total: ${formatPrice(total)}*\n\n`;
  msg += "Mohon konfirmasi pesanan saya. Terima kasih 🙏";

  return msg;
}

function openWhatsAppOrder(cart) {
  const msg = generateWhatsAppMessage(cart);
  if (!msg) {
    showToast("Keranjang kosong", "error");
    return;
  }
  const url = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

/* ══════════════════════════════════════════
   WHATSAPP — produk tunggal dari detail
══════════════════════════════════════════ */
function openWhatsAppSingleProduct(product, variant, bumbu, additions, qty) {
  const unitPrice = product.price + (additions || []).reduce((s, a) => s + a.price, 0);
  const singleItem = [{
    name: product.name,
    variant: variant || "",
    bumbu: bumbu || "",
    additions: additions || [],
    note: "",
    quantity: qty || 1,
    unitPrice,
    subtotal: unitPrice * (qty || 1)
  }];
  openWhatsAppOrder(singleItem);
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initHamburger();
  setActiveNav();
  updateCartBadge();
});

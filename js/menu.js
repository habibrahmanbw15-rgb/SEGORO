/**
 * menu.js — Search, filter, and render menu page
 * Segoro Banyuwangi
 */

let currentCategory = "semua";
let currentSearch = "";

const CATEGORY_MAP = {
  "semua": "semua",
  "Favorit": "semua",         // show all, filter by badge
  "Ikan Bakar": "goreng-bakar",
  "Seafood": "seafood",
  "Goreng / Bakar": "goreng-bakar",
  "Sayuran": "sayuran",
  "Cemilan": "sayuran",
  "Tea": "minuman",
  "Dingin": "minuman",
  "Milk Shake": "minuman",
  "Juice": "minuman",
  "Squash": "minuman",
  "Hangat": "minuman",
  "Paket": "paket"
};

/* ═══════════════════════════════════════════════
   RENDER
═══════════════════════════════════════════════ */

function renderMenuSections() {
  const container = document.getElementById("menu-sections");
  if (!container) return;

  let products = currentSearch
    ? searchProducts(currentSearch)
    : getProductsByCategory(currentCategory);

  // If "Favorit" tab selected, show all with "badge" only
  if (currentCategory === "favorit") {
    products = PRODUCTS.filter(p => p.badge);
  }

  if (products.length === 0) {
    container.innerHTML = `
      <div class="menu-empty">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>Menu tidak ditemukan</p>
        <small>Coba kata kunci lain</small>
      </div>`;
    return;
  }

  // Group by category
  const groups = {};
  const LABELS = {
    "paket": "Paket Ikan Bakar",
    "goreng-bakar": "Goreng / Bakar",
    "seafood": "Seafood",
    "sayuran": "Cah Sayur &amp; Cemilan",
    "minuman": "Minuman"
  };

  products.forEach(p => {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  });

  container.innerHTML = Object.entries(groups).map(([cat, items]) => `
    <section class="menu-section">
      <div class="menu-section-title">
        <h2>${LABELS[cat] || cat}</h2>
      </div>
      <div class="menu-list">
        ${items.map(item => `
          <article class="menu-card" role="article">
            <a href="detail.html?id=${item.id}" class="menu-card-link" aria-label="Lihat detail ${item.name}">
              <img src="${item.image}" alt="${item.name}" loading="lazy">
              <div class="menu-info">
                <h3>${item.name}</h3>
                <strong>${formatPrice(item.price)}</strong>
                <p>${item.description.substring(0, 60)}...</p>
              </div>
            </a>
            <button
              class="add-menu"
              data-id="${item.id}"
              aria-label="Tambah ${item.name} ke keranjang"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");

  // Quick-add button (adds 1 with defaults, no variant selection)
  container.querySelectorAll(".add-menu").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const product = getProductById(id);
      if (!product) return;

      addToCart({
        productId: product.id,
        name: product.name,
        image: product.image,
        variant: product.variants.length ? product.variants[0].label : "",
        bumbu: product.bumbu.length ? product.bumbu[0] : "",
        additions: [],
        note: "",
        quantity: 1,
        unitPrice: product.price
      });
      showToast(`${product.name} ditambahkan ke keranjang`);
    });
  });
}

/* ═══════════════════════════════════════════════
   CATEGORY FILTER
═══════════════════════════════════════════════ */

function initCategoryFilter() {
  const buttons = document.querySelectorAll(".category-filter .category");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const label = btn.textContent.trim();
      if (label === "Favorit") {
        currentCategory = "favorit";
      } else {
        currentCategory = CATEGORY_MAP[label] || "semua";
      }
      currentSearch = "";
      const searchInput = document.getElementById("menu-search");
      if (searchInput) searchInput.value = "";
      renderMenuSections();
    });
  });
}

/* ═══════════════════════════════════════════════
   SEARCH
═══════════════════════════════════════════════ */

function initSearch() {
  const input = document.getElementById("menu-search");
  if (!input) return;

  input.addEventListener("input", () => {
    currentSearch = input.value.trim();
    if (currentSearch) {
      // Reset category filter visual
      document.querySelectorAll(".category-filter .category").forEach(b => b.classList.remove("active"));
    }
    renderMenuSections();
  });
}

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  initCategoryFilter();
  initSearch();
  renderMenuSections();
});

/**
 * detail.js — Dynamic product detail page
 * Reads ?id=N from URL and renders accordingly
 * Segoro Banyuwangi
 */

let currentProduct = null;
let currentQty = 1;
let selectedAdditions = [];
let selectedVariant = "";
let selectedBumbu = "";

/* ═══════════════════════════════════════════════
   PRICE CALCULATOR
═══════════════════════════════════════════════ */

function calcTotal() {
  if (!currentProduct) return 0;
  const additionsTotal = selectedAdditions.reduce((s, a) => s + a.price, 0);
  return (currentProduct.price + additionsTotal) * currentQty;
}

function updatePriceDisplay() {
  const total = calcTotal();
  const cartBtn = document.querySelector(".add-cart strong");
  if (cartBtn) cartBtn.textContent = formatPrice(total);

  const unitPriceEl = document.querySelector(".price");
  const additionsTotal = selectedAdditions.reduce((s, a) => s + a.price, 0);
  if (unitPriceEl) {
    unitPriceEl.textContent = formatPrice(currentProduct.price + additionsTotal);
  }
}

/* ═══════════════════════════════════════════════
   RENDER PRODUCT
═══════════════════════════════════════════════ */

function renderDetail(product) {
  currentProduct = product;
  selectedVariant = product.variants.length ? product.variants[0].label : "";
  selectedBumbu = product.bumbu.length ? product.bumbu[0] : "";
  selectedAdditions = [];
  currentQty = 1;

  // Title
  document.title = product.name + " — Segoro Banyuwangi";

  // Image
  const imgEl = document.querySelector(".product-image img");
  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.name;
  }

  // Name + price
  const nameEl = document.querySelector(".product-heading h1");
  if (nameEl) nameEl.textContent = product.name;

  const priceEl = document.querySelector(".price");
  if (priceEl) priceEl.textContent = formatPrice(product.price);

  // Badge
  const badgeEl = document.querySelector(".favorite-label");
  if (badgeEl) {
    if (product.badge) {
      badgeEl.style.display = "inline-flex";
      badgeEl.innerHTML = `<i class="fa-solid fa-star"></i> ${product.badge}`;
    } else {
      badgeEl.style.display = "none";
    }
  }

  // Description
  const descEl = document.querySelector(".description");
  if (descEl) descEl.textContent = product.description;

  // Variants section
  const variantSection = document.getElementById("variant-section");
  if (variantSection) {
    if (product.variants.length > 0) {
      variantSection.style.display = "block";
      const select = variantSection.querySelector("select");
      if (select) {
        select.innerHTML = product.variants.map(v =>
          `<option value="${v.value}">${v.label}</option>`
        ).join("");
        select.addEventListener("change", () => {
          selectedVariant = select.options[select.selectedIndex].text;
        });
      }
    } else {
      variantSection.style.display = "none";
    }
  }

  // Bumbu section
  const bumbuSection = document.getElementById("bumbu-section");
  if (bumbuSection) {
    if (product.bumbu.length > 0) {
      bumbuSection.style.display = "block";
      const radioList = bumbuSection.querySelector(".radio-list");
      if (radioList) {
        radioList.innerHTML = product.bumbu.map((b, i) => `
          <label class="radio-option">
            <input type="radio" name="bumbu" value="${b}" ${i === 0 ? "checked" : ""}>
            <span class="custom-radio"></span>
            <span>${b}</span>
          </label>
        `).join("");

        radioList.querySelectorAll("input[name='bumbu']").forEach(radio => {
          radio.addEventListener("change", () => {
            selectedBumbu = radio.value;
          });
        });
      }
    } else {
      bumbuSection.style.display = "none";
    }
  }

  // Additions
  const addSection = document.getElementById("additions-section");
  if (addSection) {
    if (product.additions.length > 0) {
      addSection.style.display = "block";
      const addList = addSection.querySelector(".additional-list");
      if (addList) {
        addList.innerHTML = product.additions
          .filter(a => a.price > 0)
          .map(a => `
            <label class="additional-option">
              <div class="option-left">
                <input type="checkbox" value="${a.name}" data-price="${a.price}">
                <span>${a.name}</span>
              </div>
              <strong>+ ${formatPrice(a.price)}</strong>
            </label>
          `).join("");

        addList.querySelectorAll("input[type=checkbox]").forEach(cb => {
          cb.addEventListener("change", () => {
            const addition = { name: cb.value, price: parseInt(cb.dataset.price) };
            if (cb.checked) {
              selectedAdditions.push(addition);
            } else {
              selectedAdditions = selectedAdditions.filter(a => a.name !== addition.name);
            }
            updatePriceDisplay();
          });
        });
      }
    } else {
      addSection.style.display = "none";
    }
  }

  // Favorite button state
  const favBtn = document.querySelector(".favorite-button");
  if (favBtn) {
    const active = isFavorite(product.id);
    favBtn.classList.toggle("active", active);
    favBtn.innerHTML = active
      ? `<i class="fa-solid fa-heart"></i>`
      : `<i class="fa-regular fa-heart"></i>`;

    favBtn.addEventListener("click", () => {
      const nowFav = toggleFavorite(product.id);
      favBtn.classList.toggle("active", nowFav);
      favBtn.innerHTML = nowFav
        ? `<i class="fa-solid fa-heart"></i>`
        : `<i class="fa-regular fa-heart"></i>`;
    });
  }

  // WhatsApp direct order button
  const waBtn = document.getElementById("detail-wa-btn");
  if (waBtn) {
    waBtn.addEventListener("click", () => {
      const variantSelect = document.querySelector("#variant-section select");
      const variantValue = variantSelect
        ? variantSelect.options[variantSelect.selectedIndex]?.text || ""
        : selectedVariant;
      openWhatsAppSingleProduct(product, variantValue, selectedBumbu, [...selectedAdditions], currentQty);
    });
  }

  // Quantity
  initQuantity();

  // Add to cart
  const addCartBtn = document.querySelector(".add-cart");
  if (addCartBtn) {
    // Set initial price
    const priceStrong = addCartBtn.querySelector("strong");
    if (priceStrong) priceStrong.textContent = formatPrice(product.price);

    addCartBtn.addEventListener("click", () => {
      const variantSelect = document.querySelector("#variant-section select");
      const noteTA = document.querySelector("textarea");
      const variantValue = variantSelect
        ? variantSelect.options[variantSelect.selectedIndex]?.text || ""
        : selectedVariant;

      addToCart({
        productId: product.id,
        name: product.name,
        image: product.image,
        variant: variantValue,
        bumbu: selectedBumbu,
        additions: [...selectedAdditions],
        note: noteTA ? noteTA.value.trim() : "",
        quantity: currentQty,
        unitPrice: product.price + selectedAdditions.reduce((s, a) => s + a.price, 0)
      });

      showToast(`${product.name} ditambahkan ke keranjang`);

      // Animate button
      addCartBtn.classList.add("btn-pulse");
      setTimeout(() => addCartBtn.classList.remove("btn-pulse"), 300);
    });
  }
}

/* ═══════════════════════════════════════════════
   QUANTITY
═══════════════════════════════════════════════ */

function initQuantity() {
  const qtySpan = document.querySelector(".quantity .qty-display");
  const minusBtn = document.querySelector(".quantity button:first-child");
  const plusBtn = document.querySelector(".quantity button:last-child");

  function refreshQty() {
    if (qtySpan) qtySpan.textContent = currentQty;
    const spanEl = document.querySelector(".quantity span");
    if (spanEl) spanEl.textContent = currentQty;
    updatePriceDisplay();
  }

  if (minusBtn) {
    minusBtn.addEventListener("click", () => {
      if (currentQty > 1) {
        currentQty--;
        refreshQty();
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener("click", () => {
      currentQty++;
      refreshQty();
    });
  }
}

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    // Default: show first product
    renderDetail(PRODUCTS[0]);
    return;
  }

  const product = getProductById(id);
  if (!product) {
    document.querySelector(".detail-page").innerHTML = `
      <div style="padding:40px;text-align:center;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size:40px;color:#ffd900;"></i>
        <h2 style="margin:16px 0 8px;">Produk tidak ditemukan</h2>
        <a href="favorit.html" class="btn-primary" style="display:inline-flex;margin-top:16px;">Kembali ke Menu</a>
      </div>`;
    return;
  }

  renderDetail(product);
});

/**
 * checkout.js — Checkout & order confirmation
 * Segoro Banyuwangi
 */

/* ═══════════════════════════════════════════════
   CHECKOUT PAGE
═══════════════════════════════════════════════ */

function renderCheckoutSummary() {
  const container = document.getElementById("checkout-items");
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <span class="checkout-item-qty">${item.quantity}×</span>
      <span class="checkout-item-name">${item.name}${item.variant ? ` (${item.variant})` : ""}</span>
      <span class="checkout-item-price">${formatPrice(item.subtotal)}</span>
    </div>
  `).join("");

  const total = getCartTotal();
  const totalEl = document.getElementById("checkout-grand-total");
  if (totalEl) totalEl.textContent = formatPrice(total);
}

function initCheckoutForm() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  const typeRadios = form.querySelectorAll("input[name='order-type']");
  const tableGroup = document.getElementById("table-number-group");

  // Show/hide table number based on order type
  typeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (tableGroup) {
        tableGroup.style.display = radio.value === "dine-in" ? "block" : "none";
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitCheckout(form);
  });
}

function submitCheckout(form) {
  const name = form.querySelector("#customer-name").value.trim();
  const phone = form.querySelector("#customer-phone").value.trim();
  const orderType = form.querySelector("input[name='order-type']:checked")?.value || "dine-in";
  const tableNo = form.querySelector("#table-number")?.value.trim() || "";
  const note = form.querySelector("#checkout-note")?.value.trim() || "";

  // Validation
  if (!name) {
    showToast("Nama tidak boleh kosong", "error");
    form.querySelector("#customer-name").focus();
    return;
  }
  if (!phone || !/^(\+62|62|0)\d{8,12}$/.test(phone.replace(/\s/g, ""))) {
    showToast("Nomor WhatsApp tidak valid", "error");
    form.querySelector("#customer-phone").focus();
    return;
  }
  if (orderType === "dine-in" && !tableNo) {
    showToast("Nomor meja wajib diisi untuk Dine-in", "error");
    form.querySelector("#table-number").focus();
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    showToast("Keranjang kosong", "error");
    return;
  }

  // Build order
  const orderNumber = generateOrderNumber();
  const order = {
    orderNumber,
    customerName: name,
    customerPhone: phone,
    orderType,
    tableNumber: tableNo,
    note,
    items: cart,
    total: getCartTotal(),
    timestamp: new Date().toISOString(),
    status: "pending"
  };

  // Save to localStorage
  const orders = JSON.parse(localStorage.getItem("segoro_orders") || "[]");
  orders.push(order);
  localStorage.setItem("segoro_orders", JSON.stringify(orders));
  localStorage.setItem("segoro_last_order", JSON.stringify(order));

  // Clear cart
  clearCart();

  // Redirect to confirmation
  window.location.href = "confirmation.html";
}

function generateOrderNumber() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const seq = String(Math.floor(Math.random() * 900) + 100);
  return `SGR-${date}-${seq}`;
}

/* ═══════════════════════════════════════════════
   CONFIRMATION PAGE
═══════════════════════════════════════════════ */

function renderConfirmation() {
  const order = JSON.parse(localStorage.getItem("segoro_last_order") || "null");
  if (!order) {
    window.location.href = "index.html";
    return;
  }

  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setEl("confirm-order-number", order.orderNumber);
  setEl("confirm-name", order.customerName);
  setEl("confirm-type", order.orderType === "dine-in" ? `Dine-in${order.tableNumber ? " — Meja " + order.tableNumber : ""}` : "Takeaway");
  setEl("confirm-total", formatPrice(order.total));
  setEl("confirm-time", new Date(order.timestamp).toLocaleString("id-ID", {
    dateStyle: "long", timeStyle: "short"
  }));

  const itemsEl = document.getElementById("confirm-items");
  if (itemsEl) {
    itemsEl.innerHTML = order.items.map(item => `
      <div class="confirm-item">
        <span>${item.quantity}× ${item.name}${item.variant ? ` (${item.variant})` : ""}</span>
        <span>${formatPrice(item.subtotal)}</span>
      </div>
    `).join("");
  }
}

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop();
  if (page === "checkout.html") {
    renderCheckoutSummary();
    initCheckoutForm();
  } else if (page === "confirmation.html") {
    renderConfirmation();
  }
});

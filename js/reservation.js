/**
 * reservation.js — Reservation form & confirmation
 * Segoro Banyuwangi
 */

function initReservationForm() {
  const form = document.getElementById("reservation-form");
  if (!form) return;

  // Set min date to today
  const dateInput = form.querySelector("#res-date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitReservation(form);
  });
}

function submitReservation(form) {
  const name = form.querySelector("#res-name").value.trim();
  const phone = form.querySelector("#res-phone").value.trim();
  const date = form.querySelector("#res-date").value;
  const time = form.querySelector("#res-time").value;
  const guests = parseInt(form.querySelector("#res-guests").value) || 0;
  const note = form.querySelector("#res-note")?.value.trim() || "";

  // Validation
  if (!name) {
    showToast("Nama tidak boleh kosong", "error");
    form.querySelector("#res-name").focus();
    return;
  }
  if (!phone || !/^(\+62|62|0)\d{8,12}$/.test(phone.replace(/\s/g, ""))) {
    showToast("Nomor WhatsApp tidak valid", "error");
    form.querySelector("#res-phone").focus();
    return;
  }
  if (!date) {
    showToast("Tanggal reservasi wajib diisi", "error");
    form.querySelector("#res-date").focus();
    return;
  }
  if (!time) {
    showToast("Waktu reservasi wajib diisi", "error");
    form.querySelector("#res-time").focus();
    return;
  }
  if (guests < 1) {
    showToast("Jumlah orang minimal 1", "error");
    form.querySelector("#res-guests").focus();
    return;
  }

  const reservation = {
    id: "RES-" + Date.now(),
    customerName: name,
    customerPhone: phone,
    date,
    time,
    guests,
    note,
    timestamp: new Date().toISOString(),
    status: "confirmed"
  };

  // Save
  const reservations = JSON.parse(localStorage.getItem("segoro_reservations") || "[]");
  reservations.push(reservation);
  localStorage.setItem("segoro_reservations", JSON.stringify(reservations));
  localStorage.setItem("segoro_last_reservation", JSON.stringify(reservation));

  // Redirect
  window.location.href = "confirmation.html?type=reservation";
}

function renderReservationConfirmation() {
  const res = JSON.parse(localStorage.getItem("segoro_last_reservation") || "null");
  if (!res) {
    window.location.href = "index.html";
    return;
  }

  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setEl("confirm-res-id", res.id);
  setEl("confirm-res-name", res.customerName);
  setEl("confirm-res-phone", res.customerPhone);
  setEl("confirm-res-date", new Date(res.date).toLocaleDateString("id-ID", { dateStyle: "long" }));
  setEl("confirm-res-time", res.time);
  setEl("confirm-res-guests", res.guests + " orang");
  if (res.note) {
    setEl("confirm-res-note", res.note);
  }
}

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  initReservationForm();
});

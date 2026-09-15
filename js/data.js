/**
 * data.js — Sumber data produk terpusat
 * Segoro Banyuwangi
 */

const PRODUCTS = [
  /* ── PAKET IKAN BAKAR ─────────────────────────────────── */
  {
    id: 1,
    name: "Paket Hemat",
    category: "paket",
    price: 35000,
    image: "assets/heroikan.jpe",
    description: "Paket hemat ikan bakar lengkap dengan nasi putih dan lalapan, cocok untuk makan siang atau malam.",
    variants: [
      { label: "Ikan Kembung", value: "kembung" },
      { label: "Ikan Kakap", value: "kakap" },
      { label: "Ikan Bandeng", value: "bandeng" },
      { label: "Ikan Laut Segar", value: "laut" }
    ],
    bumbu: ["Bumbu Merah", "Bumbu Kuning", "Bumbu Kecap"],
    additions: [
      { name: "Nasi Putih", price: 5000 },
      { name: "Pete", price: 6000 },
      { name: "Extra Lalapan", price: 3000 },
      { name: "Extra Sambal", price: 2000 }
    ],
    badge: "Favorit"
  },
  {
    id: 2,
    name: "Paket Personal",
    category: "paket",
    price: 38000,
    image: "assets/heroikan.jpe",
    description: "Paket personal ikan bakar porsi pas untuk satu orang, disajikan dengan nasi dan lalapan.",
    variants: [
      { label: "Ikan Kembung", value: "kembung" },
      { label: "Ikan Kakap", value: "kakap" },
      { label: "Ikan Bandeng", value: "bandeng" },
      { label: "Ikan Laut Segar", value: "laut" }
    ],
    bumbu: ["Bumbu Merah", "Bumbu Kuning", "Bumbu Kecap"],
    additions: [
      { name: "Nasi Putih", price: 5000 },
      { name: "Pete", price: 6000 },
      { name: "Extra Lalapan", price: 3000 },
      { name: "Extra Sambal", price: 2000 }
    ],
    badge: null
  },
  {
    id: 3,
    name: "Paket Seru Berdua",
    category: "paket",
    price: 65000,
    image: "assets/heroikan.jpe",
    description: "Paket untuk dua orang, lengkap dengan dua porsi ikan, nasi, lalapan, dan sambal.",
    variants: [
      { label: "Ikan Kembung", value: "kembung" },
      { label: "Ikan Kakap", value: "kakap" },
      { label: "Ikan Bandeng", value: "bandeng" },
      { label: "Ikan Laut Segar", value: "laut" }
    ],
    bumbu: ["Bumbu Merah", "Bumbu Kuning", "Bumbu Kecap"],
    additions: [
      { name: "Pete", price: 6000 },
      { name: "Extra Lalapan", price: 3000 },
      { name: "Extra Sambal", price: 2000 }
    ],
    badge: null
  },
  {
    id: 4,
    name: "Paket Rame 1",
    category: "paket",
    price: 120000,
    image: "assets/heroikan.jpe",
    description: "Paket ramai-ramai untuk 3-4 orang, cocok untuk makan bersama keluarga.",
    variants: [
      { label: "Ikan Kembung", value: "kembung" },
      { label: "Ikan Kakap", value: "kakap" },
      { label: "Ikan Bandeng", value: "bandeng" },
      { label: "Ikan Laut Segar", value: "laut" }
    ],
    bumbu: ["Bumbu Merah", "Bumbu Kuning", "Bumbu Kecap"],
    additions: [
      { name: "Pete", price: 6000 },
      { name: "Extra Lalapan", price: 3000 },
      { name: "Extra Sambal", price: 2000 }
    ],
    badge: null
  },
  {
    id: 5,
    name: "Paket Rame 2",
    category: "paket",
    price: 150000,
    image: "assets/heroikan.jpe",
    description: "Paket super ramai untuk 5-6 orang, sajian lengkap untuk acara bersama.",
    variants: [
      { label: "Ikan Kembung", value: "kembung" },
      { label: "Ikan Kakap", value: "kakap" },
      { label: "Ikan Bandeng", value: "bandeng" },
      { label: "Ikan Laut Segar", value: "laut" }
    ],
    bumbu: ["Bumbu Merah", "Bumbu Kuning", "Bumbu Kecap"],
    additions: [
      { name: "Pete", price: 6000 },
      { name: "Extra Lalapan", price: 3000 },
      { name: "Extra Sambal", price: 2000 }
    ],
    badge: null
  },
  {
    id: 6,
    name: "Paket Gruduk",
    category: "paket",
    price: 200000,
    image: "assets/heroikan.jpe",
    description: "Paket Gruduk untuk 7-10 orang, pilihan terbaik untuk pesta atau arisan keluarga besar.",
    variants: [
      { label: "Ikan Kembung", value: "kembung" },
      { label: "Ikan Kakap", value: "kakap" },
      { label: "Ikan Bandeng", value: "bandeng" },
      { label: "Ikan Laut Segar", value: "laut" }
    ],
    bumbu: ["Bumbu Merah", "Bumbu Kuning", "Bumbu Kecap"],
    additions: [
      { name: "Pete", price: 6000 },
      { name: "Extra Lalapan", price: 3000 },
      { name: "Extra Sambal", price: 2000 }
    ],
    badge: "Best Seller"
  },

  /* ── GORENG / BAKAR ───────────────────────────────────── */
  {
    id: 7,
    name: "Bebek Goreng / Bakar",
    category: "goreng-bakar",
    price: 35000,
    image: "assets/heroikan.jpe",
    description: "Bebek pilihan digoreng atau dibakar dengan bumbu khas Segoro yang meresap sempurna.",
    variants: [
      { label: "Goreng", value: "goreng" },
      { label: "Bakar", value: "bakar" }
    ],
    bumbu: ["Bumbu Merah", "Bumbu Kuning", "Bumbu Kecap"],
    additions: [
      { name: "Nasi Putih", price: 5000 },
      { name: "Pete", price: 6000 },
      { name: "Extra Lalapan", price: 3000 },
      { name: "Extra Sambal", price: 2000 }
    ],
    badge: null
  },
  {
    id: 8,
    name: "Ayam Kampung Goreng / Bakar",
    category: "goreng-bakar",
    price: 35000,
    image: "assets/heroikan.jpe",
    description: "Ayam kampung empuk dengan bumbu meresap, pilihan sempurna untuk selera tradisional.",
    variants: [
      { label: "Goreng", value: "goreng" },
      { label: "Bakar", value: "bakar" }
    ],
    bumbu: ["Bumbu Merah", "Bumbu Kuning", "Bumbu Kecap"],
    additions: [
      { name: "Nasi Putih", price: 5000 },
      { name: "Pete", price: 6000 },
      { name: "Extra Lalapan", price: 3000 },
      { name: "Extra Sambal", price: 2000 }
    ],
    badge: "Favorit"
  },
  {
    id: 9,
    name: "Ayam Goreng / Bakar",
    category: "goreng-bakar",
    price: 30000,
    image: "assets/heroikan.jpe",
    description: "Ayam segar dengan bumbu tradisional pilihan, digoreng atau dibakar sesuai selera.",
    variants: [
      { label: "Goreng", value: "goreng" },
      { label: "Bakar", value: "bakar" }
    ],
    bumbu: ["Bumbu Merah", "Bumbu Kuning", "Bumbu Kecap"],
    additions: [
      { name: "Nasi Putih", price: 5000 },
      { name: "Pete", price: 6000 },
      { name: "Extra Lalapan", price: 3000 },
      { name: "Extra Sambal", price: 2000 }
    ],
    badge: null
  },
  {
    id: 10,
    name: "Ikan Goreng / Bakar",
    category: "goreng-bakar",
    price: 35000,
    image: "assets/heroikan.jpe",
    description: "Ikan segar pilihan, dibakar atau digoreng dengan bumbu khas Segoro Banyuwangi.",
    variants: [
      { label: "Ikan Kembung", value: "kembung" },
      { label: "Ikan Kakap", value: "kakap" },
      { label: "Ikan Bandeng", value: "bandeng" },
      { label: "Ikan Laut Segar", value: "laut" }
    ],
    bumbu: ["Bumbu Merah", "Bumbu Kuning", "Bumbu Kecap"],
    additions: [
      { name: "Nasi Putih", price: 5000 },
      { name: "Pete", price: 6000 },
      { name: "Extra Lalapan", price: 3000 },
      { name: "Extra Sambal", price: 2000 }
    ],
    badge: null
  },

  /* ── SEAFOOD ──────────────────────────────────────────── */
  {
    id: 11,
    name: "Udang Bakar",
    category: "seafood",
    price: 35000,
    image: "assets/udang.jpe",
    description: "Udang segar pilihan dibakar dengan bumbu khas Segoro yang gurih dan lezat.",
    variants: [],
    bumbu: ["Bumbu Merah", "Bumbu Kuning", "Bumbu Kecap"],
    additions: [
      { name: "Nasi Putih", price: 5000 },
      { name: "Pete", price: 6000 },
      { name: "Extra Sambal", price: 2000 }
    ],
    badge: "Favorit"
  },
  {
    id: 12,
    name: "Udang Saos Ndeso",
    category: "seafood",
    price: 38000,
    image: "assets/udang.jpe",
    description: "Udang dengan saos ndeso pedas manis khas Banyuwangi, menggugah selera.",
    variants: [],
    bumbu: [],
    additions: [
      { name: "Nasi Putih", price: 5000 },
      { name: "Pete", price: 6000 }
    ],
    badge: null
  },
  {
    id: 13,
    name: "Cumi Bakar",
    category: "seafood",
    price: 35000,
    image: "assets/heroikan.jpe",
    description: "Cumi segar dibakar dengan bumbu spesial Segoro, lembut dan penuh rasa.",
    variants: [],
    bumbu: ["Bumbu Merah", "Bumbu Kuning", "Bumbu Kecap"],
    additions: [
      { name: "Nasi Putih", price: 5000 },
      { name: "Pete", price: 6000 },
      { name: "Extra Sambal", price: 2000 }
    ],
    badge: null
  },
  {
    id: 14,
    name: "Cumi Bakar Saos Ndeso",
    category: "seafood",
    price: 38000,
    image: "assets/heroikan.jpe",
    description: "Cumi bakar dengan saos ndeso pedas manis khas Banyuwangi yang kaya rempah.",
    variants: [],
    bumbu: [],
    additions: [
      { name: "Nasi Putih", price: 5000 },
      { name: "Pete", price: 6000 }
    ],
    badge: null
  },

  /* ── CAH SAYUR ────────────────────────────────────────── */
  {
    id: 15,
    name: "Cah Kangkung",
    category: "sayuran",
    price: 12000,
    image: "assets/kangkung.jpe",
    description: "Kangkung segar ditumis dengan bumbu bawang putih dan cabai pilihan.",
    variants: [],
    bumbu: [],
    additions: [
      { name: "Extra Pedas", price: 0 }
    ],
    badge: null
  },
  {
    id: 16,
    name: "Cah Tauge",
    category: "sayuran",
    price: 10000,
    image: "assets/kangkung.jpe",
    description: "Tauge segar ditumis dengan bumbu khas, renyah dan lezat.",
    variants: [],
    bumbu: [],
    additions: [],
    badge: null
  },
  {
    id: 17,
    name: "Nasi Putih",
    category: "sayuran",
    price: 5000,
    image: "assets/heroikan.jpe",
    description: "Nasi putih pulen, pelengkap sempurna untuk setiap menu.",
    variants: [],
    bumbu: [],
    additions: [],
    badge: null
  },
  {
    id: 18,
    name: "Pete",
    category: "sayuran",
    price: 6000,
    image: "assets/heroikan.jpe",
    description: "Pete segar, cocok sebagai pelengkap bakaran.",
    variants: [],
    bumbu: [],
    additions: [],
    badge: null
  },

  /* ── MINUMAN ──────────────────────────────────────────── */
  {
    id: 19,
    name: "Es Teh Manis",
    category: "minuman",
    price: 5000,
    image: "assets/minuman.jpe",
    description: "Teh manis segar dengan es batu, minuman klasik paling menyegarkan.",
    variants: [
      { label: "Es (Dingin)", value: "es" },
      { label: "Hangat", value: "hangat" }
    ],
    bumbu: [],
    additions: [],
    badge: null
  },
  {
    id: 20,
    name: "Es Jeruk",
    category: "minuman",
    price: 6000,
    image: "assets/minuman.jpe",
    description: "Jeruk segar diperas langsung, menyegarkan dan kaya vitamin C.",
    variants: [
      { label: "Es (Dingin)", value: "es" },
      { label: "Hangat", value: "hangat" }
    ],
    bumbu: [],
    additions: [],
    badge: null
  },
  {
    id: 21,
    name: "Es Kelapa Muda",
    category: "minuman",
    price: 12000,
    image: "assets/minuman.jpe",
    description: "Kelapa muda segar langsung dari pohon, cocok menemani bakaran.",
    variants: [],
    bumbu: [],
    additions: [],
    badge: "Segar"
  },
  {
    id: 22,
    name: "Milk Shake Coklat",
    category: "minuman",
    price: 15000,
    image: "assets/minuman.jpe",
    description: "Milk shake coklat creamy dengan susu segar, manis dan lembut.",
    variants: [
      { label: "Coklat", value: "coklat" },
      { label: "Vanila", value: "vanila" },
      { label: "Stroberi", value: "stroberi" }
    ],
    bumbu: [],
    additions: [],
    badge: null
  },
  {
    id: 23,
    name: "Juice Alpukat",
    category: "minuman",
    price: 13000,
    image: "assets/minuman.jpe",
    description: "Jus alpukat segar dicampur susu dan sedikit gula, creamy dan mengenyangkan.",
    variants: [
      { label: "Alpukat", value: "alpukat" },
      { label: "Mangga", value: "mangga" },
      { label: "Jambu", value: "jambu" },
      { label: "Sirsak", value: "sirsak" }
    ],
    bumbu: [],
    additions: [],
    badge: null
  },
  {
    id: 24,
    name: "Squash Lemon",
    category: "minuman",
    price: 10000,
    image: "assets/minuman.jpe",
    description: "Minuman squash lemon segar dengan soda, asam manis menyegarkan.",
    variants: [
      { label: "Lemon", value: "lemon" },
      { label: "Jeruk", value: "jeruk" },
      { label: "Nanas", value: "nanas" }
    ],
    bumbu: [],
    additions: [],
    badge: null
  },
  {
    id: 25,
    name: "Rempah Dingin",
    category: "minuman",
    price: 8000,
    image: "assets/minuman.jpe",
    description: "Minuman rempah khas Banyuwangi yang menyegarkan dan menyehatkan.",
    variants: [
      { label: "Jahe", value: "jahe" },
      { label: "Kunyit Asam", value: "kunyit" },
      { label: "Beras Kencur", value: "beras-kencur" }
    ],
    bumbu: [],
    additions: [],
    badge: null
  }
];

/* ── Helper functions ─────────────────────────────────────── */

function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id)) || null;
}

function getProductsByCategory(category) {
  if (!category || category === "semua") return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return PRODUCTS;
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
}

function formatPrice(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

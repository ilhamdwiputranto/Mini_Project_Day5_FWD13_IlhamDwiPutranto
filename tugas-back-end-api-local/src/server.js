const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Somethinc Niacinamide Moisture Serum",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500",
    variants: {
      colorOrSize: ["20ml", "50ml"],
      quantity: 150
    },
    description: "High-concentration Niacinamide facial serum to brighten skin, fade dark spots, and strengthen the skin barrier.",
    title: "[Local API] Somethinc Niacinamide Moisture Serum",
    category: "skincare",
    discountPercentage: 10.0,
    rating: 4.85,
    stock: 150,
    tags: ["skincare", "serum", "brightening"],
    brand: "Somethinc",
    sku: "SKN-SOM-SER-001",
    weight: 4,
    dimensions: { width: 4.5, height: 12.0, depth: 4.5 },
    warrantyInformation: "Damaged on arrival warranty",
    shippingInformation: "Ships in 1-2 business days",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Great for reducing redness!",
        date: "2026-03-15T08:30:00.000Z",
        reviewerName: "Budi Santoso",
        reviewerEmail: "budi.santoso@example.com"
      },
      {
        rating: 4,
        comment: "Absorbs quickly and non-sticky.",
        date: "2026-04-01T10:15:00.000Z",
        reviewerName: "Siti Rahma",
        reviewerEmail: "siti.rahma@example.com"
      }
    ],
    returnPolicy: "7 days return if seal is unbroken",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2026-01-10T09:00:00.000Z",
      updatedAt: "2026-09-15T14:20:00.000Z",
      barcode: "8991234567891",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=SKN-SOM-SER-001"
    },
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200"
  },
  {
    id: 2,
    name: "Ventela Public Low Black Natural",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    variants: {
      colorOrSize: ["38", "39", "40", "41", "42", "43"],
      quantity: 80
    },
    description: "Unisex canvas sneakers with high-grade materials and soft insoles, perfect for daily wear.",
    title: "[Local API] Ventela Public Low Black Natural",
    category: "footwear",
    discountPercentage: 5.0,
    rating: 4.75,
    stock: 80,
    tags: ["shoes", "sneakers", "streetwear"],
    brand: "Ventela",
    sku: "FTW-VEN-PUB-002",
    weight: 30,
    dimensions: { width: 20.0, height: 12.0, depth: 32.0 },
    warrantyInformation: "3-day size exchange warranty",
    shippingInformation: "Ships in 1-3 business days",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Very comfy to wear all day long!",
        date: "2026-02-20T14:10:00.000Z",
        reviewerName: "Rian Hidayat",
        reviewerEmail: "rian.hidayat@example.com"
      }
    ],
    returnPolicy: "Size exchange allowed within 3 days",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2026-01-12T10:30:00.000Z",
      updatedAt: "2026-08-10T11:00:00.000Z",
      barcode: "8991234567892",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=FTW-VEN-PUB-002"
    },
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200"
  },
  {
    id: 3,
    name: "Arabica Gayo Single Origin Coffee 250g",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500",
    variants: {
      colorOrSize: ["Whole Bean", "Coarse Grind", "Fine Grind"],
      quantity: 200
    },
    description: "Premium Arabica coffee beans from Gayo Highlands. Features floral aroma with balanced acidity and fruity notes.",
    title: "[Local API] Arabica Gayo Single Origin Coffee 250g",
    category: "groceries",
    discountPercentage: 0.0,
    rating: 4.90,
    stock: 200,
    tags: ["coffee", "arabica", "gayo", "beverage"],
    brand: "Nusantara Coffee",
    sku: "FNB-NUS-GAY-003",
    weight: 9,
    dimensions: { width: 10.0, height: 20.0, depth: 6.0 },
    warrantyInformation: "Roast freshness guarantee (Max 2 weeks)",
    shippingInformation: "Ships in 1 business day",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Amazing floral notes when brewed with V60.",
        date: "2026-05-10T07:45:00.000Z",
        reviewerName: "Dedi Prasetyo",
        reviewerEmail: "dedi.p@example.com"
      }
    ],
    returnPolicy: "Non-refundable if packaging is opened",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2026-02-01T08:00:00.000Z",
      updatedAt: "2026-09-30T16:00:00.000Z",
      barcode: "8991234567893",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=FNB-NUS-GAY-003"
    },
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200"
  },
  {
    id: 4,
    name: "[Local API] HMNS Perfume - Orgasm Eau De Parfum 100ml",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500",
    variants: {
      colorOrSize: ["100ml"],
      quantity: 45
    },
    description: "Artisanal Eau De Parfum featuring notes of red apple, floral accords, and a warm vanilla amber finish.",
    title: "[Local API] HMNS Perfume - Orgasm Eau De Parfum 100ml",
    category: "fragrance",
    discountPercentage: 8.0,
    rating: 4.88,
    stock: 45,
    tags: ["perfume", "fragrance", "edp"],
    brand: "HMNS",
    sku: "FRG-HMN-ORG-004",
    weight: 12,
    dimensions: { width: 8.0, height: 14.0, depth: 6.0 },
    warrantyInformation: "Broken-in-transit replacement warranty",
    shippingInformation: "Ships in 1-2 business days",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Smells divine and lasts over 6 hours!",
        date: "2026-04-18T11:20:00.000Z",
        reviewerName: "Nadia Putri",
        reviewerEmail: "nadia.putri@example.com"
      }
    ],
    returnPolicy: "Return allowed if bottle is damaged/leaking on delivery",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2026-02-15T12:00:00.000Z",
      updatedAt: "2026-09-01T09:30:00.000Z",
      barcode: "8991234567894",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=FRG-HMN-ORG-004"
    },
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200"
  },
  {
    id: 5,
    name: "Cargloss Retro Full Face Helmet - Matte Black",
    price: 22.50,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500",
    variants: {
      colorOrSize: ["M", "L", "XL"],
      quantity: 25
    },
    description: "Classic retro style full-face motorcycle helmet made from impact-resistant ABS with comfy interior padding.",
    title: "[Local API] Cargloss Retro Full Face Helmet - Matte Black",
    category: "automotive",
    discountPercentage: 12.0,
    rating: 4.65,
    stock: 25,
    tags: ["helmet", "automotive", "retro"],
    brand: "Cargloss",
    sku: "AUT-CAR-RET-005",
    weight: 48,
    dimensions: { width: 28.0, height: 26.0, depth: 35.0 },
    warrantyInformation: "1 month buckle and shell warranty",
    shippingInformation: "Ships in 2-3 business days",
    availabilityStatus: "Low Stock",
    reviews: [
      {
        rating: 4,
        comment: "Thick foam padding and smooth matte finish.",
        date: "2026-06-05T13:40:00.000Z",
        reviewerName: "Eko Wijaya",
        reviewerEmail: "eko.w@example.com"
      }
    ],
    returnPolicy: "Size exchange accepted (buyer pays shipping)",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2026-03-01T14:00:00.000Z",
      updatedAt: "2026-10-02T10:00:00.000Z",
      barcode: "8991234567895",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=AUT-CAR-RET-005"
    },
    images: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500"
    ],
    thumbnail: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=200"
  }
];

// Endpoint GET All Products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Endpoint GET Product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server API lokal berjalan di http://localhost:${PORT}`);
});
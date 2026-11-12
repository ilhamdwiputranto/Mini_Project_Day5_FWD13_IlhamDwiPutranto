const initDB = require("../config/database");
const fs = require("fs");
const path = require("path");

const initialProducts = [
  {
    id: 1,
    name: "Somethinc Niacinamide Moisture Serum",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500",
    variants: { colorOrSize: ["20ml", "50ml"], quantity: 150 },
    description: "High-concentration Niacinamide facial serum to brighten skin, fade dark spots, and strengthen the skin barrier.",
    title: "[Local SQL] Somethinc Niacinamide Moisture Serum",
    category: "skincare",
    discountPercentage: 10.0,
    rating: 4.8,
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
        reviewerEmail: "budi.santoso@example.com",
      },
      {
        rating: 4,
        comment: "Absorbs quickly and non-sticky.",
        date: "2026-04-01T10:15:00.000Z",
        reviewerName: "Siti Rahma",
        reviewerEmail: "siti.rahma@example.com",
      },
    ],
    returnPolicy: "7 days return if seal is unbroken",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2026-01-10T09:00:00.000Z",
      updatedAt: "2026-09-15T14:20:00.000Z",
      barcode: "8991234567891",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=SKN-SOM-SER-001",
    },
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500"],
    thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200",
  },
  {
    id: 2,
    name: "Ventela Public Low Black Natural",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    variants: { colorOrSize: ["38", "39", "40", "41", "42", "43"], quantity: 80 },
    description: "Unisex canvas sneakers with high-grade materials and soft insoles, perfect for daily wear.",
    title: "[Local SQL] Ventela Public Low Black Natural",
    category: "footwear",
    discountPercentage: 5.0,
    rating: 4.7,
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
        reviewerEmail: "rian.hidayat@example.com",
      },
    ],
    returnPolicy: "Size exchange allowed within 3 days",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2026-01-12T10:30:00.000Z",
      updatedAt: "2026-08-10T11:00:00.000Z",
      barcode: "8991234567892",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=FTW-VEN-PUB-002",
    },
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"],
    thumbnail: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200",
  },
];

async function seed() {
  const db = await initDB();

  console.log("Membuat tabel dari schema.sql...");
  const schemaPath = path.join(__dirname, "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");
  await db.exec(schemaSql);

  console.log("Menghapus data lama...");
  await db.run("DELETE FROM products");

  console.log("Mengisi data lengkap produk...");
  for (const item of initialProducts) {
    await db.run(
      `INSERT INTO products (
        id, name, price, image, variants, description, title, category,
        discountPercentage, rating, stock, tags, brand, sku, weight,
        dimensions, warrantyInformation, shippingInformation, availabilityStatus,
        reviews, returnPolicy, minimumOrderQuantity, meta, images, thumbnail
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.id,
        item.name,
        item.price,
        item.image,
        JSON.stringify(item.variants),
        item.description,
        item.title,
        item.category,
        item.discountPercentage,
        item.rating,
        item.stock,
        JSON.stringify(item.tags),
        item.brand,
        item.sku,
        item.weight,
        JSON.stringify(item.dimensions),
        item.warrantyInformation,
        item.shippingInformation,
        item.availabilityStatus,
        JSON.stringify(item.reviews),
        item.returnPolicy,
        item.minimumOrderQuantity,
        JSON.stringify(item.meta),
        JSON.stringify(item.images),
        item.thumbnail,
      ],
    );
  }

  console.log("Seeding data selesai dengan sukses!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding gagal:", err);
  process.exit(1);
});

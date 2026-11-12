const express = require('express');
const cors = require('cors');
const path = require('path');
const initDB = require('../config/database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

let db;

// Fungsi helper untuk mengubah kolom TEXT bertipe JSON kembali menjadi Objek / Array
function formatProduct(p) {
  if (!p) return null;
  return {
    ...p,
    variants: p.variants ? JSON.parse(p.variants) : null,
    tags: p.tags ? JSON.parse(p.tags) : [],
    dimensions: p.dimensions ? JSON.parse(p.dimensions) : null,
    reviews: p.reviews ? JSON.parse(p.reviews) : [],
    meta: p.meta ? JSON.parse(p.meta) : null,
    images: p.images ? JSON.parse(p.images) : []
  };
}

initDB().then((database) => {
  db = database;
  console.log('Database SQLite terhubung dan siap digunakan.');

  // Endpoint GET All Products dari Database
  app.get('/api/products', async (req, res) => {
    try {
      const rows = await db.all('SELECT * FROM products');
      const products = rows.map(formatProduct);
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Endpoint GET Product by ID dari Database
  app.get('/api/products/:id', async (req, res) => {
    try {
      const row = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id]);
      if (!row) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(formatProduct(row));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ==================== CREATE (POST 1 ATAU BANYAK PRODUK) ====================
app.post('/api/products', async (req, res) => {
  try {
    // Cek apakah data yang dikirim berupa Array (banyak) atau Objek (satu)
    const items = Array.isArray(req.body) ? req.body : [req.body];
    const insertedIds = [];

    for (const item of items) {
      const {
        name, price, image, variants, description, title, category,
        discountPercentage, rating, stock, tags, brand, sku, weight,
        dimensions, warrantyInformation, shippingInformation,
        availabilityStatus, reviews, returnPolicy, minimumOrderQuantity,
        meta, images, thumbnail
      } = item;

      const result = await db.run(
        `INSERT INTO products (
          name, price, image, variants, description, title, category,
          discountPercentage, rating, stock, tags, brand, sku, weight,
          dimensions, warrantyInformation, shippingInformation,
          availabilityStatus, reviews, returnPolicy, minimumOrderQuantity,
          meta, images, thumbnail
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name, price, image,
          JSON.stringify(variants || null),
          description, title, category,
          discountPercentage, rating, stock,
          JSON.stringify(tags || []),
          brand, sku, weight,
          JSON.stringify(dimensions || null),
          warrantyInformation, shippingInformation, availabilityStatus,
          JSON.stringify(reviews || []),
          returnPolicy, minimumOrderQuantity,
          JSON.stringify(meta || null),
          JSON.stringify(images || []),
          thumbnail
        ]
      );

      insertedIds.push(result.lastID);
    }

    res.status(201).json({
      message: `${insertedIds.length} produk berhasil ditambahkan`,
      productIds: insertedIds
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== UPDATE (PUT) ====================
  app.put('/api/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name, price, image, variants, description, title, category,
        discountPercentage, rating, stock, tags, brand, sku, weight,
        dimensions, warrantyInformation, shippingInformation,
        availabilityStatus, reviews, returnPolicy, minimumOrderQuantity,
        meta, images, thumbnail
      } = req.body;

      // Ambil data produk lama terlebih dahulu
      const existing = await db.get('SELECT * FROM products WHERE id = ?', [id]);
      if (!existing) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
      }

      // Helper untuk stringify objek/array JSON secara aman
      const safeJson = (val, defaultVal) => {
        if (val === undefined) return defaultVal;
        if (typeof val === 'object' && val !== null) return JSON.stringify(val);
        return val;
      };

      const updatedName = name ?? existing.name;
      const updatedPrice = price ?? existing.price;
      const updatedImage = image ?? existing.image;
      const updatedVariants = safeJson(variants, existing.variants);
      const updatedDescription = description ?? existing.description;
      const updatedTitle = title ?? existing.title;
      const updatedCategory = category ?? existing.category;
      const updatedDiscountPercentage = discountPercentage ?? existing.discountPercentage;
      const updatedRating = rating ?? existing.rating;
      const updatedStock = stock ?? existing.stock;
      const updatedTags = safeJson(tags, existing.tags);
      const updatedBrand = brand ?? existing.brand;
      const updatedSku = sku ?? existing.sku;
      const updatedWeight = weight ?? existing.weight;
      const updatedDimensions = safeJson(dimensions, existing.dimensions);
      const updatedWarranty = warrantyInformation ?? existing.warrantyInformation;
      const updatedShipping = shippingInformation ?? existing.shippingInformation;
      const updatedAvailability = availabilityStatus ?? existing.availabilityStatus;
      const updatedReviews = safeJson(reviews, existing.reviews);
      const updatedReturnPolicy = returnPolicy ?? existing.returnPolicy;
      const updatedMinOrder = minimumOrderQuantity ?? existing.minimumOrderQuantity;
      const updatedMeta = safeJson(meta, existing.meta);
      const updatedImages = safeJson(images, existing.images);
      const updatedThumbnail = thumbnail ?? existing.thumbnail;

      await db.run(
        `UPDATE products SET 
          name = ?, price = ?, image = ?, variants = ?, description = ?, title = ?, category = ?,
          discountPercentage = ?, rating = ?, stock = ?, tags = ?, brand = ?, sku = ?, weight = ?,
          dimensions = ?, warrantyInformation = ?, shippingInformation = ?, availabilityStatus = ?,
          reviews = ?, returnPolicy = ?, minimumOrderQuantity = ?, meta = ?, images = ?, thumbnail = ?
        WHERE id = ?`,
        [
          updatedName, updatedPrice, updatedImage, updatedVariants, updatedDescription, updatedTitle, updatedCategory,
          updatedDiscountPercentage, updatedRating, updatedStock, updatedTags, updatedBrand, updatedSku, updatedWeight,
          updatedDimensions, updatedWarranty, updatedShipping, updatedAvailability,
          updatedReviews, updatedReturnPolicy, updatedMinOrder, updatedMeta, updatedImages, updatedThumbnail,
          id
        ]
      );

      res.json({ message: "Produk berhasil diperbarui" });
    } catch (err) {
      console.error("Error PUT product:", err);
      res.status(500).json({ error: err.message });
    }
  }); 

  // ==================== DELETE (DELETE) ====================
  app.delete('/api/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.run('DELETE FROM products WHERE id = ?', [id]);

      if (result.changes === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });
      res.json({ message: "Produk berhasil dihapus" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  
  app.listen(PORT, () => {
    console.log(`Server API lokal berjalan di http://localhost:${PORT}`);
  });

}).catch((err) => {
  console.error('Gagal terhubung ke database:', err);
});
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT,
  variants TEXT,             -- Menyimpan JSON string dari objek variants
  description TEXT,
  title TEXT,
  category TEXT,
  discountPercentage REAL,
  rating REAL,
  stock INTEGER,
  tags TEXT,                 -- Menyimpan JSON string dari array tags
  brand TEXT,
  sku TEXT UNIQUE,
  weight REAL,
  dimensions TEXT,           -- Menyimpan JSON string dari objek dimensions
  warrantyInformation TEXT,
  shippingInformation TEXT,
  availabilityStatus TEXT,
  reviews TEXT,              -- Menyimpan JSON string dari array reviews
  returnPolicy TEXT,
  minimumOrderQuantity INTEGER,
  meta TEXT,                 -- Menyimpan JSON string dari objek meta
  images TEXT,               -- Menyimpan JSON string dari array images
  thumbnail TEXT
);
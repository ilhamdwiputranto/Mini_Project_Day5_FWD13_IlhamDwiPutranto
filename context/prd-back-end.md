# PRD - Halaman Detail Produk Unica AJ

**Nama:** Ilham Dwi Putranto  
**Kelas:** FWD 13  
**Tugas:** Day 5 - Mini Project  

# Product Requirement Document (PRD) - Back-End API & SQLite Database

## 1. Project Overview
* **Project Name**: Back-End API & SQLite Product Management System
* **Version**: 1.0.0
* **Architecture**: RESTful API Architecture
* **Primary Goal**: Providing a robust, persistent local backend solution for e-commerce product management, supporting complex data structures and full CRUD operations.

---

## 2. Tech Stack & Environment
* **Runtime**: Node.js
* **Framework**: Express.js (`v5.3.0`)
* **Database**: SQLite3 (`v6.0.1`) with Async Wrapper `sqlite` (`v5.1.1`)
* **Middleware**: `cors` (`v2.8.6`)
* **Format Standard**: JSON (JavaScript Object Notation)

---

## 3. Database Architecture & Schema

### 3.1 SQLite Database (`database.db`)
The system utilizes a relational SQLite database with structured columns. Complex nested data structures (such as arrays, variants, reviews, and metadata) are serialized into `TEXT` columns using JSON formatting.

### 3.2 Table Schema (`products`)

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique product identifier |
| `name` | `TEXT` | `NOT NULL` | Product name |
| `price` | `REAL` | `NOT NULL` | Product price in USD / IDR |
| `image` | `TEXT` | - | Primary product image URL |
| `variants` | `TEXT` | - | JSON stringified object containing colors/sizes & quantities |
| `description` | `TEXT` | - | Detailed product description |
| `title` | `TEXT` | - | Formatted product display title |
| `category` | `TEXT` | - | Product category classification |
| `discountPercentage` | `REAL` | - | Discount percentage |
| `rating` | `REAL` | - | Product rating score |
| `stock` | `INTEGER` | - | Available stock count |
| `tags` | `TEXT` | - | JSON stringified array of search tags |
| `brand` | `TEXT` | - | Product brand name |
| `sku` | `TEXT` | - | Stock Keeping Unit identifier |
| `weight` | `REAL` | - | Physical item weight |
| `dimensions` | `TEXT` | - | JSON stringified object of physical dimensions |
| `warrantyInformation` | `TEXT` | - | Terms of warranty |
| `shippingInformation` | `TEXT` | - | Delivery / shipping terms |
| `availabilityStatus` | `TEXT` | - | In Stock / Out of Stock status |
| `reviews` | `TEXT` | - | JSON stringified array of customer reviews |
| `returnPolicy` | `TEXT` | - | Item return policy details |
| `minimumOrderQuantity`| `INTEGER` | - | MOQ limit |
| `meta` | `TEXT` | - | JSON stringified metadata (timestamps, barcodes, QR) |
| `images` | `TEXT` | - | JSON stringified array of product gallery images |
| `thumbnail` | `TEXT` | - | Product thumbnail URL |

---

## 4. API Endpoints Specification

### 4.1 GET /api/products
* **Description**: Retrieve all products from the database.
* **Method**: `GET`
* **Response**: `200 OK`
* **Output Format**: Array of Product Objects (JSON strings parsed into native objects).

### 4.2 GET /api/products/:id
* **Description**: Retrieve a single product by its ID.
* **Method**: `GET`
* **URL Parameter**: `id` (INTEGER)
* **Response**: 
  * `200 OK` if found.
  * `404 Not Found` if the product ID does not exist.

### 4.3 POST /api/products
* **Description**: Create new product(s). Supports both single object submission and batch/bulk insertion via JSON array.
* **Method**: `POST`
* **Headers**: `Content-Type: application/json`
* **Request Body Example (Batch Input)**:
```json
[
  {
    "name": "Sample Product 1",
    "price": 29.99,
    "stock": 100,
    "category": "fashion"
  },
  {
    "name": "Sample Product 2",
    "price": 49.99,
    "stock": 50,
    "category": "accessories"
  }
]
```
* **Response**: `201 Created`
* **Output Example**:
```json
{
  "message": "2 produk berhasil ditambahkan",
  "productIds": [8, 9]
}
```

### 4.4 PUT /api/products/:id
* **Description**: Update an existing product's fields selectively.
* **Method**: `PUT`
* **URL Parameter**: `id` (INTEGER)
* **Response**:
  * `200 OK` on success.
  * `404 Not Found` if product ID does not exist.

### 4.5 DELETE /api/products/:id
* **Description**: Delete a product record by ID.
* **Method**: `DELETE`
* **URL Parameter**: `id` (INTEGER)
* **Response**:
  * `200 OK` on success.
  * `404 Not Found` if product ID does not exist.

---

## 5. Scripts & Command Execution
* **Initialize DB & Schema Creation**: Handled automatically on server start via `database.js`.
* **Seed Database**:
  ```bash
  npm run seed
  ```
* **Start Server**:
  ```bash
  npm start
  ```
  *(Runs backend API at `http://localhost:3000`)*

---

## 6. Next Implementation Steps (Frontend Integration)
1. Build Admin Dashboard UI (HTML, Tailwind CSS / Vanilla CSS).
2. Integrate Admin UI Form with `POST /api/products` for single and bulk entries.
3. Render live database records into an Admin Data Table using `GET /api/products`.
4. Attach Modal/Form trigger for `PUT /api/products/:id` (Update).
5. Add confirmation prompt and action trigger for `DELETE /api/products/:id`.
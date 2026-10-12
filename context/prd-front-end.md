# PRD - Halaman Detail Produk Unica AJ

**Nama:** Ilham Dwi Putranto  
**Kelas:** FWD 13  
**Tugas:** Day 5 - Mini Project  

| Keterangan | Informasi |
| :--- | :--- |
| **Versi** | 1.0 |
| **Status** | Draft untuk tugas |
| **Konteks** | Pembelajaran Front-End Development |
| **Teknologi** | HTML, CSS, dan JavaScript murni |
| **Scope** | Halaman detail produk (PDP) dengan data lokal |

---

## 1. Product Overview

Halaman detail produk membantu pengguna memahami informasi produk perawatan kulit (skincare), memilih kapasitas produk, mengatur jumlah barang, serta memberikan ulasan (review) produk sebelum menambahkan ke keranjang belanja.

Pada versi ini, halaman berfokus pada tampilan informasi produk, interaksi pemilihan kapasitas, ulasan pengguna, dan pendaftaran newsletter. Proses transaksi penuh belum termasuk scope.

### Contoh Produk:
* **Merek / Brand:** Innoxa
* **Nama Produk:** Unica AJ
* **Sub-deskripsi:** Anti-aging face cream for all skin types
* **Harga:** As low as \$94.30 per item
* **Deskripsi:** Krim wajah anti-penuaan yang cocok untuk semua jenis kulit.
* **Kapasitas (Capacity):** 50 ml, 100 ml
* **Status Stok:** In stock
* **Foto:** Satu foto utama produk kemasan emas

Konten utama halaman mencakup Header / Announcement Bar, Foto Produk, Informasi Produk (Nama, Rating, Harga), Pilihan Kapasitas, Quantity Control & Tombol Add to Cart, Accordion Detail (Description, More Information, Features), Fitur Layanan (Shipping/Sample/Payment), Form Review, dan Footer lengkap.

---

## 2. Problem + Target User

### Problem
Pengguna toko online membutuhkan informasi menyeluruh tentang produk perawatan kulit serta kemudahan dalam memilih variasi ukuran/kapasitas sebelum menambahkannya ke keranjang.

**Masalah yang ingin diselesaikan:**
1. Informasi spesifikasi produk dan fitur tidak terorganisir dengan rapi.
2. Pilihan kapasitas produk (misal: 50 ml vs 100 ml) tidak memiliki indikator visual yang jelas saat dipilih.
3. Jumlah barang dapat diatur secara tidak valid (misal: kurang dari 1).
4. Form ulasan (review) tidak memiliki validasi yang jelas bagi pengguna.

### Target User
Calon pembeli yang mengakses toko online niche/skincare melalui desktop maupun smartphone dan ingin melihat detail produk, memilih ukuran kapasitas, serta membaca atau menulis ulasan.

**Kebutuhan Utama:** Melihat gambar produk, memahami harga dan deskripsi, memilih kapasitas, mengatur jumlah barang, dan membaca/menulis ulasan produk.

---

## 3. Goals + Non-Goals

### Goals
1. Menampilkan informasi produk secara jelas, elegan, dan profesional.
2. Memungkinkan pengguna memilih variasi kapasitas produk (50 ml / 100 ml).
3. Memungkinkan pengguna mengatur jumlah barang dengan batas minimum 1.
4. Menyediakan section collapsible/accordion untuk Description, More Information, dan Features.
5. Menyediakan form penambahan ulasan (Rating, Nickname, Summary, Review).
6. Memastikan tata letak responsif di perangkat desktop dan mobile.

### Non-Goals
Versi ini tidak mencakup:
* Fitur Login dan registrasi pengguna.
* Integrasi pembayaran real (Checkout & Payment Gateway).
* Pengambilan data dari API backend / Database.
* Sinkronisasi keranjang belanja ke server (Cart persistence).
* Kalkulasi otomatis biaya pengiriman secara real-time.

---

## 4. User Flow

1. Pengguna membuka halaman detail produk Innoxa Unica AJ.
2. Halaman menampilkan foto produk, brand, nama produk, rating bintang, harga, dan ketersediaan stok (In stock).
3. Pengguna memilih opsi kapasitas produk (misalnya: 50 ml atau 100 ml).
4. Pengguna mengatur jumlah (quantity) menggunakan tombol `-` dan `+`.
5. Pengguna mengeklik tombol **"ADD TO CART"**.
6. Pengguna dapat membuka/menutup accordion informasi (Description, More Information, Features).
7. Pengguna scroll ke bawah ke bagian **"You're reviewing: Unica AJ"** untuk mengisi form rating dan ulasan, lalu mengeklik **"SUBMIT REVIEW"**.

### Kondisi Awal:
* Foto utama menampilkan produk Innoxa Unica AJ.
* Opsi kapasitas 50 ml terpilih secara default.
* Quantity bernilai 1.
* Stok menampilkan status "In stock".

---

## 5. Features + Requirements

| ID | Fitur | Requirement |
| :--- | :--- | :--- |
| **FR-01** | Top Header & Navigasi | Menampilkan info promo di top bar, logo 50ml, tombol pencarian, user account, dan cart icon. |
| **FR-02** | Foto Produk | Menampilkan gambar produk utama secara jelas tanpa merusak proporsi gambar. |
| **FR-03** | Informasi Produk | Menampilkan Brand ("INNOXA"), Nama Produk ("Unica AJ"), Subtitle, Rating Bintang, dan Harga (\$94.30). |
| **FR-04** | Pilihan Capacity | Menyediakan pilihan tombol 50 ml dan 100 ml. Hanya satu kapasitas yang aktif pada satu waktu. |
| **FR-05** | Quantity Selector | Menyediakan tombol `-`, nilai jumlah, dan tombol `+` dengan batas minimum 1. |
| **FR-06** | Tombol Add to Cart & Wishlist | Memiliki tombol utama "ADD TO CART" dan ikon Wishlist (hati) di sampingnya. |
| **FR-07** | Accordion Detail | Menyediakan menu Description, More Information, dan Features yang dapat di-expand/collapse. |
| **FR-08** | Info Layanan | Menampilkan 3 keunggulan: Free Shipping, Free Sample Upon Request, dan Buy Now Pay Later. |
| **FR-09** | Form Review Produk | Menyediakan input Rating Bintang, Nickname, Summary, dan Review teks beserta tombol "SUBMIT REVIEW". |
| **FR-10** | Newsletter Subscription | Form input email dengan checkbox persetujuan dan tombol Subscribe. |
| **FR-11** | Footer | Menampilkan informasi toko, navigasi link footer, daftar metode pembayaran/kurir, daftar Top Brands, dan Copyright notice. |

---

## 6. User Stories

| ID | User Story |
| :--- | :--- |
| **US-01** | Sebagai calon pembeli, saya ingin melihat gambar, nama brand, dan harga produk agar dapat mempertimbangkan pembelian. |
| **US-02** | Sebagai calon pembeli, saya ingin memilih opsi ukuran kapasitas produk ($50\text{ ml} / 100\text{ ml}$) agar mendapatkan varian yang sesuai. |
| **US-03** | Sebagai calon pembeli, saya ingin mengubah jumlah produk yang dibeli sebelum memasukkannya ke keranjang. |
| **US-04** | Sebagai calon pembeli, saya ingin membuka accordion detail untuk membaca komposisi dan fitur produk. |
| **US-05** | Sebagai calon pembeli, saya ingin memberikan ulasan dan rating pada produk yang ditinjau. |
| **US-06** | Sebagai pengunjung, saya ingin mendaftarkan email ke newsletter untuk mendapatkan informasi promosi terbaru. |

---

## 7. Acceptance Criteria

| ID | Skenario | Hasil yang Diharapkan |
| :--- | :--- | :--- |
| **AC-01** | Pengguna membuka halaman pertama kali | Gambar produk, nama brand, harga \$94.30, pilihan kapasitas, quantity 1, dan status In stock tampil dengan benar. |
| **AC-02** | Pengguna memilih opsi 100 ml | Tombol 100 ml menjadi aktif (visual ter-highlight) dan kapasitas 50 ml menjadi tidak aktif. |
| **AC-03** | Quantity bernilai 1 lalu pengguna menekan tombol `-` | Jumlah tetap 1 (tidak dapat berkurang di bawah 1). |
| **AC-04** | Pengguna menekan tombol `+` | Jumlah barang bertambah menjadi 2. |
| **AC-05** | Pengguna menekan item Accordion Description | Konten deskripsi produk terbuka secara halus (expand). |
| **AC-06** | Pengguna menekan tombol SUBMIT REVIEW tanpa mengisi form | Tampil pesan peringatan agar pengguna melengkapi field wajib (Rating, Nickname, Summary, Review). |
| **AC-07** | Pengguna mengisi form review dan menekan SUBMIT REVIEW | Tampil notifikasi konfirmasi bahwa ulasan berhasil dikirim. |
| **AC-08** | Halaman dibuka pada tampilan mobile / layar kecil | Tampilan foto dan kolom detail produk tersusun secara vertikal tanpa ada scroll horizontal yang tidak diinginkan. |

---

## 8. Constraints + Success Criteria

### Constraints
* Implementasi hanya menggunakan HTML, CSS, dan JavaScript murni tanpa framework (Vanilla JS).
* Data produk disimulasikan menggunakan data lokal (JSON/JS Object).
* Tidak terhubung dengan backend, API external, atau database.

### Success Criteria
Halaman dianggap berhasil apabila:
1. Seluruh skenario pada **Acceptance Criteria** lulus pengujian.
2. Seluruh elemen visual (Header, Product Info, Accordion, Review Form, Footer) sesuai dengan layout pada screenshot.
3. Interaksi (Capacity selection, Quantity, Accordions) berjalan lancar tanpa error JavaScript.
4. Layout tervisualisasikan dengan baik di tampilan desktop maupun mobile.
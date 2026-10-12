# Portal Portfolio & Dokumentasi Projek (DAY - 5 Mini Project)

 Selamat datang di repositori **Portal Portfolio & Dokumentasi Projek** yang dikembangkan oleh **Ilham Dwi Putranto**. Projek ini dikerjakan sebagai bagian dari program **Full-Stack Web Development (AI First Workflow)**.

---

## 👤 Profil Developer

* **Nama:** Ilham Dwi Putranto
* **Kelas:** Full-Stack Web Development
* **Spesialisasi:** AI-First Web Development
* **GitHub:** [ilhamdwiputranto](https://github.com/ilhamdwiputranto)
* **LinkedIn:** [Ilham Dwi Putranto](https://www.linkedin.com/in/ilham-dwi-putranto)

---

## 💡 Kesan & Vibes Coding (1 Minggu Awal)

Mengikuti kelas penggunaan AI pada project web development selama satu minggu pertama memberikan pengalaman baru yang signifikan. Fokus utama bukan lagi penulisan kode per baris (*line-by-line coding*), melainkan pengarahan logika, arsitektur, dan konsep dengan bantuan AI. Interaksi yang intensif dengan AI memungkinkan proses penerjemahan ide menjadi prototipe web berjalan dengan sangat cepat dan efisien.

Selama satu minggu awal belajar, berbagai hasil konkret telah berhasil dicapai, mulai dari penyusunan struktur kode yang lebih rapi hingga implementasi fitur-fitur kompleks. AI terbukti mempercepat proses, memberikan rekomendasi optimasi kode, serta menyediakan alternatif solusi teknis saat menghadapi hambatan. Efisiensi waktu yang diperoleh memungkinkan perhatian lebih banyak dicurahkan pada validasi ide, alur pengguna, dan kualitas produk secara keseluruhan.

> **Pendapat tentang Vibe Coding:**
> *Vibe coding* tidak menghilangkan kebutuhan akan pemahaman pemrograman dasar, melainkan mengubah peran pengembang menjadi seorang pengarah (*director*) yang memandu AI untuk mewujudkan visi produk. Hal ini membuat proses pengembangan web terasa lebih adaptif, menyenangkan, dan inklusif.

---

## 🚀 Langkah-Langkah Pengerjaan Projek

| Langkah | Deskripsi | Kesan Pengerjaan |
| :--- | :--- | :--- |
| **01. Memahami Perintah Proyek** | Menganalisis instruksi tugas, sasaran utama, dan batasan arsitektur. | *Saya memahami bagian ini.* |
| **02. Menyusun Langkah Pengerjaan** | Merencanakan alur teknis, struktur folder, serta strategi pemecahan masalah. | *Saya memahami bagian ini.* |
| **03. Membuat PRD** | Menyusun Product Requirement Document sebagai acuan spesifikasi fitur. | *Saya memahami bagian ini.* |
| **04. Membuat Markdown Docs** | Menyusun `requirement.md`, `design.md`, dan `task.md`. | *Saya memahami bagian ini.* |
| **05. Mengeksekusi Penulisan Program** | Pengodean komponen frontend dan endpoint backend berbasis AI First. | *Saya sangat hati-hati dalam mengeksekusi ini.* |
| **06. Analisis Program** | Pengujian fitur, verifikasi integritas data, serta pemeriksaan bug/error. | *Saya tetap perlu memahami baris-baris hasil.* |
| **07. Merapikan Program** | Refactoring kode, pengorganisasian subfolder public, dan pembersihan file. | *Saya membuang yang tidak diperlukan dan menambahkan fitur yang diperlukan.* |
| **08. Submit Program** | Finalisasi repositori, pembuatan landing page portal, dan penyerahan tugas. | *Semoga hasilnya memuaskan.* |

---

## 🛠️ Tools & Infrastruktur

1. **Gemini & GPT AI** — Asisten pemikiran utama untuk merancang arsitektur, drafting kode, dan debugging.
2. **VS Code** — Code editor utama tempat eksekusi penulisan program dan manajemen folder.
3. **Google Docs** — Media pencatatan draft PRD, ideasi cepat, dan pengorganisasian materi awal.
4. **Google Search** — Eksplorasi referensi dokumentasi sintaks, riset pustaka, dan komparasi solusi.
5. **Rekaman Live Class** — Panduan acuan materi utama untuk mengkonfirmasi syarat dan alur tugas.

---

## 📂 Struktur Modul & Projek

Setiap modul projek terletak pada subfolder tersendiri dan dapat diakses melalui antarmuka web masing-masing:

1. **`tugas-front-end-hardcoded`**
   * *Deskripsi:* Pengembangan antarmuka statis dengan tata letak HTML/CSS kustom yang responsif dan presisi secara visual.
   * *Lokasi Entry:* `./tugas-front-end-hardcoded/public/index.html`

2. **`tugas-front-end-api-public`**
   * *Deskripsi:* Aplikasi Front-End dinamis yang mengonsumsi data langsung dari endpoint Public API secara asynchronous.
   * *Lokasi Entry:* `./tugas-front-end-api-public/public/index.html`

3. **`tugas-back-end-api-local`**
   * *Deskripsi:* Pengembangan REST API lokal Node.js & Express menggunakan mock storage memori lokal.
   * *Lokasi Entry:* `./tugas-back-end-api-local/public/index.html`

4. **`tugas-back-end-api-sqlite`**
   * *Deskripsi:* Layanan API berbasis SQLite terintegrasi seeder data (`seed.js`) untuk database lokal.
   * *Lokasi Entry:* `./tugas-back-end-api-sqlite/public/index.html`

5. **`eksplorasi front-end-admin-manajemen-halaman-product`**
   * *Deskripsi:* Halaman antarmuka khusus admin untuk memanajemen data katalog produk (tambah, edit, hapus) yang terhubung ke database lokal SQL / SQLite.
   * *Lokasi Entry:* `./tugas-back-end-api-sqlite/public/admin.html`

---

## ⚙️ Panduan Menjalankan Backend Local SQLite

Aplikasi backend memerlukan lingkungan **Node.js** dan database **SQLite** agar server lokal dan pengisian data (*seeding*) berjalan dengan lancar.

### Prasyarat
* **Node.js** terinstall di perangkat lokal.
* Dependencies terinstall (Express, SQLite3 / Better-SQLite3).

### Langkah Eksekusi Perintah Terminal

```bash
# 1. Buka terminal lalu masuk ke direktori projek backend SQLite
cd tugas-back-end-api-sqlite

# 2. Install semua modul paket yang dibutuhkan
npm install

# 3. Jalankan Seeder Database (Membuat tabel & data awal)
node seed.js

# 4. Jalankan Server API Backend Utama
node server.js
```

Server backend akan secara aktif berjalan di `http://localhost:3000`.

---

## 📸 Dokumentasi Pengujian Program (Bukti Berjalan)

Seluruh tangkapan layar bukti pengujian tersimpan di folder `dokumentasi-program-berjalan/`:

* **SS-01:** Dokumentasi Tampilan & Fitur Hardcoded (`dokumentasi-hardcoded.png`)
* **SS-02:** Pengujian Integrasi Public API Async (`dokumentasi-publik-api.png`)
* **SS-03:** Pengujian Response Server Backend Local (`dokumentasi-lokal-api.png`)
* **SS-04:** Eksekusi Seed.js & Database SQLite (`dokumentasi-sql.png`)
* **SS-05:** Pengujian Halaman Admin Manajemen Product (`dokumentasi-admin.png`)
* **SS-06:** Pengujian Posting Produk dari Halaman Admin (`dokumentasi-input-admin.png`)

---

## 📩 Feedback & Masukan

Kritik dan saran pembangunan dapat dikirimkan langsung melalui form interaktif pada landing page portal (`landing_page_README_portal_projek.html`) yang terintegrasi dengan tautan langsung ke WhatsApp.

---

© 2026 **Ilham Dwi Putranto** — Full-Stack Web Development (AI First Workflow).
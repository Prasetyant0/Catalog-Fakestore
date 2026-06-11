# Aplikasi Product Catalog TokoPaEdi - Fake Store API Integration

Ini adalah proyek **Tugas Praktikum 6 - Pemrograman Web**, sebuah aplikasi katalog produk yang dibangun dengan standar modern menggunakan **React (Vite)**, **Tailwind CSS v4.0**, dan **Axios** untuk integrasi API. Aplikasi ini mengadopsi desain yang terinspirasi dari e-commerce terkemuka dan menerapkan berbagai fitur fungsional untuk interaksi pengguna.

---

## 🚀 Cara Menjalankan Aplikasi

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

```bash
# 1. Clone repository ini ke mesin lokal Anda
git clone https://github.com/Prasetyant0/Catalog-Fakestore.git

# 2. Masuk ke direktori proyek
cd Catalog-Fakestore

# 3. Instal semua dependencies yang dibutuhkan
npm install

# 4. Jalankan server development Vite
npm run dev
```

Setelah server berjalan, buka browser Anda dan akses aplikasi melalui URL berikut:
**[http://localhost:5173](http://localhost:5173)**

---

## ✨ Fitur-Fitur yang Diimplementasikan

Aplikasi ini dilengkapi dengan berbagai fitur, baik yang sesuai dengan spesifikasi modul praktikum maupun fitur tambahan untuk meningkatkan fungsionalitas.

### Core Features (Sesuai Spesifikasi Modul)
*   **Product List**: Menampilkan 20+ produk yang diambil langsung dari Fake Store API.
*   **Responsive Grid**: Layout grid yang sepenuhnya responsif untuk berbagai ukuran layar (4 kolom untuk desktop, 2 untuk tablet, dan 1 untuk mobile).
*   **Loading State (Skeleton Loader)**: Memberikan pengalaman pengguna yang mulus dengan menampilkan *skeleton loader* (`animate-pulse`) saat data sedang dimuat.
*   **Error Handling State**: Menangani kegagalan koneksi API dengan menampilkan pesan error informatif dan tombol **"Coba Lagi"** untuk memuat ulang data.
*   **Category Filter**: Memungkinkan pengguna memfilter produk berdasarkan kategori yang diambil secara dinamis dari endpoint API.
*   **Search Bar Real-time**: Fitur pencarian instan yang memfilter produk berdasarkan judul saat pengguna mengetik.
*   **Product Detail Modal**: Menampilkan informasi lengkap produk dalam sebuah modal overlay ketika sebuah produk diklik.

### Fitur Tambahan yang Berhasil Dibuat
*   **Sorting Harga**: Opsi untuk mengurutkan produk berdasarkan harga terendah atau tertinggi.
*   **Filter Berdasarkan Rating**: Pengguna dapat memfilter produk yang memiliki rating minimum tertentu.
*   **Simulasi Add to Cart**: Fungsionalitas keranjang belanja dengan manajemen state global dan notifikasi *toast* saat item berhasil ditambahkan.
*   **Panel Keranjang Belanja**: Panel *slide-over* yang menampilkan daftar item di keranjang, memungkinkan pengguna mengubah kuantitas atau menghapus item.
*   **Local Storage Persistence**: Isi keranjang belanja disimpan di `localStorage`, sehingga data tidak akan hilang meskipun halaman di-refresh.
*   **Client-Side Pagination**: Membatasi jumlah produk yang ditampilkan per halaman (8 item) untuk meningkatkan performa render, lengkap dengan kontrol navigasi halaman.
*   **Branding Kustom**: Logo SVG dan nama toko "TokoPaEdi" yang unik.

---

## 🧑‍💻 Informasi Mahasiswa

*   **Nama**: Prasetyanto Tri Prabowo
*   **NIM**: 24.11.6089
*   **Kelas**: 24S1IF03

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

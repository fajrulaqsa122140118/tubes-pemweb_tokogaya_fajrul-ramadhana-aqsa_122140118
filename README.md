# Toko Gaya

Website Penjualan Barang Fashion  
Tugas Besar Pemrograman Web RA – Semester Genap 2024/2025  
Nama: Fajrul Ramadhana Aqsa  
NIM: 122140118

---

## 📝 Deskripsi Aplikasi Web

**Toko Gaya** adalah website penjualan produk fashion yang memungkinkan pengguna untuk menjelajahi katalog produk, menambahkan produk ke keranjang, dan melakukan simulasi checkout. Admin dapat mengelola data produk melalui fitur CRUD. Aplikasi ini dibangun menggunakan framework **Python Pyramid** untuk backend dan **React JS** untuk frontend dengan desain yang responsif dan modern.

---

## 🔧 Dependensi / Library

### 🖥️ Frontend (React JS)
- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `tailwindcss`
- `@headlessui/react` *(opsional, untuk komponen UI)*

### 🔙 Backend (Python Pyramid)
- `pyramid`
- `sqlalchemy`
- `psycopg2-binary`
- `alembic`
- `bcrypt` *(untuk hash password)*
- `pytest` *(untuk unit testing)*
- `pyramid_jwt` *(opsional untuk auth token)*

### 🗄️ Database
- PostgreSQL

---

## 🚀 Fitur Aplikasi

### 👤 Pengguna
- Registrasi dan login akun
- Melihat daftar produk fashion
- Mencari dan memfilter produk berdasarkan kategori, ukuran, atau harga
- Melihat detail produk
- Menambahkan produk ke keranjang
- Checkout dan melihat total transaksi

### 🛒 Admin
- Login sebagai admin
- CRUD produk fashion (tambah, ubah, hapus, lihat)
- Manajemen stok produk

### 🎨 Desain
- UI responsif dan modern menggunakan Tailwind CSS
- Routing antar halaman menggunakan React Router DOM

### ⚙️ Backend
- RESTful API menggunakan Python Pyramid
- CRUD endpoint untuk produk dan pengguna
- Proteksi endpoint dengan autentikasi
- Unit testing dengan cakupan minimal 60%

---

## 📌 Catatan
- Repositori ini dibuat sebagai bagian dari Tugas Besar Pemrograman Web.

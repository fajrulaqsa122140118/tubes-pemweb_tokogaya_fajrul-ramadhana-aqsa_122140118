
# Toko Gaya

Website Penjualan Barang Fashion  
**Tugas Besar Pemrograman Web RA – Semester Genap 2024/2025**  
Nama: **Fajrul Ramadhana Aqsa**  
NIM: **122140118**

---

## 📝 Deskripsi Aplikasi Web

**Toko Gaya** adalah website e-commerce fashion yang memungkinkan pengguna:
- Menelusuri katalog produk,
- Menambahkan item ke keranjang,
- Melakukan simulasi checkout.

Admin dapat mengelola produk melalui dashboard CRUD.  
Aplikasi ini dibangun menggunakan:
- **React JS** untuk frontend (UI responsif & dinamis),
- **Python Pyramid** untuk backend (RESTful API),
- **PostgreSQL** untuk database.

---

## 🚀 Fitur Aplikasi

### 👤 Fitur Pengguna
- Registrasi dan Login
- Lihat daftar & detail produk
- Filter produk (kategori, harga, ukuran)
- Tambah produk ke keranjang
- Checkout simulasi (dengan ringkasan transaksi)
- Halaman Profil pengguna (opsional)

### 🛒 Fitur Admin
- Login Admin
- CRUD produk fashion
- Dashboard admin (manajemen produk)

### 🎨 Tampilan
- UI modern dan responsif dengan **Tailwind CSS**
- Navigasi antar halaman dengan **React Router DOM**

### ⚙️ Backend
- REST API menggunakan **Pyramid**
- CRUD endpoint: Produk, Pengguna
- Proteksi endpoint dengan autentikasi (bcrypt)

---

## 🔧 Dependensi / Library

### 🖥️ Frontend (React JS)
```bash
react, react-dom, react-router-dom, axios, tailwindcss, @headlessui/react
```

### 🔙 Backend (Python Pyramid)
```bash
pyramid, sqlalchemy, psycopg2-binary, alembic, bcrypt, pytest, pyramid_jwt
```

### 🗄️ Database
- PostgreSQL

---

## 🛠️ Cara Instalasi & Menjalankan Aplikasi

### 📁 Struktur Direktori
```
📁 backend/      ← Folder backend Pyramid
📁 TokoGaya/     ← Folder frontend React
📄 README.md
```

---

## 🖥️ Langkah 1: Setup Frontend (React JS)

### 1. Masuk ke folder `TokoGaya`
```bash
cd TokoGaya
```

### 2. Install dependencies
```bash
npm install
```

### 3. Jalankan aplikasi React
```bash
npm run dev
# atau jika menggunakan vite:
npm run start
```

Aplikasi akan berjalan di: `http://localhost:5173/` *(default Vite)*  
Jika create-react-app: `http://localhost:3000/`

---

## 🔙 Langkah 2: Setup Backend (Python Pyramid)

### 1. Buat virtual environment
```bash
python -m venv env
source env/bin/activate        # Linux/macOS
env\Scripts\activate         # Windows
```

### 2. Masuk ke folder backend
```bash
cd backend
```

### 3. Install dependencies
```bash
pip install -e .
```

### 4. Jalankan migrasi database (gunakan Alembic jika ada)
```bash
alembic upgrade head
```

### 5. Jalankan server Pyramid
```bash
pserve development.ini --reload
```

API akan berjalan di: `http://localhost:6543/`

---

## 🔗 Langkah 3: Hubungkan Frontend dan Backend

Pastikan file Axios atau `.env` frontend mengarah ke URL backend:
```js
// contoh axios config
const api = axios.create({
  baseURL: 'http://localhost:6543/api'
});
```

---

## 🧪 Testing (Optional)
Untuk backend:
```bash
pytest
```

---

## 📌 Catatan Akhir
- Project ini dibuat untuk pembelajaran Pemrograman Web.
- Desain dapat dikembangkan lebih lanjut dengan fitur riwayat pesanan, upload gambar produk, dan autentikasi token JWT.

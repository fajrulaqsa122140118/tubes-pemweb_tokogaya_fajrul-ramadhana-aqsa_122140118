import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validasi dasar
    if (!formData.username || !formData.email || !formData.password) {
      alert("Harap isi semua field!");
      return;
    }

    if (!formData.email.endsWith("@gmail.com")) {
      alert("Email harus menggunakan @gmail.com");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:6543/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Registrasi berhasil!");

        localStorage.setItem('user', JSON.stringify({
          username: formData.username,
          email: formData.email,
          joined: new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        }));

        navigate("/login");
      } else {
        alert(`❌ ${result.message || 'Terjadi kesalahan saat registrasi'}`);
      }
    } catch (error) {
      alert("❌ Gagal terhubung ke server.");
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Daftar Akun Baru</h2>

        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Masukkan username"
          onChange={handleChange}
        />

        <label>Alamat Email</label>
        <input
          type="email"
          name="email"
          placeholder="contoh@gmail.com"
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Masukkan password"
          onChange={handleChange}
        />

        <button className="register-button" onClick={handleSubmit}>
          KONFIRMASI DAN LANJUTKAN
        </button>
      </div>
    </div>
  );
}

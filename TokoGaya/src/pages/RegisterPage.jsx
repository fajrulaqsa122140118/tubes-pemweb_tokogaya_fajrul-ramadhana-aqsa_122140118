import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    gender: '',
    firstName: '',
    birthDay: '1',
    birthMonth: 'Januari',
    birthYear: '2000',
    stayLoggedIn: false,
    subscribe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

    const handleSubmit = () => {
        const today = new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        const newUser = {
            ...formData,
            birthDate: `${formData.birthDay} ${formData.birthMonth} ${formData.birthYear}`,
            joined: today
        };

    localStorage.setItem('user', JSON.stringify(newUser));
    navigate('/profile');
    };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Daftar Akun Baru</h2>

        <label>Alamat Email</label>
        <input type="email" name="email" onChange={handleChange} />

        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />

        <label>Gender</label>
        <div className="gender-options">
          <label><input type="radio" name="gender" value="wanita" onChange={handleChange} /> Wanita</label>
          <label><input type="radio" name="gender" value="pria" onChange={handleChange} /> Pria</label>
        </div>

        <label>Nama Depan</label>
        <input type="text" name="firstName" onChange={handleChange} />

        <label>Tanggal Lahir</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select name="birthDay" onChange={handleChange}>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select name="birthMonth" onChange={handleChange}>
            {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select name="birthYear" onChange={handleChange}>
            {Array.from({ length: 60 }, (_, i) => (
              <option key={1965 + i} value={1965 + i}>{1965 + i}</option>
            ))}
          </select>
        </div>

            
        <button className="register-button" onClick={handleSubmit}>KONFIRMASI DAN LANJUTKAN</button>
      </div>
    </div>
  );
}


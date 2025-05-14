import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { state } = useLocation();
  const product = state?.product;

  const [alamat, setAlamat] = useState('');
  const [metode, setMetode] = useState('Transfer Bank');
  const [jumlah, setJumlah] = useState(1);
  const [ukuran, setUkuran] = useState('M');
  const [berhasil, setBerhasil] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (alamat.trim() === '') {
      alert('Alamat harus diisi');
      return;
    }
    setBerhasil(true);
  };

  return (
    <div className="checkout-page">
      {product ? (
        <div className="checkout-card">
          <h2>🧾 Checkout Produk</h2>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p className="product-price">Harga: ${product.price}</p>

          <form onSubmit={handleSubmit} className="checkout-form">
            <label>
              Alamat Pengiriman:
              <textarea value={alamat} onChange={(e) => setAlamat(e.target.value)} required />
            </label>

            <label>
              Metode Pembayaran:
              <select value={metode} onChange={(e) => setMetode(e.target.value)}>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="COD">COD</option>
                <option value="E-Wallet">E-Wallet</option>
              </select>
            </label>

            <label>
              Jumlah Barang:
              <input type="number" value={jumlah} min={1} onChange={(e) => setJumlah(e.target.value)} />
            </label>

            <label>
              Pilih Ukuran:
              <select value={ukuran} onChange={(e) => setUkuran(e.target.value)}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </label>

            <button type="submit" className="confirm-button">Konfirmasi Pembelian</button>
          </form>

          {berhasil && (
            <div className="success-message">
              🎉 Transaksi berhasil! Produk akan segera dikirim ke alamat Anda.
            </div>
          )}
        </div>
      ) : (
        <p>Produk tidak ditemukan.</p>
      )}
    </div>
  );
};

export default Checkout;

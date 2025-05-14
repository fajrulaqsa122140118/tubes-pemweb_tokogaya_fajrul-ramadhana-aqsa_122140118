import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(() => setError('Gagal memuat produk'));
  }, []);

  return (
    <div className="home-page">
      <h2>Daftar Produk</h2>
      {error && <p className="error">{error}</p>}
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
  <img src={product.image} alt={product.title} className="product-image" />
  <h3>{product.title}</h3>
  <p className="product-description">{product.description}</p>

  <div className="bottom-info">
    <p className="product-price">
      Rp {(product.price * 16000).toLocaleString()}
    </p>
    <button
      onClick={() => addToCart(product)}
      className="btn-cart"
    >
      Tambah ke Keranjang
    </button>
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default Home;

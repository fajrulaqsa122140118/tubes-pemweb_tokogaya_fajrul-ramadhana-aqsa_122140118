import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterPage.css';
import { useCart } from '../context/CartContext';

export default function FilterPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const { addToCart } = useCart(); // ✅ akses keranjang

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredProducts = products.filter((product) => {
    const priceIDR = product.price * 16000;

    // Validasi & konversi input harga
    const minInput = parseFloat(filters.minPrice);
    const maxInput = parseFloat(filters.maxPrice);

    const min = isNaN(minInput) || minInput < 100 ? 0 : minInput * 1000;
    const max = isNaN(maxInput) || maxInput < 100 ? Infinity : maxInput * 1000;

    const matchCategory =
      filters.category === '' || product.category === filters.category;
    const matchMin = priceIDR >= min;
    const matchMax = priceIDR <= max;

    return matchCategory && matchMin && matchMax;
  });

  return (
    <div className="filter-container">
      <h2 className="filter-title">🔍 Filter Produk</h2>

      <div className="filter-box">
        <select name="category" onChange={handleChange}>
          <option value="">Semua Kategori</option>
          <option value="women's clothing">Women&#39;s Clothing</option>
          <option value="men's clothing">Men&#39;s Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Harga Minimum (ribu)"
          min="100"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Harga Maksimum (ribu)"
          min="100"
          onChange={handleChange}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => {
          const priceIDR = product.price * 16000;

          return (
            <div className="product-card" key={product.id}>
              <div className="img-container">
                <img src={product.image} alt={product.title} />
              </div>
              <h3>{product.title}</h3>
              <span className="product-category">{product.category}</span>
              <p className="product-price">Rp {priceIDR.toLocaleString('id-ID')}</p>
              <button
                className="btn-cart"
                onClick={() => addToCart(product)}
              >
                Beli
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

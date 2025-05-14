import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FilterPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  });

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

  // Perbaikan: validasi angka dan gunakan parseFloat dengan isNaN
  const filteredProducts = products.filter((product) => {
    const matchCategory =
      filters.category === '' || product.category === filters.category;

    const priceIDR = product.price * 16000;

    const min = parseFloat(filters.minPrice);
    const max = parseFloat(filters.maxPrice);

    const matchMin = isNaN(min) || priceIDR >= min;
    const matchMax = isNaN(max) || priceIDR <= max;

    return matchCategory && matchMin && matchMax;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🔍 Filter Produk</h2>

      {/* Filter Form */}
      <div className="flex flex-wrap gap-4 items-center bg-white shadow p-4 rounded-md mb-8">
        <select
          name="category"
          onChange={handleChange}
          className="p-2 border rounded w-60"
        >
          <option value="">Semua Kategori</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Harga Minimum"
          className="p-2 border rounded w-48"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Harga Maksimum"
          className="p-2 border rounded w-48"
          onChange={handleChange}
        />
      </div>

      {/* Daftar Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const priceIDR = product.price * 16000;

          return (
            <div
              key={product.id}
              className="bg-white p-4 shadow-md rounded-xl w-full"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="font-bold text-sm mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-1">{product.category}</p>
              <p className="text-red-500 font-bold mb-3">
                Rp {priceIDR.toLocaleString()}
              </p>
              <button className="w-full px-4 py-2 bg-yellow-400 text-white font-semibold rounded hover:bg-yellow-500 text-sm">
                Beli
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
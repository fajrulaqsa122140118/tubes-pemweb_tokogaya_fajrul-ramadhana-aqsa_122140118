import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Filter() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: ""
  });

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
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
    const matchCategory = filters.category === "" || product.category === filters.category;
    const matchMin = filters.minPrice === "" || product.price >= parseFloat(filters.minPrice);
    const matchMax = filters.maxPrice === "" || product.price <= parseFloat(filters.maxPrice);
    return matchCategory && matchMin && matchMax;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span role="img" aria-label="filter">🔍</span> Filter Produk
        </h2>

        {/* Form Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
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
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-2"
              />
              <h3 className="font-bold text-sm mb-1 line-clamp-2">{product.title}</h3>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <p className="text-red-600 font-bold mb-2">
                Rp {(product.price * 16000).toLocaleString()}
              </p>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm font-semibold">
                Beli
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

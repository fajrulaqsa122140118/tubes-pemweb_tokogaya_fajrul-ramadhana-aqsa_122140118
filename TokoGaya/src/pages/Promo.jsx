import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext'; // ✅ akses context keranjang
import './Promo.css';

const getRandomDiscount = () => {
  const discounts = [10, 20, 30, 40, 50];
  return discounts[Math.floor(Math.random() * discounts.length)];
};

const Promo = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // ✅ Pindah ke dalam komponen

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const discounted = data.map(product => {
          const discount = getRandomDiscount();
          const originalPriceIDR = product.price * 16000;
          const discountedPrice = originalPriceIDR * (1 - discount / 100);

          return {
            ...product,
            discount,
            originalPriceIDR,
            discountedPrice
          };
        });
        setProducts(discounted);
      });
  }, []);

  return (
    <div className="promo-page">
      <h2>🔥 Promo Spesial Hari Ini!</h2>
      <div className="promo-grid">
        {products.map(product => (
          <div className="promo-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>

            <p className="original-price">
              <s>Rp {product.originalPriceIDR.toLocaleString('id-ID')}</s>
            </p>

            <p className="discount">Diskon {product.discount}%</p>

            <p className="final-price">💸 Rp {product.discountedPrice.toLocaleString('id-ID')}</p>

            <button
              onClick={() => addToCart(product)}
              className="btn-cart"
            >
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promo;

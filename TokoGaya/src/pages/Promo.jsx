import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Promo.css';

const getRandomDiscount = () => {
  const discounts = [10, 20, 30, 40, 50];
  return discounts[Math.floor(Math.random() * discounts.length)];
};

const Promo = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const discounted = data.map(product => {
          const discount = getRandomDiscount();
          const discountedPrice = (product.price * (1 - discount / 100)).toFixed(2);
          return { ...product, discount, discountedPrice };
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
            <p className="original-price">Rp {product.price.toFixed(2)}</p>
            <p className="discount">Diskon {product.discount}%</p>
            <p className="final-price">💸 Rp {product.discountedPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promo;

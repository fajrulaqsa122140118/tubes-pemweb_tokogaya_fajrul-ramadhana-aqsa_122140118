import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import { useCart } from "../context/CartContext";


const Header = () => {
  const { cart } = useCart();

  return (
    <header className="header">
      <div className="nav-container">
        {/* Judul toko */}
        <Link to="/" className="brand">
          🛍️ <span className="brand-name">Toko Gaya</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/filter" className="nav-link">Filter</NavLink>
          <NavLink to="/promo" className="nav-link">Berbelanja</NavLink>
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
          <NavLink to="/cart" className="nav-link">
            ({cart.length}) Cart 
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

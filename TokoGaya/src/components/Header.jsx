import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart();

  return (
    <header className="header bg-brown-900 text-white shadow-md">
      <nav className="nav-container flex gap-4 items-center justify-center py-3">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/promo" className="nav-link">Produk Promo</NavLink>
        <NavLink to="/filter" className="nav-link">Filter</NavLink>
        <NavLink to="/profile" className="nav-link">Profile</NavLink>
        <NavLink to="/cart" className="nav-link">Keranjang ({cart.length})</NavLink>

      </nav>
    </header>
  );
};

export default Header;

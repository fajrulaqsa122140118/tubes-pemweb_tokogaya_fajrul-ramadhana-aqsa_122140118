import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cart } = useCart(); // ✅ dipanggil di dalam function component

  return (
    <header className="header">
      <nav className="nav-container">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/promo" className="nav-link">Promo</NavLink>
        <NavLink to="/filter" className="nav-link">Filter</NavLink>
        <NavLink to="/profile" className="nav-link">Profile</NavLink>
        <Link to="/cart" className="nav-link">
           Cart ({cart.length})
        </Link>
      </nav>
    </header>
  );
};

export default Header;

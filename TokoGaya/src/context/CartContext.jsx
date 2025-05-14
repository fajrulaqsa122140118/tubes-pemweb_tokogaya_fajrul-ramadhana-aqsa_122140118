import { createContext, useContext, useEffect, useState } from "react";
import './Cart.css'; // Opsional, hanya jika styling global

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Ambil data dari localStorage saat pertama kali component dimount
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // Simpan keranjang ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fungsi menambahkan produk ke keranjang
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      // Produk sudah ada → tambahkan quantity
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      // Produk baru → masukkan ke cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Fungsi menghapus produk dari keranjang
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook untuk menggunakan Cart
export const useCart = () => useContext(CartContext);

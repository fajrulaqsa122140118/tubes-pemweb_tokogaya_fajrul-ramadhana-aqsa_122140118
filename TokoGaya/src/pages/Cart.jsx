import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import './Cart.css';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();
  const navigate = useNavigate();
  
  const total = cart.reduce(
    (sum, item) => sum + item.price * 16000 * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const payload = cart.map(item => ({
      name: item.title,
      quantity: item.quantity,
      category: item.category,
      total: item.price * 16000 * item.quantity
    }));

    console.log('Payload yang dikirim:', payload); // Debug log

    try {
      const response = await fetch("http://localhost:6543/api/orderss", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status); // Debug log
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || "Gagal menyimpan pesanan");
      }

      const result = await response.json();
      console.log('Response data:', result); // Debug log
      
      alert("✅ " + result.message);
      localStorage.removeItem("cart");
      navigate("/thankyou");
      
    } catch (error) {
      alert("❌ Checkout gagal: " + error.message);
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Keranjang Belanja</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Keranjang kamu kosong.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <h3>{item.title}</h3>
                <p className="category">{item.category}</p>
                <div className="quantity-box">
                  <span>Jumlah:</span>
                  <button onClick={() => decreaseQuantity(item.id)} className="qty-btn">-</button>
                  <strong>{item.quantity}</strong>
                  <button onClick={() => increaseQuantity(item.id)} className="qty-btn">+</button>
                </div>
                <p className="price">
                  Subtotal: Rp {(item.price * 16000 * item.quantity).toLocaleString('id-ID')}
                </p>
                <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                  Hapus
                </button>
              </div>
            ))}
          </div>
          <div className="checkout-box">
            <p className="total">
              <strong>Total: Rp {total.toLocaleString('id-ID')}</strong>
            </p>
            <button className="btn-checkout" onClick={handleCheckout}>
              Checkout Sekarang
            </button>
          </div>
        </>
      )}
    </div>
  );
}
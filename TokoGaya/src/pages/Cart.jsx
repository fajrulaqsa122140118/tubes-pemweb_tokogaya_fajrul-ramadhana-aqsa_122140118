import { useCart } from "../context/CartContext";
import { useState } from "react";
import './Cart.css'; // pastikan Anda memiliki file ini

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * 16000 * item.quantity,
    0
  );

  const handleConfirm = () => {
    if (!address || !payment) {
      alert("⚠️ Harap isi alamat dan metode pembayaran.");
      return;
    }

    alert(
      `✅ Terima kasih!\nAlamat: ${address}\nMetode: ${payment}\nTotal: Rp ${total.toLocaleString('id-ID')}`
    );
    localStorage.removeItem("cart");
    window.location.reload();
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
                <p>Jumlah: <strong>{item.quantity}</strong></p>
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

            {!showForm ? (
              <button className="btn-checkout" onClick={() => setShowForm(true)}>
                Checkout Sekarang
              </button>
            ) : (
              <div className="form-box">
                <h4>Konfirmasi Pesanan</h4>

                <label>Alamat Pengantaran:</label>
                <textarea
                  rows="2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>

                <label>Metode Pembayaran:</label>
                <select
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  required
                >
                  <option value="">Pilih metode</option>
                  <option value="Transfer Bank">Transfer Bank</option>
                  <option value="COD">Bayar di Tempat (COD)</option>
                  <option value="E-Wallet">E-Wallet (OVO, DANA, dll)</option>
                </select>

                <button className="btn-confirm" onClick={handleConfirm}>
                  Konfirmasi & Bayar
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

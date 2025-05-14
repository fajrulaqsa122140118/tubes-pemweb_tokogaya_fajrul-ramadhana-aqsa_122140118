import { useCart } from "../context/CartContext";
import { useState } from "react";

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
      alert("Harap isi alamat dan pilih metode pembayaran.");
      return;
    }

    alert(
      `✅ Terima kasih! Pesanan Anda akan dikirim ke:\n${address}\nMetode: ${payment}\nTotal: Rp ${total.toLocaleString()}`
    );

    localStorage.removeItem("cart");
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛒 Keranjang Belanja</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Keranjang kosong.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex flex-col">
                <h3 className="font-semibold text-md">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-sm text-gray-700">
                  Jumlah: <strong>{item.quantity}</strong>
                </p>
                <p className="text-red-600 font-semibold">
                  Subtotal: Rp {(item.price * 16000 * item.quantity).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
              >
                Hapus
              </button>
            </div>
          ))}

          <div className="text-right pt-4 border-t mt-6">
            <p className="font-bold text-lg mb-4">
              Total: Rp {total.toLocaleString()}
            </p>

            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-sm font-semibold"
              >
                Checkout Sekarang
              </button>
            ) : (
              <div className="bg-gray-100 p-4 rounded">
                <h4 className="font-bold mb-2">Konfirmasi Pesanan</h4>
                <div className="mb-2">
                  <label className="block text-sm">Alamat Pengantaran:</label>
                  <textarea
                    rows="2"
                    className="w-full border p-2 rounded text-sm"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm">Metode Pembayaran:</label>
                  <select
                    className="w-full border p-2 rounded text-sm"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    required
                  >
                    <option value="">Pilih metode</option>
                    <option value="Transfer Bank">Transfer Bank</option>
                    <option value="COD">Bayar di Tempat (COD)</option>
                    <option value="E-Wallet">E-Wallet (OVO, DANA, dll)</option>
                  </select>
                </div>
                <button
                  onClick={handleConfirm}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-semibold"
                >
                  Konfirmasi Pembayaran
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

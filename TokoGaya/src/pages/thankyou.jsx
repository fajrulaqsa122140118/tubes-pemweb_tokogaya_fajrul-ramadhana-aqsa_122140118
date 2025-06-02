import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './thankyou.css';

export default function Checkout() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [alamat, setAlamat] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showQRIS, setShowQRIS] = useState(false);
  const navigate = useNavigate();

  // Fetch orders dari database
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Fetching orders...');
      const response = await fetch('http://localhost:6543/api/orders', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      setOrders(data.orders || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Gagal memuat pesanan: ' + error.message);
      setLoading(false);
    }
  };

  // Edit quantity
  const handleEdit = (order) => {
    setEditingId(order.id);
    setEditQuantity(order.quantity.toString());
  };

  const saveEdit = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:6543/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ quantity: parseInt(editQuantity) })
      });

      if (response.ok) {
        setEditingId(null);
        setEditQuantity('');
        fetchOrders(); // Refresh data
        alert('Pesanan berhasil diupdate');
      } else {
        const errorData = await response.json();
        alert('Gagal mengupdate pesanan: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Terjadi kesalahan saat mengupdate pesanan: ' + error.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditQuantity('');
  };

  // Hapus order
  const deleteOrder = async (orderId) => {
    /* eslint-disable no-restricted-globals */
    if (confirm('Yakin ingin menghapus item ini?')) {
      try {
        const response = await fetch(`http://localhost:6543/api/ordersss/${orderId}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          fetchOrders(); // Refresh data
          alert('Pesanan berhasil dihapus');
        } else {
          const errorData = await response.json();
          alert('Gagal menghapus pesanan: ' + (errorData.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Terjadi kesalahan saat menghapus pesanan: ' + error.message);
      }
    }
  };

  // Batalkan transaksi
  const cancelTransaction = async () => {
    if (confirm('Yakin ingin membatalkan transaksi? Semua pesanan akan dihapus.')) {
      try {
        const response = await fetch('http://localhost:6543/api/orders/clear', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          localStorage.removeItem('cart');
          alert('Transaksi dibatalkan');
          navigate('/');
        } else {
          const errorData = await response.json();
          alert('Gagal membatalkan transaksi: ' + (errorData.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error canceling transaction:', error);
        alert('Terjadi kesalahan saat membatalkan transaksi: ' + error.message);
      }
    }
  };

  // Handle payment method change
  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
    if (method === 'qris') {
      setShowQRIS(true);
    } else {
      setShowQRIS(false);
    }
  };

  // Process payment
  const processPayment = async () => {
    if (!alamat.trim()) {
      alert('Harap isi alamat pengiriman');
      return;
    }

    if (!paymentMethod) {
      alert('Harap pilih metode pembayaran');
      return;
    }

    const totalAmount = orders.reduce((sum, order) => sum + order.total_price, 0);

    // Clear orders after payment
    try {
      const response = await fetch('http://localhost:6543/api/orders/clear', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        localStorage.removeItem('cart');
        
        alert(`✅ Pembayaran telah selesai! 
📦 Pesanan akan dikirim ke: ${alamat}
💰 Total: Rp ${totalAmount.toLocaleString('id-ID')}`);
        
        navigate('/');
      } else {
        throw new Error('Gagal memproses pembayaran');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Terjadi kesalahan saat memproses pembayaran: ' + error.message);
    }
  };

  const totalAmount = orders.reduce((sum, order) => sum + order.total_price, 0);

  if (loading) {
    return (
      <div className="checkout-container">
        <div className="checkout-loading">
          <h2>⏳ Loading pesanan...</h2>
          <p>Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="checkout-container">
        <div className="checkout-error">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <button onClick={fetchOrders} className="btn-retry">
            🔄 Coba Lagi
          </button>
          <button onClick={() => navigate('/')} className="btn-home">
            🏠 Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>🛒 Checkout</h1>
        </div>
        <div className="empty-checkout">
          <h2>📭 Tidak ada pesanan</h2>
          <p>Belum ada pesanan untuk di-checkout. Silakan tambahkan produk ke keranjang terlebih dahulu.</p>
          <button onClick={() => navigate('/')} className="btn-home">
            🏠 Kembali ke Home
          </button>
          <button onClick={fetchOrders} className="btn-retry">
            🔄 Refresh Pesanan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>🛒 Checkout</h1>
        <p>Silakan tinjau pesanan Anda sebelum melanjutkan pembayaran</p>
        <p className="debug-info">Total pesanan: {orders.length} item</p>
      </div>

      {/* Order Table */}
      <div className="order-section">
        <h2>📋 Daftar Pesanan</h2>
        <div className="order-table">
          {orders.map((order) => (
            <div key={order.id} className="order-item">
              <div className="order-info">
                <h3>{order.product_name}</h3>
                <p className="category">{order.category}</p>
                <p className="order-id">ID: {order.id}</p>
              </div>
              
              <div className="quantity-section">
                {editingId === order.id ? (
                  <div className="edit-quantity">
                    <input
                      type="number"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(e.target.value)}
                      min="1"
                      className="quantity-input"
                    />
                    <button onClick={() => saveEdit(order.id)} className="btn-save">
                      ✅
                    </button>
                    <button onClick={cancelEdit} className="btn-cancel-edit">
                      ❌
                    </button>
                  </div>
                ) : (
                  <div className="quantity-display">
                    <span>Qty: {order.quantity}</span>
                    <button onClick={() => handleEdit(order)} className="btn-edit">
                      ✏️ Edit
                    </button>
                  </div>
                )}
              </div>

              <div className="price-section">
                <p className="total-price">
                  Rp {order.total_price.toLocaleString('id-ID')}
                </p>
                <button 
                  onClick={() => deleteOrder(order.id)} 
                  className="btn-delete"
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="total-section">
          <h3>Total Keseluruhan: Rp {totalAmount.toLocaleString('id-ID')}</h3>
        </div>
      </div>

      {/* Address Form */}
      <div className="address-section">
        <h2>📍 Alamat Pengiriman</h2>
        <textarea
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          placeholder="Masukkan alamat lengkap pengiriman..."
          className="address-input"
          rows="3"
        />
      </div>

      {/* Payment Method */}
      <div className="payment-section">
        <h2>💳 Metode Pembayaran</h2>
        <div className="payment-options">
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="cod"
              onChange={(e) => handlePaymentChange(e.target.value)}
            />
            <span>💰 Cash on Delivery (COD)</span>
          </label>
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="transfer"
              onChange={(e) => handlePaymentChange(e.target.value)}
            />
            <span>🏦 Transfer Bank</span>
          </label>
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="qris"
              onChange={(e) => handlePaymentChange(e.target.value)}
            />
            <span>📱 QRIS</span>
          </label>
        </div>

        {/* QRIS Display */}
        {showQRIS && (
          <div className="qris-section">
            <div className="qris-container">
              <h3>Scan QRIS untuk Pembayaran</h3>
              <div className="qris-code">
                <div className="qr-placeholder">
                  <p>📱</p>
                  <p>QR Code</p>
                  <p>Rp {totalAmount.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <p>Scan dengan aplikasi e-wallet Anda</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="checkout-actions">
        <button onClick={cancelTransaction} className="btn-cancel-transaction">
          ❌ Batalkan Transaksi
        </button>
        <button onClick={processPayment} className="btn-pay">
          💳 Bayar Sekarang
        </button>
      </div>
    </div>
  );
}
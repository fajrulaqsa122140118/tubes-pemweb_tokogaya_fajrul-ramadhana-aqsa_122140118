import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Promo from './pages/Promo';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import FilterPage from './pages/FilterPage';
import Cart from "./pages/Cart";
import RegisterPage from './pages/RegisterPage';



function App() {
  const location = useLocation();
  const hideHeaderPaths = ['/login'];

  return (
    <>
      {/* Sembunyikan Header di halaman tertentu seperti /login */}
      {!hideHeaderPaths.includes(location.pathname.toLowerCase()) && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("user") ? <Home /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

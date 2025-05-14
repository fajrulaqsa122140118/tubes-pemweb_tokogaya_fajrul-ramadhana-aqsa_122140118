import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Halo Admin!</h1>
      <p className="mt-2">Ini adalah halaman dashboard khusus untuk admin.</p>
    </div>
  );
}

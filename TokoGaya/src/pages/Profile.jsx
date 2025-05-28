import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; // tambahkan CSS ini

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        address: parsedUser.address || "",
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!user.email.includes('@gmail.com')) {
      alert("Email harus menggunakan @gmail.com");
      return;
    }
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 Profil Pengguna</h2>

      <div className="profile-card">
        <p><strong>Nama:</strong> {isEditing ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        ) : (
          <span> {user.name}</span>
        )}</p>

        <p><strong>Email:</strong> {user.email}</p>

        <p><strong>Alamat:</strong> {isEditing ? (
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        ) : (
          <span> {user.address}</span>
        )}</p>

        <p><strong>Bergabung Sejak:</strong> {user.joined}</p>
      </div>

      <div className="profile-actions">
        {!isEditing ? (
          <button className="btn-edit" onClick={handleEditToggle}>
            Edit Profil
          </button>
        ) : (
          <button className="btn-save" onClick={handleSave}>
            Simpan
          </button>
        )}
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

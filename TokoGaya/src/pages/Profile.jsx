import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    address: "Jl. Dummy Street No. 1",
  });

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser) return navigate("/login");
    const parsedUser = JSON.parse(localUser);

    fetch(`http://127.0.0.1:6543/api/profile?user_id=${parsedUser.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal ambil data profil");
        return res.json();
      })
      .then((data) => {
        setUser({ ...data, joined: parsedUser.joined });
        setFormData({
          username: data.username,
          address: "Jl. Dummy Street No. 1"
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal memuat data profil.");
        navigate("/login");
      });
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
    if (!user.email.includes("@gmail.com")) {
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
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        ) : (
          <span> {user.username}</span>
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
          <span> {formData.address}</span>
        )}</p>

        <p><strong>Bergabung Sejak:</strong> 24 Mei 2025</p>
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

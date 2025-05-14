import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form input sementara
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    joined: ""
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
        joined: parsedUser.joined || ""
      });
    }
  }, []);

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
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="profile-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '70vh' }}>
      <h2 style={{ marginBottom: '20px' }}>👤 Profil Pengguna</h2>
      <div className="profile-card" style={{
        backgroundColor: 'white',
        padding: '20px 30px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minWidth: '300px',
        textAlign: 'left'
      }}>
        <p><strong>Nama:</strong>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ marginLeft: 10 }}
            />
          ) : (
            <span> {user.name}</span>
          )}
        </p>

        <p><strong>Email:</strong> {user.email}</p>

        <p><strong>Alamat:</strong>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              style={{ marginLeft: 10 }}
            />
          ) : (
            <span> {user.address}</span>
          )}
        </p>

        <p><strong>Bergabung Sejak:</strong>
          {isEditing ? (
            <input
              type="text"
              name="joined"
              value={formData.joined}
              onChange={handleInputChange}
              style={{ marginLeft: 10 }}
            />
          ) : (
            <span> {user.joined}</span>
          )}
        </p>
      </div>

      <div style={{ marginTop: 20 }}>
        {!isEditing ? (
          <button onClick={handleEditToggle} style={buttonStyle}>
            Edit Profil
          </button>
        ) : (
          <button onClick={handleSave} style={buttonStyle}>
            Simpan
          </button>
        )}
        <button onClick={handleLogout} style={{ ...buttonStyle, marginLeft: 10, backgroundColor: '#ef4444' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

export default Profile;
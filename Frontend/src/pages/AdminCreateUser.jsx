import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminCreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:3000/api/auth/create-user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setSuccessMsg("User created successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "employee",
      });
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "User creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <div className="glass-panel form-shell fade-up max-w-3xl">
        <div className="mb-8">
          <p className="section-eyebrow">Access Control</p>
          <h2 className="section-title">Create new user</h2>
          <p className="section-copy">
            Add admins, HR users, or employees with a cleaner account creation
            flow.
          </p>
        </div>

        {successMsg && (
          <p className="feedback-banner feedback-banner-success">
            {successMsg}
          </p>
        )}
        {errorMsg && (
          <p className="feedback-banner feedback-banner-error">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label className="field-label">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="field-input mt-2 w-full"
              />
            </div>

            <div>
              <label className="field-label">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="field-input mt-2 w-full"
              />
            </div>

            <div>
              <label className="field-label">Temporary Password</label>
              <input
                type="password"
                name="password"
                placeholder="Temporary Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="field-input mt-2 w-full"
              />
            </div>

            <div>
              <label className="field-label">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="field-input mt-2 w-full"
              >
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className="primary-button w-full disabled:opacity-50 sm:w-auto"
            >
              {loading ? "Creating..." : "Create User"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="action-button action-button-warn w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateUser;

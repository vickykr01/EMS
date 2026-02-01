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
      const response = await axios.post(
        "https://ems-server-i55t.onrender.com/api/auth/create-user",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Create New User</h2>

        {successMsg && <p className="text-green-600 mb-3">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 mb-3">{errorMsg}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Temporary Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-3"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create User"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full mt-3 border py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AdminCreateUser;

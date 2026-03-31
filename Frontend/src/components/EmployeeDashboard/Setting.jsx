import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [setting, setSetting] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      setError("User not found");
      return;
    }

    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched!");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/api/setting/change-password",
        { ...setting, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        setError("");
        navigate("/employee-dashboard");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Something went wrong");
      } else {
        setError("Server error");
      }
    }
  };

  return (
    <div className="dashboard-content">
      <div className="glass-panel form-shell fade-up max-w-3xl">
        <div className="mb-8">
          <p className="section-eyebrow">Security</p>
          <h2 className="section-title">Change password</h2>
          <p className="section-copy">
            Keep your account secure with a clearer password update form.
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label className="field-label">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              onChange={handleChange}
              className="field-input mt-2 w-full"
              required
            />
          </div>

          <div>
            <label className="field-label">New Password</label>
            <input
              type="password"
              name="newPassword"
              onChange={handleChange}
              className="field-input mt-2 w-full"
              required
            />
          </div>

          <div>
            <label className="field-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              className="field-input mt-2 w-full"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button w-full sm:w-auto">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;

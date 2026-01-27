import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        },
      );

      if (response.data.success) {
        const { token, user } = response.data;

        // Store in context and localStorage
        login({ ...user, token });
        localStorage.setItem("token", token);

        // Role-based redirect
        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (user.role === "employee") {
          navigate("/employee-dashboard");
        } else {
          navigate("/login"); // fallback for unknown role
        }
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Server error";
      setError(msg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-teal-600 to-gray-100 space-y-6">
      <h2 className="text-3xl font-bold text-white font-outfit">
        Employee Management System
      </h2>

      <div className="bg-white shadow p-6 w-80 rounded">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <span className="text-teal-600 cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded"
          >
            Login
          </button>

          <p className="text-center mt-3 text-sm">
            Don’t have an account?{" "}
            <span
              className="text-teal-600 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

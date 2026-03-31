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
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data;
        login({ ...user, token });
        localStorage.setItem("token", token);

        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (user.role === "employee") {
          navigate("/employee-dashboard");
        } else {
          navigate("/login");
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
    <div className="auth-shell">
      <div className="auth-grid">
        <section className="auth-showcase fade-up">
          <p className="text-sm uppercase tracking-[0.35em] text-white/65">
            Workforce Control Center
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
            Run your employee system with a cleaner, calmer dashboard.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/78">
            Track employees, departments, leave activity, and payroll from one
            polished workspace designed to feel modern instead of mechanical.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur">
              <p className="text-3xl font-bold">24/7</p>
              <p className="mt-1 text-sm text-white/70">Access anywhere</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur">
              <p className="text-3xl font-bold">Smart</p>
              <p className="mt-1 text-sm text-white/70">Role-based flow</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur">
              <p className="text-3xl font-bold">Fast</p>
              <p className="mt-1 text-sm text-white/70">Simple operations</p>
            </div>
          </div>
        </section>

        <section className="auth-card fade-up fade-up-delay-1">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-[var(--brand-main)]">
              Employee Management System
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to your dashboard.
            </p>
          </div>

          {error && (
            <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="field-shell">
              <label className="field-label">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="field-input"
              />
            </div>

            <div className="field-shell">
              <label className="field-label">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="field-input"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-slate-500">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="accent-[var(--brand-main)]" />
                <span>Remember me</span>
              </label>
              <span className="cursor-pointer text-[var(--brand-main)]">
                Secure access
              </span>
            </div>

            <button type="submit" className="primary-button w-full">
              Login
            </button>

            <p className="text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <span
                className="cursor-pointer font-semibold text-[var(--brand-main)]"
                onClick={() => navigate("/signup")}
              >
                Create one
              </span>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;

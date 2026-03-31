import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://ems-server-i55t.onrender.com/api/auth/signup", formData);

      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-grid">
        <section className="auth-showcase fade-up">
          <p className="text-sm uppercase tracking-[0.35em] text-white/65">
            Onboard Smoothly
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
            Create your employee account in a space that feels built for now.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/78">
            Join a system that keeps attendance, payroll, and leave operations
            organized without cluttering the experience.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="auth-card fade-up fade-up-delay-1">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-[var(--brand-main)]">
              Employee Signup
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Create account</h2>
          </div>

          <div className="space-y-5">
            <div className="field-shell">
              <label className="field-label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                onChange={handleChange}
                required
                className="field-input"
              />
            </div>

            <div className="field-shell">
              <label className="field-label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                onChange={handleChange}
                required
                className="field-input"
              />
            </div>

            <div className="field-shell">
              <label className="field-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                onChange={handleChange}
                required
                className="field-input"
              />
            </div>

            <button className="primary-button w-full">Signup</button>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <span
                className="cursor-pointer font-semibold text-[var(--brand-main)]"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

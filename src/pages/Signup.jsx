import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (type, message) => {

    setToast({ type, message });

    setTimeout(() => {
      setToast(null);
    }, 3000);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      showToast("error", "All fields are required.");
      return;
    }

    if (formData.password.length < 6) {
      showToast("error", "Password must be at least 6 characters.");
      return;
    }

    try {

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message || "Signup failed");
        return;
      }

      /* store user name */
      localStorage.setItem("userName", formData.name);

      /* store token */
      localStorage.setItem("token", data.token);

      /* store auth type */
      localStorage.setItem("authType", "signup");

      showToast("success", "Account created successfully 🎉");

      setTimeout(() => {
        window.location.href = "/";
      }, 1200);

    } catch (error) {

      console.error(error);
      showToast("error", "Server error. Please try again.");

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f3ff] via-[#ede9fe] to-[#e9d5ff] px-6 relative overflow-hidden">

      {toast && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 animate-premiumToast">
          <div
            className={`px-10 py-5 rounded-2xl backdrop-blur-xl shadow-2xl border text-lg font-semibold
            ${
              toast.type === "error"
                ? "bg-red-500/20 border-red-400 text-red-700"
                : "bg-green-500/20 border-green-400 text-green-700"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-purple-100">

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Decisio<span className="text-purple-600">X</span>
        </h1>

        <h2 className="text-3xl font-semibold text-gray-800 text-center mt-4">
          Create Account
        </h2>

        <p className="text-gray-500 text-sm text-center mt-2 mb-8">
          Start building smarter financial decisions.
        </p>

        <div className="mb-4">
          <label className="text-sm text-gray-700 block mb-2">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Enter your full name"
            className="w-full p-3 rounded-xl border border-purple-200 text-gray-800 bg-white focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-700 block mb-2">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            autoComplete="off"
            placeholder="Enter your email"
            className="w-full p-3 rounded-xl border border-purple-200 text-gray-800 bg-white focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-700 block mb-2">Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            autoComplete="new-password"
            placeholder="Create password"
            className="w-full p-3 rounded-xl border border-purple-200 text-gray-800 bg-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 transition"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl"
        >
          Sign Up
        </button>

        <p className="text-gray-500 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-medium hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;
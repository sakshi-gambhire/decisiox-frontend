import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {

  const [formData, setFormData] = useState({
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

    if (!formData.email || !formData.password) {
      showToast("error", "Please fill all fields properly.");
      return;
    }

    try {

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        showToast("error", data.message || "Invalid email or password");
        return;
      }

      /* store token */
      // clear previous session
localStorage.clear();

/* store new login session */
localStorage.setItem("token", data.token);
localStorage.setItem("userEmail", data.user.email);
localStorage.setItem("userEmail", data.user.email);
      if (data.user && data.user.name) {
        localStorage.setItem("userName", data.user.name);
      }
      localStorage.setItem("role", data.user.role);
      /* store auth type */
      localStorage.setItem("authType", "login");

      showToast("success", "Login Successful 🎉");

      setTimeout(() => {
        window.location.href = "/simulator";
      }, 1000);

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
          Welcome Back
        </h2>

        <p className="text-gray-500 text-sm text-center mt-2 mb-8">
          Login to continue your smart investment journey.
        </p>

        <div className="mb-5">
          <label className="text-sm text-gray-700 block mb-2">
            Email Address
          </label>
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
          <label className="text-sm text-gray-700 block mb-2">
            Password
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-xl border border-purple-200 text-gray-800 bg-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 transition"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl"
        >
          Login
        </button>

        <p className="text-gray-500 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-medium hover:underline">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
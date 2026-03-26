import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  /* global google */

  if (window.google) {
    google.accounts.id.initialize({
      client_id: "498968811146-mir587bc82pfb4g0076c74q5abn4vt4m.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });

    // ✅ THIS IS THE IMPORTANT PART
    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      {
        theme: "outline",
        size: "large",
        width: 320,
      }
    );
  }
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showToast("error", "Enter a valid email address");
      return;
    }

    if (!formData.password) {
      showToast("error", "Password is required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://decisiox-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("authType", "login");

      showToast("success", "Login Successful");

      setTimeout(() => {
        window.location.href = "/simulator";
      }, 1000);
    } catch (error) {
      console.error(error);
      showToast("error", "Server error");
    }

    setLoading(false);
  };



  const handleGoogleResponse = async (response) => {
    try {
      const res = await fetch("https://decisiox-backend.onrender.com/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: response.credential,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast("error", "Google login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("role", data.user.role);

      showToast("success", "Google Login Successful 🎉");

      setTimeout(() => {
        window.location.href = "/simulator";
      }, 1000);
    } catch (error) {
      console.error(error);
      showToast("error", "Google login error");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f3ff] via-[#ede9fe] to-[#e9d5ff] px-6">

    {toast && (
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50">
        <div className="px-6 py-3 rounded-xl bg-white shadow">
          {toast.message}
        </div>
      </div>
    )}

    <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-purple-100">

      {/* LOGO */}
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
        Decisio<span className="text-purple-600">X</span>
      </h1>

      {/* TITLE */}
      <h2 className="text-3xl font-semibold text-gray-800 text-center mt-4">
        Welcome Back
      </h2>

      <p className="text-gray-500 text-sm text-center mt-2 mb-8">
        Continue making smarter financial decisions.
      </p>

      {/* EMAIL */}
      <div className="mb-4">
        <input
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full p-3 rounded-xl border border-purple-200 text-gray-800 bg-white focus:ring-2 focus:ring-purple-400 outline-none"
        />
      </div>

      {/* PASSWORD */}
      <div className="mb-6">
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full p-3 rounded-xl border border-purple-200 text-gray-800 bg-white focus:ring-2 focus:ring-purple-400 outline-none"
        />
      </div>

      {/* LOGIN BUTTON */}
      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-semibold hover:opacity-95 transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* DIVIDER */}
      <div className="flex items-center my-5">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-3 text-sm text-gray-500">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* GOOGLE BUTTON (FIXED WHITE) */}
    <div className="w-full flex justify-center mt-2">
  <div id="googleBtn"></div>
</div>

      {/* SIGNUP LINK */}
      <p className="text-center mt-6 text-gray-500">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-purple-600 font-semibold hover:underline">
          Create Account
        </Link>
      </p>

    </div>
  </div>
);

}

export default Login;
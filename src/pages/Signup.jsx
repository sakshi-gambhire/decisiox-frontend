
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [toast, setToast] = useState(null);
  useEffect(() => {
  /* global google */

  if (window.google) {
    google.accounts.id.initialize({
      client_id: "498968811146-mir587bc82pfb4g0076c74q5abn4vt4m.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleBtnSignup"),
      {
        theme: "outline",
        size: "large",
        width: 320,
      }
    );
  }
}, []);

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "name") {
    // prevent multiple spaces
    setFormData({
      ...formData,
      name: value.replace(/\s{2,}/g, " "),
    });
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

  const showToast = (type, message) => {

    setToast({ type, message });

    setTimeout(() => {
      setToast(null);
    }, 3000);

  };

  const handleSubmit = async (e) => {
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
  showToast("error", "Enter a valid email");
  return;
}


const password = formData.password;

// length check
if (password.length < 6) {
  showToast("error", "Password must be at least 6 characters.");
  return;
}

// 🔥 NEW: strong password check
if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
  showToast("error", "Password must contain letters and numbers.");
  return;
}

    e.preventDefault();

    if (!formData.name.trim()) {
  showToast("error", "Full name is required");
  return;
}

if (!formData.email.trim()) {
  showToast("error", "Email is required");
  return;
}

if (!formData.password.trim()) {
  showToast("error", "Password is required");
  return;
}
    // 🔥 EMAIL VALIDATION
if (!/\S+@\S+\.\S+/.test(formData.email)) {
  showToast("error", "Enter a valid email address");
  return;
}

    if (formData.password.length < 6) {
      showToast("error", "Password must be at least 6 characters.");
      return;
    }

    try {

      const response = await fetch("https://decisiox-backend.onrender.com/api/auth/signup", {
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
      localStorage.setItem("userName", data.user.name);
localStorage.setItem("role", data.user.role);

      /* store token */
      localStorage.setItem("token", data.token);

      /* store auth type */
      localStorage.setItem("authType", "signup");

      showToast("success", "Account created successfully");

      setTimeout(() => {
        window.location.href = "/";
      }, 1200);

    } catch (error) {

      console.error(error);
      showToast("error", "Server error. Please try again.");

    }

  };
  // ✅ GOOGLE LOGIN HANDLER


// ✅ GOOGLE RESPONSE HANDLER
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
      showToast("error", "Google signup failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.user.name);
    localStorage.setItem("userEmail", data.user.email);
    localStorage.setItem("role", data.user.role);

    showToast("success", "Google Signup Successful");

    setTimeout(() => {
      window.location.href = "/simulator";
    }, 1000);

  } catch (error) {
    console.error(error);
    showToast("error", "Google signup error");
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
          
         <input
  name="name"
  value={formData.name}
  onChange={handleChange}
  type="text"
  required
  placeholder="Enter your full name"
  className="w-full p-3 rounded-xl border border-purple-200 text-gray-800 bg-white focus:ring-2 focus:ring-purple-400"
/>
        </div>

        <div className="mb-4">
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
  disabled={
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.password.trim()
  }
  className={`w-full py-3 rounded-xl font-semibold transition ${
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.password.trim()
      ? "!bg-purple-700 !text-white cursor-not-allowed"
      : "!bg-gradient-to-r !from-purple-600 !to-purple-700 !text-white hover:opacity-95"
  }`}
>
  Sign Up
</button>
        {/* DIVIDER */}
<div className="flex items-center my-5">
  <div className="flex-1 h-px bg-gray-300"></div>
  <span className="px-3 text-sm text-gray-500">or</span>
  <div className="flex-1 h-px bg-gray-300"></div>
</div>

{/* GOOGLE BUTTON */}
<div className="w-full flex justify-center mt-2">
  <div id="googleBtnSignup"></div>
</div>

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
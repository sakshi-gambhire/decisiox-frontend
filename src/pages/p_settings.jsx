import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function PSettings() {
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch("https://decisio-x-lu67.onrender.com/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setEmail(data.user.email);
        setName(data.user.name);
      }

    } catch (error) {
      console.error("Failed to fetch profile");
    }
  };

  fetchProfile();
}, []);
  const [name, setName] = useState(localStorage.getItem("userName") || "");
const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("token");

  // NEW: button status states
  const [saveStatus, setSaveStatus] = useState("idle");
  const [passwordStatus, setPasswordStatus] = useState("idle");

  const updateProfile = async () => {

    try {

      setSaveStatus("saving");

      const res = await fetch("https://decisio-x-lu67.onrender.com/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email
        })
      });

      const data = await res.json();

      if (res.ok) {

        localStorage.setItem("userName", name);

        toast.success("Profile updated successfully");

        setSaveStatus("saved");

        setTimeout(() => {
          setSaveStatus("idle");
        }, 2000);

      } else {

        toast.error(data.message);
        setSaveStatus("idle");

      }

    } catch (error) {

      toast.error("Server error");
      setSaveStatus("idle");

    }

  };

  const changePassword = async () => {

    try {

      setPasswordStatus("saving");

      const res = await fetch("https://decisio-x-lu67.onrender.com/api/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {

        toast.success("Password changed successfully");

        setCurrentPassword("");
        setNewPassword("");

        setPasswordStatus("saved");

        setTimeout(() => {
          setPasswordStatus("idle");
        }, 2000);

      } else {

        toast.error(data.message);
        setPasswordStatus("idle");

      }

    } catch (error) {

      toast.error("Server error");
      setPasswordStatus("idle");

    }

  };

  return (

    <div className="max-w-4xl mx-auto mt-14 px-6 animate-fadeIn">

      <h1 className="text-3xl font-bold text-white mb-10">
        Account Settings
      </h1>

      {/* PROFILE INFORMATION */}

      <div className="bg-white border border-purple-100 rounded-2xl p-8 shadow-md mb-10">

        <h2 className="text-xl font-semibold text-purple-600 mb-6">
          Profile Information
        </h2>

        <div className="space-y-4">

          <label className="text-gray-600 text-sm">
            Full Name
          </label>

          <input
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3
            text-gray-800
            focus:outline-none focus:ring-2 focus:ring-purple-400
            transition"
          />

          <button
            onClick={updateProfile}
            className={`px-6 py-3 rounded-lg transition
            ${
              saveStatus === "saved"
                ? "bg-green-500 text-white"
                : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            {saveStatus === "saving" && "Saving..."}
            {saveStatus === "saved" && "Saved ✓"}
            {saveStatus === "idle" && "Save Changes"}
          </button>

        </div>

      </div>

      {/* ACCOUNT EMAIL */}

      <div className="bg-white border border-purple-100 rounded-2xl p-8 shadow-md mb-10">

        <h2 className="text-xl font-semibold text-purple-600 mb-6">
          Account Email
        </h2>

        <div className="space-y-2">

          <p className="text-gray-500 text-sm">
            Your login email address
          </p>

          <div className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-700">
            {email}
          </div>

        </div>

      </div>

      {/* SECURITY SETTINGS */}

      <div className="bg-white/95 backdrop-blur-md border border-purple-100 rounded-2xl p-8 shadow-lg transition duration-300 hover:shadow-xl hover:-translate-y-1">

        <h2 className="text-xl font-semibold text-purple-600 mb-6">
          Security
        </h2>

        <div className="space-y-5">

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword || ""}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3
            text-gray-800 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400
            transition duration-200"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword || ""}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3
            text-gray-800 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400
            transition duration-200"
          />

          <button
            onClick={changePassword}
            className={`px-6 py-3 rounded-lg transition
            ${
              passwordStatus === "saved"
                ? "bg-green-500 text-white"
                : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            {passwordStatus === "saving" && "Updating..."}
            {passwordStatus === "saved" && "Password Updated ✓"}
            {passwordStatus === "idle" && "Change Password"}
          </button>

        </div>

      </div>

    </div>

  );
}

export default PSettings;
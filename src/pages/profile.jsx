import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Profile() {

  const [user, setUser] = useState(null);
  const [memberSince, setMemberSince] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  const token = localStorage.getItem("token");

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

          setUser(data.user);

          const createdDate = new Date(data.user.created_at || Date.now());
          setMemberSince(createdDate.toLocaleDateString());

          setLastLogin(new Date().toLocaleString());

        } else {
          toast.error("Failed to load profile");
        }

      } catch (error) {
        toast.error("Server error");
      }

    };

    fetchProfile();

  }, []);

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (

    <div className="max-w-4xl mx-auto mt-12 px-6 animate-fadeIn">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white mb-10">
        Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-white border border-purple-100 rounded-2xl p-8 shadow-sm transition duration-300 hover:shadow-lg">

        {/* Avatar + Email */}
        <div className="flex items-center gap-6 mb-8">

          {/* Avatar */}
          <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center shadow-md 
                          transition-transform duration-300 hover:scale-110">

            <span className="text-white text-3xl font-bold">
              {localStorage.getItem("userName")?.charAt(0).toUpperCase()}
            </span>

          </div>

          {/* Email */}
          <div>
            <p className="text-gray-600 text-lg">
              {user.email}
            </p>
          </div>

        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-6">

          <div className="bg-purple-50 p-5 rounded-xl shadow-sm 
                          transition duration-300 hover:shadow-md hover:-translate-y-1">

            <p className="text-gray-500 text-sm">Account Role</p>

            <p className="font-semibold text-purple-600 text-lg">
              {user.role}
            </p>

          </div>

          <div className="bg-purple-50 p-5 rounded-xl shadow-sm 
                          transition duration-300 hover:shadow-md hover:-translate-y-1">

            <p className="text-gray-500 text-sm">Account Type</p>

            <p className="font-semibold text-purple-600 text-lg">
              Standard User
            </p>

          </div>

          <div className="bg-purple-50 p-5 rounded-xl shadow-sm 
                          transition duration-300 hover:shadow-md hover:-translate-y-1">

            <p className="text-gray-500 text-sm">Member Since</p>

            <p className="font-semibold text-purple-600 text-lg">
              {memberSince}
            </p>

          </div>

          <div className="bg-purple-50 p-5 rounded-xl shadow-sm 
                          transition duration-300 hover:shadow-md hover:-translate-y-1">

            <p className="text-gray-500 text-sm">Last Login</p>

            <p className="font-semibold text-purple-600 text-lg">
              {lastLogin}
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Profile;
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserCircle } from "phosphor-react";
import toast from "react-hot-toast";

function Navbar() {

  const location = useLocation();

  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState(null);
  const [authType, setAuthType] = useState(null);
  const [role, setRole] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const confirmLogout = () => {

    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("authType");
    localStorage.removeItem("role");

    setShowLogoutConfirm(false);

    toast.success("Logged out successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 1200);
  };

  useEffect(() => {

    const storedName = localStorage.getItem("userName");
    const storedToken = localStorage.getItem("token");
    const storedAuthType = localStorage.getItem("authType");
    const storedRole = localStorage.getItem("role");

    setUserName(storedName);
    setToken(storedToken);
    setAuthType(storedAuthType);
    setRole(storedRole);

  }, [location]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-purple-100 shadow-sm">

        <div className="max-w-7xl mx-auto px-10 py-5 flex justify-between items-center">

          <Link to="/" className="text-4xl font-bold tracking-tight text-gray-900">
            Decisio<span className="text-purple-500">X</span>
          </Link>

          <div className="hidden md:flex items-center space-x-10 text-lg font-semibold text-gray-800">

            <Link to="/" className="hover:text-purple-600">Home</Link>

            <Link to="/simulator" className="hover:text-purple-600">Simulator</Link>

            {!token ? (
              <>
                <Link to="/login">Login</Link>

                <Link
                  to="/signup"
                  className="bg-purple-500 text-white px-6 py-2 rounded-xl"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="text-purple-600">
                  {authType === "login"
                    ? `Welcome back ${userName}`
                    : `Hi ${userName}`}
                </span>

                {role === "admin" && (
                  <Link to="/admin">Admin</Link>
                )}

                <div className="relative">

                  <button
                    onClick={() => setOpenProfile(!openProfile)}
                    className="flex items-center gap-3 px-5 py-2 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 transition"
                    style={{ backgroundColor: "#F3E8FF" }}
                  >
                    <UserCircle
                      size={30}
                      className={`text-purple-600 transition-transform duration-300 ${
                        openProfile ? "rotate-12" : ""
                      }`}
                    />
                  </button>

                  {openProfile && (
                    <div className="absolute right-0 mt-3 w-56 !bg-white border border-purple-100 rounded-2xl shadow-lg overflow-hidden dropdown-animate">

                      <Link
                        to="/profile"
                        className="block px-5 py-3 text-purple-600 hover:bg-purple-50 transition-all duration-200"
                      >
                        Profile
                      </Link>

                      <Link
                        to="/settings"
                        className="block px-5 py-3 text-purple-600 hover:bg-purple-50 transition-all duration-200"
                      >
                        Settings
                      </Link>

                      <div className="border-t border-purple-100"></div>

                      <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-50 transition-all duration-200 font-semibold !bg-white"
                      >
                        Logout
                      </button>

                    </div>
                  )}

                </div>

              </>
            )}

          </div>

        </div>

      </nav>

      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">

          <div className="bg-white rounded-2xl shadow-xl p-6 w-80">

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Logout
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
}

export default Navbar;
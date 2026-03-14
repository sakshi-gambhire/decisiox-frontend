import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import Home from "./pages/Home";
import Simulator from "./pages/Simulator";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { Toaster } from "react-hot-toast";

import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";

import Profile from "./pages/profile";
import Users from "./pages/User";

import Settings from "./pages/Settings";   // admin settings
import PSettings from "./pages/p_settings"; // user settings

function App() {

  return (

    <div className="min-h-screen flex flex-col">

      <Toaster position="top-right" />

      <Navbar />

      <div className="flex-grow">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/simulator"
            element={
              <ProtectedRoute>
                <Simulator />
              </ProtectedRoute>
            }
          />

          <Route path="/profile" element={<Profile />} />

          {/* USER SETTINGS PAGE */}
          <Route path="/settings" element={<PSettings />} />

          {/* ADMIN ROUTES */}

          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >

            <Route index element={<AdminDashboard />} />

            <Route path="users" element={<Users />} />

            <Route path="settings" element={<Settings />} />

          </Route>

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

        </Routes>

      </div>

      <Footer />

    </div>

  );
}

export default App;
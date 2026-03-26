import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Settings() {

  const [appName, setAppName] = useState("DecisioX");
  const [adminEmail, setAdminEmail] = useState("admin@decisiox.com");
  const [riskThreshold, setRiskThreshold] = useState(50);
  const [toast, setToast] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");
  useEffect(() => {
    const saved = localStorage.getItem("adminSettings");

    if (saved) {
      const parsed = JSON.parse(saved);

      setAppName(parsed.appName || "DecisioX");
      setAdminEmail(parsed.adminEmail || "admin@decisiox.com");
      setRiskThreshold(parsed.riskThreshold || 50);
    }

  }, []);
const handleSave = async () => {

  try {

    setSaveStatus("saving");

    const token = localStorage.getItem("token");

    const res = await fetch("https://decisiox-backend.onrender.com/api/admin/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        appName,
        adminEmail,
        riskThreshold
      })
    });

    const data = await res.json();

    if (data.success) {

      localStorage.setItem("adminSettings", JSON.stringify({
        appName,
        adminEmail,
        riskThreshold
      }));

      setSaveStatus("saved");

      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);

    }

  } catch (error) {

    console.error("Save settings error:", error);
    setSaveStatus("idle");

  }

};
  return (

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >

      {/* Title */}

      <h1 className="text-3xl font-bold text-gray-900">
        Admin Settings
      </h1>

      {/* Success Toast */}

      {toast && (

        <div className="fixed top-6 right-6 bg-green-50
         text-white px-6 py-3 rounded-xl shadow-lg z-50">
          Settings saved successfully
        </div>

      )}

      {/* Settings Card */}

      <motion.div
        whileHover={{ y: -3 }}
        className="bg-white p-8 rounded-2xl shadow-xl space-y-8"
      >

        {/* General Settings */}

        <div className="space-y-6">

          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            General Settings
          </h2>

          {/* Application Name */}

          <div>

            <label className="block text-gray-700 mb-2 font-semibold">
              Application Name
            </label>

            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

          </div>

          {/* Admin Email */}

          <div>

            <label className="block text-gray-700 mb-2 font-semibold">
              Admin Email
            </label>

            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

          </div>

        </div>

        {/* Simulation Settings */}

        <div className="space-y-6">

          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Simulation Settings
          </h2>

          {/* Risk Threshold */}

          <div>

            <label className="block text-gray-700 mb-3 font-semibold">
              Risk Threshold
            </label>

            <div className="flex items-center gap-4">

              <input
                type="range"
                min="0"
                max="100"
                value={riskThreshold}
                onChange={(e) => setRiskThreshold(e.target.value)}
                className="w-full accent-purple-600"
              />

              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-semibold">
                {riskThreshold}
              </span>

            </div>

          </div>

        </div>

        {/* Save Button */}

        <div className="pt-4">

          <motion.button
  whileTap={{ scale: 0.95 }}
  whileHover={{ scale: 1.03 }}
  onClick={handleSave}
  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md"
>
  {saveStatus === "saving" && "Saving..."}
  {saveStatus === "saved" && "Saved ✓"}
  {saveStatus === "idle" && "Save Changes"}
</motion.button>

        </div>

      </motion.div>

    </motion.div>

  );

}

export default Settings;
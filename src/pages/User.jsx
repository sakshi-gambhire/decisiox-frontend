import { useEffect, useState } from "react";

function Users() {

const [users, setUsers] = useState([]);
const [search, setSearch] = useState("");
const [selectedUser, setSelectedUser] = useState(null);
const [showModal, setShowModal] = useState(false);
const [showPromoteModal, setShowPromoteModal] = useState(false);
const [toast, setToast] = useState(null);

useEffect(() => {

const fetchUsers = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/admin/users",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      console.error("Unauthorized or server error");
      return;
    }

    const data = await response.json();

    setUsers(data?.users || []);

  } catch (error) {

    console.error("Error fetching users:", error);

  }

};

fetchUsers();

}, []);

const deleteUser = async () => {

try {

  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/admin/users/${selectedUser.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    setToast("Failed to delete user");
    return;
  }

  setUsers(users.filter(u => u.id !== selectedUser.id));

  setToast("User deleted successfully");

  setShowModal(false);

} catch (error) {

  console.error(error);
  setToast("Server error");

}

setTimeout(() => setToast(null), 3000);

};

const promoteUser = async () => {

try {

  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/admin/promote/${selectedUser.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    setToast("Failed to promote user");
    return;
  }

  setUsers(users.map(u =>
    u.id === selectedUser.id ? { ...u, role: "admin" } : u
  ));

  setToast("User promoted to admin");

  setShowPromoteModal(false);

} catch (error) {

  console.error(error);
  setToast("Server error");

}

setTimeout(() => setToast(null), 3000);

};

const demoteUser = async (id) => {

try {

  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/admin/demote/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    setToast("Failed to demote user");
    return;
  }

  setUsers(users.map(u =>
    u.id === id ? { ...u, role: "user" } : u
  ));

  setToast("Admin demoted to user");

} catch (error) {

  console.error(error);
  setToast("Server error");

}

setTimeout(() => setToast(null), 3000);

};

const filteredUsers = users.filter((user) =>
user.name?.toLowerCase().includes(search.toLowerCase())
);

return (

<div className="space-y-8">

  {toast && (
    <div className="fixed top-6 right-6 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50">
      {toast}
    </div>
  )}

  <h1 className="text-3xl font-bold text-gray-900">
    Users Management
  </h1>

  <div className="bg-white p-6 rounded-2xl shadow space-y-6">

    <div className="flex justify-between items-center">

      <h2 className="text-lg font-semibold text-gray-800">
        All Users
      </h2>

      <input
        type="text"
        placeholder="Search user..."
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 outline-none focus:ring-2 focus:ring-purple-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>

    <div className="overflow-x-auto">

      <table className="w-full text-left border-collapse">

        <thead>

          <tr className="border-b text-gray-500 text-sm">
            <th className="py-3">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredUsers.map((user) => (

            <tr
              key={user.id}
              className="border-b hover:bg-gray-50 transition"
            >

              <td className="py-3 font-medium text-gray-700">
                {user.name}
              </td>

              <td className="text-gray-500">
                {user.email}
              </td>

              <td>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${user.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-600"}
                  `}
                >
                  {user.role}
                </span>

              </td>

              <td className="text-gray-500">
                {new Date(user.created_at).toLocaleDateString()}
              </td>

              <td className="space-x-2">

                {user.role !== "admin" && (
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowPromoteModal(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow hover:scale-105 transition"
                  >
                    Promote
                  </button>
                )}

                {user.role === "admin" && (
                  <button
                    onClick={() => demoteUser(user.id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
                  >
                    Demote
                  </button>
                )}

                <button
                  className="px-4 py-2 !bg-red-400 text-white rounded-lg shadow hover:!bg-red-600 hover:scale-105 transition"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowModal(true);
                  }}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

          {filteredUsers.length === 0 && (

            <tr>

              <td colSpan="5" className="text-center py-6 text-gray-400">
                No users found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  </div>

  {showModal && (

    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

      <div className="bg-white rounded-2xl p-6 w-[350px] shadow-xl">

        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h3>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this user?
        </p>

        <div className="flex justify-end gap-3">

          <button
            className="px-4 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-400 transition"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 !bg-red-500 text-white rounded-lg hover:!bg-red-600 transition"
            onClick={deleteUser}
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  )}

  {showPromoteModal && (

    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

      <div className="bg-white rounded-2xl p-6 w-[350px] shadow-xl">

        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Promote User
        </h3>

        <p className="text-gray-600 mb-6">
          Are you sure you want to promote this user to admin?
        </p>

        <div className="flex justify-end gap-3">

          <button
            className="px-4 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-400 transition"
            onClick={() => setShowPromoteModal(false)}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            onClick={promoteUser}
          >
            Promote
          </button>

        </div>

      </div>

    </div>

  )}

</div>

);

}

export default Users;
import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Settings } from "lucide-react";

function AdminLayout() {

const adminName = localStorage.getItem("userName") || "Admin";

return (

<div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 text-gray-800">

{/* Sidebar */}

<div className="w-64 bg-gradient-to-b from-indigo-900 to-purple-900 p-6 flex flex-col justify-between text-white">

<div>

<h1 className="text-2xl font-bold mb-10 text-purple-400">
DecisioX
</h1>

<nav className="space-y-4">

<NavLink
to="/admin"
end
className={({ isActive }) =>
`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
${isActive
? "bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg text-white"
: "hover:bg-purple-600/30 text-white"
}`
}
>

<LayoutDashboard size={20} />
<span className="font-medium text-white">Dashboard</span>

</NavLink>

<NavLink
to="/admin/users"
className={({ isActive }) =>
`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
${isActive
? "bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg text-white"
: "hover:bg-purple-600/30 text-white"
}`
}
>

<Users size={20} />
<span className="font-medium text-white">Users</span>

</NavLink>

<NavLink
to="/admin/settings"
className={({ isActive }) =>
`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
${isActive
? "bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg text-white"
: "hover:bg-purple-600/30 text-white"
}`
}
>

<Settings size={20} />
<span className="font-medium text-white">Settings</span>

</NavLink>

</nav>

</div>

{/* Admin Info */}

<div className="mt-10 pt-6 border-t border-gray-700">

<p className="text-sm text-gray-400">
Logged in as
</p>

<p className="font-semibold text-white">
{adminName}
</p>

</div>

</div>

{/* Content */}

<div className="flex-1 p-8 overflow-y-auto">

<Outlet />

</div>

</div>

);
}

export default AdminLayout;
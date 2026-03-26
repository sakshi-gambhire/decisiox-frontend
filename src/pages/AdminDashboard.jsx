import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
} from "recharts";

const COLORS = ["#6d28d9", "#8b5cf6", "#c084fc"];

function AdminDashboard() {
const [riskData, setRiskData] = useState([]);
const [strategyStats, setStrategyStats] = useState([]);
const [history, setHistory] = useState([]);
const [growthData, setGrowthData] = useState([]);

const [stats, setStats] = useState({
totalUsers: 0,
totalAdmins: 0,
totalSimulations: 0
});

const adminName = localStorage.getItem("userName") || "Admin";

useEffect(() => {
    const fetchAnalytics = async () => {

  const token = localStorage.getItem("token");

  const riskRes = await fetch(
    "https://decisiox-backend.onrender.com/api/admin/risk-distribution",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const strategyRes = await fetch(
    "https://decisiox-backend.onrender.com/api/admin/strategy-popularity",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const risk = await riskRes.json();
  const strategy = await strategyRes.json();

  setRiskData(risk);
 setStrategyStats(strategy);

};

fetchAnalytics();

const fetchGrowth = async () => {

try {

const token = localStorage.getItem("token");

const response = await fetch(
"https://decisiox-backend.onrender.com/api/admin/user-growth",
{
headers: {
Authorization: `Bearer ${token}`
}
}
);

if (!response.ok) return;

const data = await response.json();

setGrowthData(data);

} catch (error) {
console.error("Growth fetch error:", error);
}

};

fetchGrowth();

const saved = localStorage.getItem("simulationHistory");

if (saved) {
setHistory(JSON.parse(saved));
}

const fetchStats = async () => {

try {

const token = localStorage.getItem("token");

const response = await fetch(
"https://decisiox-backend.onrender.com/api/admin/stats",
{
headers: {
Authorization: `Bearer ${token}`
}
}
);

if (!response.ok) return;

const data = await response.json();

setStats(data);

} catch (error) {
console.error("Stats fetch error:", error);
}

};

fetchStats();

}, []);

const riskDistribution = riskData.map((r) => ({
  name: r.risk_level,
  value: Number(r.count)
}));

const strategyCount = {};

history.forEach((h) => {
strategyCount[h.strategy] = (strategyCount[h.strategy] || 0) + 1;
});

const strategyChartData = strategyStats.map((s) => ({
  name: s.strategy,
  value: Number(s.count)
}));

return (
<motion.div
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
className="space-y-10"
>

{/* Dashboard Header */}
<div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg">

{(() => {

const hour = new Date().getHours();

let greeting = "Hello";

if (hour < 12) greeting = "Good Morning";
else if (hour < 18) greeting = "Good Afternoon";
else greeting = "Good Evening";

return (

<div className="flex flex-col gap-2">

<h2 className="text-2xl font-semibold text-gray-800">

{greeting}, {adminName} 👋

</h2>

<p className="text-gray-500 text-sm">

Here's what's happening today.

</p>

<p className="text-xs text-gray-400">

{new Date().toLocaleDateString(undefined, {
weekday: "long",
day: "numeric",
month: "short",
year: "numeric"
})}
{" • "}
{new Date().toLocaleTimeString()}

</p>

</div>

);

})()}

</div>


{/* KPI CARDS */}

<div className="grid md:grid-cols-3 gap-6">

<motion.div
whileHover={{ y: -3 }}
className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-xl"
>

<p className="text-sm opacity-80">Total Users</p>

<p className="text-3xl font-bold mt-2">
<CountUp end={stats.totalUsers} duration={2} />
</p>

</motion.div>

<motion.div
whileHover={{ y: -3 }}
className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-xl"
>

<p className="text-sm opacity-80">Total Admins</p>

<p className="text-3xl font-bold mt-2">
<CountUp end={stats.totalAdmins} duration={2} />
</p>

</motion.div>

<motion.div
whileHover={{ y: -3 }}
className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-2xl shadow-xl"
>

<p className="text-sm opacity-80">Total Simulations</p>

<p className="text-3xl font-bold mt-2">
<CountUp end={stats.totalSimulations} duration={2} />
</p>

</motion.div>

</div>

{/* CHARTS */}

<div className="grid md:grid-cols-2 gap-6">

<motion.div
whileHover={{ y: -4 }}
className="bg-white p-6 rounded-2xl shadow-lg"
>

<h3 className="mb-4 font-semibold text-gray-700">
Risk Distribution
</h3>

{riskDistribution.length === 0 ? (
<p className="text-gray-400 text-sm">
No simulation data available
</p>
) : (

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie
data={riskDistribution}
dataKey="value"
outerRadius={110}
innerRadius={60}
>

{riskDistribution.map((_, index) => (
<Cell key={index} fill={COLORS[index % COLORS.length]} />
))}

</Pie>

<Tooltip />

</PieChart>

</ResponsiveContainer>

)}

</motion.div>

<motion.div
whileHover={{ y: -4 }}
className="bg-white p-6 rounded-2xl shadow-lg"
>

<h3 className="mb-4 font-semibold text-gray-700">
Strategy Popularity
</h3>

{strategyStats.length === 0 ?  (
<p className="text-gray-400 text-sm">
No strategy data yet
</p>
) : (

<ResponsiveContainer width="100%" height={300}>

<BarChart data={strategyChartData}>

<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />

<Bar
dataKey="value"
fill="#6d28d9"
radius={[8,8,0,0]}
/>

</BarChart>

</ResponsiveContainer>

)}

</motion.div>

</div>

{/* USER GROWTH */}

<motion.div
whileHover={{ y: -4 }}
className="bg-white p-6 rounded-2xl shadow-lg"
>

<h3 className="mb-4 font-semibold text-gray-700">
User Growth
</h3>

{growthData.length === 0 ? (
<p className="text-gray-400 text-sm">
No growth data yet
</p>
) : (

<ResponsiveContainer width="100%" height={300}>

<BarChart data={growthData}>

<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="date" />
<YAxis />
<Tooltip />

<Bar
dataKey="count"
fill="#8b5cf6"
radius={[8,8,0,0]}
/>

</BarChart>

</ResponsiveContainer>

)}

</motion.div>

</motion.div>
);
}

export default AdminDashboard;
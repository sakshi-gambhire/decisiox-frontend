import { useState, useEffect } from "react";
import { ReactTyped } from "react-typed";
import img1 from "../assets/img1.svg";
import { motion } from "framer-motion";



import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import jsPDF from "jspdf";

const COLORS = ["#6d1bef", "#8b5cf6", "#c084fc"];

function Simulator() {

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    amount: "",
    savings: "",
    horizon: "",
    risk: "",
    goal: "",
    employment: "",
  });

  const [result, setResult] = useState(null);
  const investorType = result
  ? result.riskScore > 70
    ? "Aggressive Investor"
    : result.riskScore > 45
    ? "Balanced Investor"
    : "Conservative Investor"
  : "";
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [warnings, setWarnings] = useState({});
// AI Advice state
const [aiAdvice, setAiAdvice] = useState("");
const [aiLoading, setAiLoading] = useState(false);

  // AI Advice state
  const userName = localStorage.getItem("userName") || "Investor";

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/simulations/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setHistory(data);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const validateInputs = () => {

  let newErrors = {};
  let newWarnings = {};

  const age = Number(formData.age);
  const income = Number(formData.income);
  const investment = Number(formData.amount);
  const savings = Number(formData.savings);

  if (age < 18 || age > 65) {
    newErrors.age = "Age must be between 18 and 65";
  }

  if (income <= 0) {
    newErrors.income = "Income must be greater than 0";
  }

  if (investment <= 0) {
    newErrors.amount = "Investment amount must be greater than 0";
  }

  if (savings < 0) {
    newErrors.savings = "Savings cannot be negative";
  }

  if (investment > savings) {
    newErrors.amount = "Investment cannot exceed your existing savings";
  }

  // Soft warning
  if (investment > income * 3) {
    newWarnings.amount =
      "Investment is significantly higher than your monthly income.";
  }
  if (savings < 0) {
  newErrors.savings = "Savings cannot be negative";
}

if (investment > savings) {
  newErrors.amount = "Investment cannot exceed your existing savings";
}

if (savings < income * 0.5) {
  newWarnings.savings =
    "Your savings are relatively low compared to your income.";
}

  setErrors(newErrors);
  setWarnings(newWarnings);

  return Object.keys(newErrors).length === 0;
};
  const validateForm = () => {

  if (!formData.age || !formData.income || !formData.amount || !formData.savings) {
    setError("Please fill all required fields.");
    return false;
  }

  if (formData.age < 18 || formData.age > 100) {
    setError("Age must be between 18 and 100.");
    return false;
  }

  if (formData.income <= 0) {
    setError("Monthly income must be greater than 0.");
    return false;
  }

  if (formData.amount <= 0) {
    setError("Investment amount must be greater than 0.");
    return false;
  }

  if (formData.savings < 0) {
    setError("Savings cannot be negative.");
    return false;
  }

  if (!formData.risk) {
    setError("Please select risk appetite.");
    return false;
  }

  if (!formData.horizon) {
    setError("Please select investment horizon.");
    return false;
  }

  setError("");
  return true;
};

  const calculateRiskScore = (data) => {

   
    let score = 0;

    if (data.age < 30) score += 20;
    else if (data.age < 45) score += 15;
    else if (data.age < 60) score += 10;
    else score += 5;

    if (data.income > 100000) score += 20;
    else if (data.income > 50000) score += 15;
    else if (data.income > 20000) score += 10;

    if (data.savings > 500000) score += 15;
    else if (data.savings > 200000) score += 10;
    else score += 5;

    if (data.amount > 100000) score += 10;
    else if (data.amount > 50000) score += 7;
    else score += 5;

    if (data.risk === "High") score += 15;
    else if (data.risk === "Medium") score += 10;
    else score += 5;

    if (data.horizon === "10+ Years") score += 10;
    else if (data.horizon === "5-10 Years") score += 7;
    else if (data.horizon === "3-5 Years") score += 5;
    else score += 3;

    return Math.min(score, 100);
  };

  const runSimulation = async () => {

 if (!validateInputs()) {
  return;
}

  // existing simulation logic continues here


    setLoading(true);

    try {

      let allocation;
      let strategy;

      if (formData.risk === "High") {

        allocation = [
          { name: "Equity", value: 70 },
          { name: "Mutual Funds", value: 20 },
          { name: "Fixed Income", value: 10 },
        ];

        strategy = "Aggressive Growth Strategy";

      } else if (formData.risk === "Medium") {

        allocation = [
          { name: "Equity", value: 50 },
          { name: "Mutual Funds", value: 30 },
          { name: "Fixed Income", value: 20 },
        ];

        strategy = "Balanced Investment Strategy";

      } else {

        allocation = [
          { name: "Bonds", value: 60 },
          { name: "Mutual Funds", value: 30 },
          { name: "Cash", value: 10 },
        ];

        strategy = "Conservative Protection Strategy";
      }

      const riskScore = calculateRiskScore(formData);

      const token = localStorage.getItem("token");

      await fetch(
        "http://localhost:5000/api/simulations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            age: formData.age,
            income: formData.income,
            savings: formData.savings,
            investment_amount: formData.amount,
            risk_level: formData.risk,
            investment_horizon: formData.horizon,
            investment_goal: formData.goal,
            strategy: strategy
          }),
        }
      );

      const newResult = {
        ...formData,
        allocation,
        strategy,
        riskScore,
        timestamp: new Date().toLocaleString(),
      };

      setResult(newResult);

      // AI API call
// AI API call
const aiRes = await fetch(
  "http://localhost:5000/api/ai/recommendation",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      age: formData.age,
      income: formData.income,
      savings: formData.savings,
      investmentAmount: formData.amount,
      risk: formData.risk,
      horizon: formData.horizon,
    }),
  }
);

if (!aiRes.ok) {
  const errorText = await aiRes.text();
  console.error("AI API Error:", errorText);
  setAiAdvice("AI advice could not be generated.");
  return;
}

const aiData = await aiRes.json();

if (aiData.success) {
  const cleanAdvice = aiData.data.advice
    .replace(/\*\*/g, "")
    .replace(/###/g, "")
    .trim();

  setAiAdvice(cleanAdvice);
}

      fetchHistory();

    } catch (err) {

      console.error(err);
      setError("Simulation failed");

    }

    setLoading(false);
  };
const exportPDF = () => {

  if (!result) return;

  const pdf = new jsPDF();

  const userName = localStorage.getItem("userName") || "Investor";
  const today = new Date().toLocaleDateString();

  let y = 20;

  /* HEADER */

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.setTextColor(109, 40, 217);

  pdf.text("DecisioX Financial Report", 20, y);

  y += 8;

  pdf.setFontSize(11);
  pdf.setTextColor(120);

  pdf.text(`Generated on: ${today}`, 20, y);

  y += 8;

  pdf.setDrawColor(200);
  pdf.line(20, y, 190, y);

  y += 15;

  /* USER PROFILE */

  pdf.setFontSize(16);
  pdf.setTextColor(70);
  pdf.text("User Profile", 20, y);

  y += 10;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(50);

  pdf.text(`Name: ${userName}`, 20, y);
  y += 8;

  pdf.text(`Age: ${formData.age}`, 20, y);
  y += 8;

  pdf.text(`Monthly Income: ₹${formData.income}`, 20, y);
  y += 8;

  pdf.text(`Savings: ₹${formData.savings}`, 20, y);

  y += 15;

  /* INVESTMENT DETAILS */

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(70);

  pdf.text("Investment Details", 20, y);

  y += 10;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  pdf.text(`Investment Amount: ₹${formData.amount}`, 20, y);
  y += 8;

  pdf.text(`Risk Appetite: ${formData.risk}`, 20, y);
  y += 8;

  pdf.text(`Investment Horizon: ${formData.horizon}`, 20, y);

  y += 15;

  /* STRATEGY */

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Recommended Strategy", 20, y);

  y += 10;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  pdf.text(result.strategy, 20, y);

  y += 15;

  /* PORTFOLIO */

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Portfolio Allocation", 20, y);

  y += 10;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  result.allocation.forEach((item) => {
    pdf.text(`${item.name} : ${item.value}%`, 20, y);
    y += 8;
  });

  y += 10;

  /* AI ADVICE */

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("AI Financial Advice", 20, y);

  y += 10;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const adviceLines = pdf.splitTextToSize(aiAdvice || "AI advice unavailable.", 170);

  pdf.text(adviceLines, 20, y);

  /* SAVE */

  pdf.save("DecisioX_Financial_Report.pdf");

};

  return (

    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 px-6 py-16">

      {/* HERO */}

      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto mb-16">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            Investment Decision
            <span className="text-purple-600"> Simulator</span>
          </h1>

          <p className="text-gray-600 mt-3">
            Intelligent financial profile analysis powered by structured
            investment modeling.
          </p>

        </div>

        <div className="flex justify-center">
          <img src={img1} alt="analytics" className="w-80" />
        </div>

      </div>

      {/* FORM */}

<div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-purple-500">
         <div className="grid md:grid-cols-2 gap-6">

  

   

  {/* AGE */}
  <div>
    <Input
      label="Age"
      name="age"
      type="number"
      value={formData.age}
      onChange={handleChange}
    />
    {errors.age && (
      <p className="text-red-500 text-sm mt-1">{errors.age}</p>
    )}
  </div>

  {/* INCOME */}
  <div>
    <Input
      label="Monthly Income"
      name="income"
      type="number"
      value={formData.income}
      onChange={handleChange}
    />

    {errors.income && (
      <p className="text-red-500 text-sm mt-1">{errors.income}</p>
    )}

    {warnings.income && (
      <p className="text-yellow-600 text-sm mt-1">
        {warnings.income}
      </p>
    )}
  </div>

  {/* INVESTMENT AMOUNT */}
  <div>
    <Input
      label="Investment Amount"
      name="amount"
      type="number"
      value={formData.amount}
      onChange={handleChange}
    />

    {errors.amount && (
      <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
    )}

    {warnings.amount && (
      <p className="text-yellow-600 text-sm mt-1">
        {warnings.amount}
      </p>
    )}
  </div>

  {/* SAVINGS */}
<div>
  <Input
    label="Existing Savings"
    name="savings"
    type="number"
    value={formData.savings}
    onChange={handleChange}
  />

  {errors.savings && (
    <p className="text-red-500 text-sm mt-1">
      {errors.savings}
    </p>
  )}

  {warnings.savings && (
    <p className="text-yellow-600 text-sm mt-1">
      {warnings.savings}
    </p>
  )}
</div>

  {/* RISK */}
  <div>
    <Select
      label="Risk Appetite"
      name="risk"
      value={formData.risk}
      onChange={handleChange}
      options={["Low", "Medium", "High"]}
    />
  </div>

  {/* HORIZON */}
  <div>
    <Select
      label="Investment Horizon"
      name="horizon"
      value={formData.horizon}
      onChange={handleChange}
      options={["1-3 Years", "3-5 Years", "5-10 Years", "10+ Years"]}
    />
  </div>

</div>



        {error && <p className="text-red-500 mt-4">{error}</p>}

        <button
          onClick={runSimulation}
className="w-full mt-8 bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"        >
         {loading ? "Analyzing your financial profile..." : "Run Simulation"}
        </button>

      </div>

      {/* RESULT */}
{result && (

<div className="max-w-5xl mx-auto mt-12 bg-white p-10 rounded-3xl shadow-xl">

  <h2 className="text-xl font-semibold text-center mb-6">
    Simulation Result
  </h2>

  <div className="h-64">

    <ResponsiveContainer width="100%" height="100%">
      <PieChart>

        <Pie
          data={result.allocation}
          dataKey="value"
          outerRadius={90}
        >
          {result.allocation.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>

  </div>
  {result && (

<motion.div
  initial={{ opacity: 0, y: 40, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="max-w-5xl mx-auto mt-8 bg-gradient-to-r from-purple-50 to-white border border-purple-200 rounded-2xl p-6 shadow-md"
>

  <h3 className="text-xl font-bold text-purple-700 mb-4">
    Risk Profile Analysis
  </h3>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="bg-white border border-purple-100 rounded-xl p-4 text-center shadow-sm">
      <p className="text-sm text-gray-500">Risk Score</p>
      <p className="text-2xl font-bold text-purple-600">
       {result.riskScore} / 100
      </p>
    </div>

    <div className="bg-white border border-purple-100 rounded-xl p-4 text-center shadow-sm">
      <p className="text-sm text-gray-500">Investor Type</p>
      <p className="text-lg font-semibold text-gray-800">
        {investorType}
      </p>
    </div>

    <div className="bg-white border border-purple-100 rounded-xl p-4 text-center shadow-sm">
      <p className="text-sm text-gray-500">Investment Horizon</p>
      <p className="text-lg font-semibold text-gray-800">
        {formData.horizon}
      </p>
    </div>

  </div>

  <div className="mt-6 text-gray-600 text-sm leading-relaxed">

    <p>
      Based on your financial profile and investment preferences, you fall into the
      <span className="font-semibold text-purple-600"> {investorType}</span> category.
      This means your portfolio strategy should balance growth opportunities with
      risk management while aligning with your investment horizon.
    </p>

  </div>

</motion.div>

)}

<div className="text-center mt-6">

  <p className="text-purple-600 font-semibold text-lg">
    {result.strategy}
  </p>

</div>


  {aiAdvice && (

  <div className="mt-10 bg-gradient-to-r from-purple-50 to-white border border-purple-200 rounded-2xl p-8 shadow-lg transform transition-all duration-500 hover:scale-[1.02]">

    <h3 className="text-2xl font-bold text-purple-700 mb-4">
      AI Financial Advisor
    </h3>

    <p className="text-gray-700 mb-5 text-lg font-medium">
      Hi <span className="text-purple-600 font-semibold">{userName}</span>, 
      great to see you taking a step toward smarter investing. 
      Based on your financial profile, here are some insights to guide your investment decisions.
    </p>

    <div className="text-gray-700 text-base leading-relaxed">

      <ReactTyped
        strings={[aiAdvice]}
        typeSpeed={25}
        showCursor={true}
        cursorChar="|"
      />

    </div>

  </div>

  )}

</div>

)}
<div className="text-center mt-8">

<button
  onClick={exportPDF}
  disabled={aiLoading || !aiAdvice}
  className={`mt-6 px-6 py-3 rounded-xl shadow-md transition-all duration-200
  ${
    aiLoading || !aiAdvice
      ? "bg-purple-300 text-purple-500 cursor-not-allowed"
      : "bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:shadow-lg hover:scale-[1.03]"
  }`}
>
  {aiLoading ? "Generating AI Advice..." : "Download Financial Report"}
</button>

</div>

      {/* HISTORY */}

      <div className="max-w-5xl mx-auto mt-16">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-gray-900">
            Simulation History
          </h2>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
          >
            {showHistory ? "Hide History" : "View History"}
          </button>

        </div>

        {showHistory && history.length === 0 && (
          <p className="text-gray-500 text-sm">
            No simulations yet. Run your first simulation.
          </p>
        )}

        {showHistory && history.length > 0 && (

          <div className="grid md:grid-cols-2 gap-6">

            {history.map((item, index) => (

              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md border border-purple-100 hover:shadow-xl hover:-translate-y-1 transition"
              >

                <div className="flex justify-between items-center mb-3">

                  <span className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>

                  <span className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full">
                    {item.risk_level}
                  </span>

                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.strategy}
                </h3>

                <div className="text-sm text-gray-600 space-y-1">

                  <p><strong>Age:</strong> {item.age}</p>
                  <p><strong>Income:</strong> ₹{item.income}</p>
                  <p><strong>Investment:</strong> ₹{item.investment_amount}</p>
                  <p><strong>Horizon:</strong> {item.investment_horizon}</p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <input
        {...props}
className="w-full p-3 rounded-xl border border-gray-400 text-gray-800 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-300 outline-none transition"      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>

      <select
        {...props}
className="w-full p-3 rounded-xl border border-gray-400 text-gray-800 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-300 outline-none transition"      >
        <option value="">Select</option>

        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}

      </select>
    </div>
  );
}

export default Simulator;


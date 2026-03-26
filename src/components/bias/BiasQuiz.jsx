import { useState } from "react";
import "./biasQuiz.css";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "Your portfolio drops 15%. What do you do?",
    options: [
      "Sell immediately to avoid further loss",
      "Hold and wait",
      "Invest more at lower price"
    ]
  },
  {
    id: 2,
    question: "You recently made profits. What next?",
    options: [
      "Take more aggressive bets",
      "Stick to your strategy",
      "Book profits partially"
    ]
  },
  {
    id: 3,
    question: "Everyone is investing in a trending stock. What do you do?",
    options: [
      "Invest quickly before it's too late",
      "Research before investing",
      "Avoid trends completely"
    ]
  }
];

const BiasQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ FIX

  const navigate = useNavigate();

  const detectBias = (answers) => {
    if (answers.includes("Sell immediately to avoid further loss")) {
      return "Loss Aversion";
    } else if (answers.includes("Take more aggressive bets")) {
      return "Overconfidence";
    } else {
      return "Balanced Investor";
    }
  };

  const handleSelect = (option) => {
    setSelected(option);

    setTimeout(() => {
      const updated = [...answers, option];
      setAnswers(updated);

      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setIsCompleted(true);
      }
    }, 400);
  };

  // ✅ LOADING SCREEN
  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Analyzing your behavior...</h2>
        <p>Please wait while AI evaluates your responses</p>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="quiz-card">

      <div className="progress">
        Question {current + 1} of {questions.length}
      </div>

      <h3 className="question">
        {questions[current].question}
      </h3>

      <div className="options">
        {questions[current].options.map((opt, index) => (
          <button
            key={index}
            className={`option-btn ${selected === opt ? "active" : ""}`}
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      {isCompleted && (
        <button
          className="analyze-btn"
          onClick={async () => {
            try {
              setLoading(true); // ✅ START LOADING

              const bias = detectBias(answers);

              const payload = { bias, answers };

              console.log("🚀 Sending:", payload);

              const res = await fetch("http://localhost:5000/api/bias/save", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
              });

              const data = await res.json();

              console.log("✅ Response:", data);

              // 🔥 IMPORTANT DELAY (to show loading)
              await new Promise(resolve => setTimeout(resolve, 1500));

              setLoading(false); // ✅ STOP LOADING

              navigate("/bias-result", {
                state: { result: data.data }
              });

            } catch (error) {
              console.error("❌ Error:", error);
              setLoading(false);
            }
          }}
        >
          Analyze My Behavior
        </button>
      )}
    </div>
  );
};

export default BiasQuiz;
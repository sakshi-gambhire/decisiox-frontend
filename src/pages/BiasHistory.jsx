import { useEffect, useState } from "react";
import "./bias.css";

const BiasHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("https://decisiox-backend.onrender.com/api/bias/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        console.log("HISTORY DATA:", data);

        // ✅ Safety check (VERY IMPORTANT)
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          setHistory([]);
        }

      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="bias-container">

      <h1 className="history-title">Bias History</h1>

      {history.length === 0 ? (
        <p className="no-history">No history found</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-card">

              <h3 className="bias-title">{item.bias}</h3>

              <p className="bias-text">{item.explanation}</p>

              <div className="suggestion">
                {item.suggestion}
              </div>

              <p className="date">
                {new Date(item.created_at).toLocaleString()}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BiasHistory;
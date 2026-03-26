import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./bias.css";
import resultImg from "../assets/Brain2.svg";
import typingSound from "../assets/typing.mp3";

const BiasResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;

  const [typedExplanation, setTypedExplanation] = useState("");
  const [typedSuggestion, setTypedSuggestion] = useState("");

  const audioRef = useRef(null);

  // ✅ Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(typingSound);
    audioRef.current.volume = 0.15; // 🔥 softer sound
    audioRef.current.loop = true;   // 🔥 continuous typing sound
  }, []);

  // ✅ Typing effect + synced sound
  useEffect(() => {
    if (!result) return;

    let i = 0;
    let j = 0;

    const explanationText = result.explanation || "";
    const suggestionText = result.suggestion || "";

    // 🔥 START SOUND ONCE
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    const typeExplanation = setInterval(() => {
      if (i < explanationText.length) {
        setTypedExplanation((prev) => prev + explanationText.charAt(i));
        i++;
      } else {
        clearInterval(typeExplanation);

        const typeSuggestion = setInterval(() => {
          if (j < suggestionText.length) {
            setTypedSuggestion((prev) => prev + suggestionText.charAt(j));
            j++;
          } else {
            clearInterval(typeSuggestion);

            // 🔥 STOP SOUND WHEN DONE
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
          }
        }, 35); // 🔥 slower typing (suggestion)
      }
    }, 35); // 🔥 slower typing (explanation)

    return () => {
      clearInterval(typeExplanation);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [result]);

  if (!result) {
    return (
      <div className="bias-container">
        <h2>No result found</h2>
        <button onClick={() => navigate("/bias-detector")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bias-container">

      <div className="bias-hero">

        <div className="bias-text">
          <h1>
            Your Behavioral <br />
            <span className="highlight">Analysis Result</span>
          </h1>

          <p>
            Based on your responses, here’s your cognitive bias pattern.
          </p>
        </div>

        <div className="bias-image">
          <img src={resultImg} alt="Result Analysis" />
        </div>

      </div>

      <div className="result-card">

        <h2 className="bias-title">{result.bias}</h2>

        <p className="bias-label">AI Explanation</p>
        <p className="bias-text typing">
          {typedExplanation || "Generating explanation..."}
        </p>

        <p className="bias-label">AI Suggestion</p>
        <div className="suggestion typing">
          {typedSuggestion || "Generating suggestion..."}
        </div>

      </div>

      <div className="result-actions">
        <button onClick={() => navigate("/bias-detector")}>
          Retake Quiz
        </button>
      </div>

    </div>
  );
};

export default BiasResult;
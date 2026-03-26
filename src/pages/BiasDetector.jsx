import BiasQuiz from "../components/bias/BiasQuiz.jsx";
import "./bias.css";
import brainImg from "../assets/Brain1.svg";

const BiasDetector = () => {
  return (
    <div style={{ background: "#f7f7fb" }}>
  <div className="bias-container">

      {/* HERO SECTION */}
      <div className="bias-hero">

        {/* LEFT CONTENT */}
        <div className="bias-text">
  <h1>
    Behavioral Decision <br />
    <span className="highlight">Analysis Engine</span>
  </h1>

          <p>
            Analyze your financial decision patterns and uncover cognitive
            biases that may impact your investment strategies.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="bias-image">
          
          <img src={brainImg} alt="Behavior Analysis" />
        </div>

      </div>

      {/* QUIZ SECTION */}
      <div className="bias-quiz-section">
        <BiasQuiz />
      </div>

    </div>
      </div>

  );
};

export default BiasDetector;
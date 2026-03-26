import { Link } from "react-router-dom";
import I1 from "../assets/i1.svg";
import I2 from "../assets/i2.svg";
import step1 from "../assets/step1.svg";
import step2 from "../assets/step2.svg";
import step3 from "../assets/step3.svg";
import whyImage from "../assets/step4.svg";
import { FaBrain } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaBullseye } from "react-icons/fa";
import { useEffect, useState } from "react";

function Home() {

  // ✅ REQUIRED FIX — Hooks moved inside component
  const [userName, setUserName] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedHistory = localStorage.getItem("simulationHistory");

    if (storedName) setUserName(storedName);
    if (storedHistory) setHistory(JSON.parse(storedHistory));
  }, []);

  return (
  <>


    {/* HERO SECTION */}
    <section className="relative w-screen min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 overflow-hidden">

      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      <div className="w-full px-12 lg:px-24 py-24 flex flex-col md:flex-row items-center justify-between relative z-10">

        <div className="md:w-1/2 space-y-10">

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
            Build Your Wealth <br />
            <span className="text-purple-500">
              With Intelligent Decisions
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed">
            Simulate financial scenarios, evaluate your risk appetite,
            and receive smart rule-based investment recommendations — 
            all in one interactive platform.
          </p>

          <div className="flex mt-6">
            <Link
  to={localStorage.getItem("userName") ? "/simulator" : "/login"}
  className="bg-white text-purple-600 border-2 border-purple-600
  px-10 py-4 text-lg rounded-xl shadow-md
  transition-all duration-300
  hover:bg-purple-300 hover:text-white
  hover:shadow-lg"
>
  Run Simulation
</Link>

          </div>

        </div>

        <div className="md:w-1/2 flex justify-end items-center mt-16 md:mt-0 relative">

          <img
            src={I1}
            alt="Investment Image 1"
            className="w-80 md:w-[420px] rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500"
          />

          <img
            src={I2}
            alt="Investment Image 2"
            className="w-64 md:w-[300px] rounded-2xl shadow-2xl absolute top-32 left-56 transform -rotate-6 hover:rotate-0 transition duration-500"
          />

        </div>

      </div>
    </section>

    
    {/* REST OF YOUR CODE REMAINS EXACTLY SAME */}
    {/* HOW IT WORKS SECTION */}
    {/* HOW IT WORKS SECTION */}
<section className="bg-white py-24">

  <div className="max-w-6xl mx-auto px-12 text-center">

    <h2 className="text-4xl font-bold text-gray-900 mb-16">
      How DecisioX Works
    </h2>

    <div className="space-y-20">

      {/* STEP 1 */}
      <div className="flex flex-col md:flex-row items-center gap-12">

        <img
          src={step1}
          alt="Financial Input"
          className="w-72 md:w-[400px] transition duration-500 hover:scale-105"
        />

        <div className="group relative bg-purple-100 p-8 rounded-2xl 
        shadow-lg border border-purple-100
        transition-all duration-500 
        hover:-translate-y-3 hover:shadow-2xl 
        hover:border-purple-300
        text-left overflow-hidden">

          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

          <div className="text-purple-600 text-3xl font-bold mb-4">01</div>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Enter Financial Details
          </h3>

          <p className="text-gray-600">
            Provide your income, age, investment goal, and risk preference to begin simulation.
          </p>

        </div>
      </div>


      {/* STEP 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-12">

        <img
          src={step2}
          alt="Evaluation"
          className="w-72 md:w-[400px] transition duration-500 hover:scale-105"
        />

        <div className="group relative bg-purple-100 p-8 rounded-2xl 
        shadow-lg border border-purple-100
        transition-all duration-500 
        hover:-translate-y-3 hover:shadow-2xl 
        hover:border-purple-300
        text-left overflow-hidden">

          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

          <div className="text-purple-600 text-3xl font-bold mb-4">02</div>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Rule-Based Evaluation
          </h3>

          <p className="text-gray-600">
            Our engine analyzes your inputs using structured financial logic.
          </p>

        </div>
      </div>


      {/* STEP 3 */}
      <div className="flex flex-col md:flex-row items-center gap-12">

        <img
          src={step3}
          alt="Smart Allocation"
          className="w-72 md:w-[400px] transition duration-500 hover:scale-105"
        />

        <div className="group relative bg-purple-100 p-8 rounded-2xl 
        shadow-lg border border-purple-100
        transition-all duration-500 
        hover:-translate-y-3 hover:shadow-2xl 
        hover:border-purple-300
        text-left overflow-hidden">

          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

          <div className="text-purple-600 text-3xl font-bold mb-4">03</div>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Get Smart Allocation
          </h3>

          <p className="text-gray-600">
            Receive a personalized investment allocation based on your profile.
          </p>

        </div>
      </div>

    </div>
  </div>
</section>

  {/* WHY DECISIOX SECTION */}
<section className="relative py-24 bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden">

  {/* Background Glow */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 opacity-20 blur-3xl rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400 opacity-20 blur-3xl rounded-full"></div>

  <div className="max-w-6xl mx-auto px-12 text-center relative z-10">

    <h2 className="text-4xl font-bold text-gray-900 mb-4">
  Why Decisio<span className="text-purple-400">X </span>?
</h2>


    <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
      A structured and interactive way to evaluate financial decisions 
      using logic-driven simulations.
    </p>

    {/* Smaller Center Image */}
    <div className="flex justify-center mb-16">
      <img
        src={whyImage}
        alt="Decision Dashboard"
        className="w-64 md:w-[420px] animate-float drop-shadow-xl transition duration-500 hover:scale-105"
      />
    </div>

    {/* FEATURE CARDS */}
    <div className="grid md:grid-cols-2 gap-8">

      {/* CARD 1 */}
      <div className="group relative bg-purple-100 p-7 rounded-2xl shadow-lg border border-purple-100
                      transition-all duration-500 hover:-translate-y-2 
                      hover:shadow-2xl hover:border-purple-300 text-left overflow-hidden">

        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

        <div className="text-purple-500 text-2xl mb-3">
  <FaBrain />
</div>


        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          Structured Rule Logic
        </h3>

        <p className="text-gray-600 text-sm">
          Evaluates financial inputs using predefined decision rules and logic mapping.
        </p>
      </div>


      {/* CARD 2 */}
      <div className="group relative bg-purple-100 p-7 rounded-2xl shadow-lg border border-purple-100
                      transition-all duration-500 hover:-translate-y-2 
                      hover:shadow-2xl hover:border-purple-300 text-left overflow-hidden">

        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

        <div className="text-purple-500 text-2xl mb-3">
  <FaChartBar />
</div>


        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          Risk Evaluation
        </h3>

        <p className="text-gray-600 text-sm">
          Assesses risk appetite based on user-defined parameters and preferences.
        </p>
      </div>


      {/* CARD 3 */}
      <div className="group relative bg-purple-100 p-7 rounded-2xl shadow-lg border border-purple-100
                      transition-all duration-500 hover:-translate-y-2 
                      hover:shadow-2xl hover:border-purple-300 text-left overflow-hidden">

        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

        <div className="text-purple-500 text-2xl mb-3">
  <FaBolt />
</div>


        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          Interactive Simulation
        </h3>

        <p className="text-gray-600 text-sm">
          Generates real-time outputs based on selected financial scenarios.
        </p>
      </div>


      {/* CARD 4 */}
      <div className="group relative bg-purple-100 p-7 rounded-2xl shadow-lg border border-purple-100
                      transition-all duration-500 hover:-translate-y-2 
                      hover:shadow-2xl hover:border-purple-300 text-left overflow-hidden">

        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

        <div className="text-purple-500 text-2xl mb-3">
  <FaBullseye />
</div>


        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          Clear Decision Insights
        </h3>

        <p className="text-gray-600 text-sm">
          Provides structured recommendations to support informed financial choices.
        </p>
      </div>

    </div>

  </div>
</section>

    {/* WHY DECISIOX SECTION */}

  </>
  );
}

export default Home;

import heroImage from "../assets/im4.jpg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gray-50 relative overflow-hidden">

      {/* Soft background gradient circle */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col md:flex-row items-center justify-between relative z-10">

        {/* LEFT SIDE */}
        <div className="md:w-1/2 space-y-8">

          <p className="text-blue-600 font-medium uppercase tracking-wider text-sm">
            Smart Financial Decisions
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Build Your Investment
            <span className="text-blue-600"> Strategy Intelligently</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-md">
            Simulate financial scenarios, evaluate risk tolerance,
            and receive personalized rule-based recommendations with
            interactive visual insights.
          </p>

          <div className="flex space-x-4">
            <Link
              to="/builder"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Start Simulation
            </Link>

            <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">

          <img
            src={heroImage}
            alt="Investment Illustration"
            className="w-72 md:w-96 object-contain drop-shadow-xl"
          />

        </div>

      </div>

    </section>
  );
}

export default Hero;

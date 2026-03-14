function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#1f1b2e] via-[#241f35] to-[#2b2444] pt-20 pb-10 overflow-hidden">

      {/* Soft Purple Glow */}
      <div className="absolute -top-10 left-10 w-72 h-72 bg-purple-500 opacity-10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-purple-400 opacity-10 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">

        <h2 className="text-3xl font-bold text-white mb-4">
          Decisio<span className="text-purple-400">X</span>
        </h2>

        <p className="text-gray-300 max-w-xl mx-auto text-sm mb-10 leading-relaxed">
          A modern financial decision simulator designed to simplify reasoning 
          through structured logic and interactive evaluation.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto rounded-full mb-8"></div>

        <p className="text-gray-400 text-sm">
          © 2026 Decisio<span className="text-purple-400">X</span> · Built with 
          <span className="text-purple-500 animate-pulse"> ❤️ </span> 
          by Sakshi
        </p>

      </div>

    </footer>
  );
}

export default Footer;

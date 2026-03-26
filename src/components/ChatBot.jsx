import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ChatBot = () => {

  // ✅ FIX 1: move token inside component
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 I'm your AI financial assistant. Ask me anything about investments!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (customMessage = null) => {
    const messageToSend = customMessage || input;
    if (!messageToSend.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: messageToSend }]);
    setInput("");
    setLoading(true);

    try {
      // ✅ FIX 2: add token in API call
      const res = await fetch("https://decisiox-backend.onrender.com/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,   // 🔥 IMPORTANT
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply },
      ]);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  // ✅ AUTH CHECK (same as your code)
  if (!token) {
    return (
      <div className="max-w-3xl mx-auto h-[200px] flex items-center justify-center 
      bg-white shadow rounded-2xl border text-gray-600">
        Please login to use the AI assistant.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto h-[600px] flex flex-col 
    bg-white shadow-2xl rounded-3xl border overflow-hidden">

      {/* HEADER */}
      <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
        <h2 className="font-semibold">🤖 AI Financial Assistant</h2>
        <p className="text-xs opacity-80">Smart investment guidance</p>
      </div>

      {/* SUGGESTIONS */}
      <div className="p-3 flex gap-2 flex-wrap border-b">
        {[
          "Where should I invest ₹5000?",
          "Low risk investment ideas",
          "Best strategy for beginners",
        ].map((q, i) => (
          <button
            key={i}
            onClick={() => sendMessage(q)}
            className="text-xs px-3 py-1 rounded-full 
            bg-gradient-to-r from-purple-400 to-indigo-400 
            text-white hover:opacity-90 transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* CHAT AREA */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 border"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {loading && <p className="text-sm text-gray-400">Typing...</p>}
      </div>

      {/* INPUT */}
      <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
        <div className="flex gap-2">

          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            placeholder="Ask anything about investments..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button
            onClick={() => sendMessage()}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            send
          </button>

        </div>
      </div>
    </div>
  );
};

export default ChatBot;
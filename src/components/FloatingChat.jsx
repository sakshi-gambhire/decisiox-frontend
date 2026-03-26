import { useState } from "react";
import ChatBot from "./ChatBot";
import { X } from "lucide-react";
const FloatingChat = () => {
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  return (
    <>
      {/* CHAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 
        bg-gradient-to-r from-purple-500 to-indigo-500 
        text-white w-14 h-14 rounded-full shadow-lg 
        flex items-center justify-center text-xl 
        hover:scale-110 transition"
      >
        💬
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-24 right-6 w-[350px] h-[500px] z-50 bg-white">

          {/* 🔒 NOT LOGGED IN */}
          {!token ? (
            <div className="bg-white h-full rounded-2xl shadow-xl border flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-lg font-semibold mb-2">🔒 Login Required</h2>
              <p className="text-gray-500 text-sm mb-4">
                Please login to access AI assistant
              </p>

              <button
                onClick={() => window.location.href = "/login"}
                className="bg-purple-500 text-white px-4 py-2 rounded-full"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <div className="h-full relative">

  {/* CLOSE BUTTON */}


<button
  onClick={() => setOpen(false)}
  className="absolute top-4 right-4 text-white z-50 hover:scale-110 transition"
>
  <X size={22} strokeWidth={2.5} />
</button>

  <ChatBot />
</div>
          )}

        </div>
      )}
    </>
  );
};

export default FloatingChat;
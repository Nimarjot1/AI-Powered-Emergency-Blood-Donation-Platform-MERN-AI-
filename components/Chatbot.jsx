import React, { useState } from 'react';
import { RefreshCw, X, MessageCircle } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = (e) => {
    e.preventDefault();
    const input = e.target.elements.message.value.trim();
    if (input) {
      setMessages([...messages, { sender: 'user', text: input }]);
      e.target.reset();

      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'bot', text: "I'm here to help!" }]);
      }, 500);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className="fixed bottom-6 right-6 bg-[#3a0a0a] text-white p-4 rounded-full shadow-xl z-50 hover:scale-105 transition cursor-pointer"
        onClick={toggleChat}
      >
        <MessageCircle />
      </button>

      {/* Chatbot UI */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[420px] h-[560px] bg-black rounded-xl shadow-2xl z-50 flex flex-col border border-[#3a0a0a] overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#3a0a0a] text-white flex justify-between items-center px-4 py-3">
            <div className="flex items-center gap-2">
              <img
                src="/assets/chatbot-logo.png"
                alt="Chatbot Logo"
                className="w-5 h-5"
              />
              <span className="font-semibold">Blood Helper</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setMessages([])} className="cursor-pointer">
                <RefreshCw size={18} />
              </button>
              <button onClick={toggleChat} className="cursor-pointer">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Logo Section */}
          <div className="bg-black text-white flex flex-col items-center justify-center py-8">
            <img
              src="/assets/chatbot-logo.png"
              alt="Blood Helper"
              className="w-20 mb-2"
            />
            <p className="text-lg font-semibold">Blood Helper</p>
          </div>

          {/* Chat Display */}
          <div className="flex-1 bg-black px-4 py-3 overflow-y-auto text-white text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`my-1 ${
                  msg.sender === 'user'
                    ? 'text-right text-blue-400'
                    : 'text-left text-gray-200'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="bg-black px-4 py-3 border-t border-gray-600 flex"
          >
            <input
              name="message"
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 bg-black text-white border border-transparent focus:border-gray-400 placeholder-gray-400 rounded-md outline-none"
              autoComplete="off"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-[#3a0a0a] text-white rounded-md hover:bg-[#5b0d0d] cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;

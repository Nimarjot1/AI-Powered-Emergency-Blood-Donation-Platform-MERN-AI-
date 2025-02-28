import React, { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      setChat([...chat, { user: "You", text: message }]);
      setChat((prev) => [
        ...prev,
        { user: "Bot", text: "How can I assist you with blood donation today?" },
      ]);
      setMessage("");
    }
  };

  return (
    <div className={`chatbot ${isOpen ? "open" : ""}`}>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "X" : "💬 Chat"}
      </button>
      {isOpen && (
        <div className="chatbot-content">
          <div className="chatbot-messages">
            {chat.map((msg, index) => (
              <p key={index}>
                <strong>{msg.user}:</strong> {msg.text}
              </p>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
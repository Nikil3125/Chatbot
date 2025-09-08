import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function ChatBot() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [isloading ,setloading] = useState(false) 

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessage((prev) => [...prev, userMessage]); // add user msg
    setloading(true)

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: input,
      });

      const botMessage = { type: "bot", text: response.data.response };
      setMessage((prev) => [...prev, botMessage]); // add bot msg
    } catch (error) {
      const errorMessage = {
        type: "bot",
        text: "⚠️ Error: Could not get response from API. Check API!!!",
      };
      setMessage((prev) => [...prev, errorMessage]);
    }
    setloading(false)
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="app-container">
      <h1>Simple Chatbot</h1>
      <div className="chat-container">
        {message.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;

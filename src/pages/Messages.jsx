
import React, { useState } from "react";

const messagesData = {
  alice: [
    { from: "manal", text: "Hey! How are you?", time: "10:30 AM" },
    { from: "me", text: "I’m good, wbu?", time: "10:32 AM" },
    { from: "alice", text: "Same here 😊", time: "10:33 AM" },
  ],
  bob: [
    { from: "bob", text: "Yo bro, free tonight?", time: "09:15 AM" },
    { from: "me", text: "Maybe, let me check!", time: "09:20 AM" },
  ],
  charlie: [
    { from: "charlie", text: "New project is dope 🔥", time: "Yesterday" },
    
    { from: "me", text: "Haha thanks man!", time: "Yesterday" },
  ],
  
ayesha: [
    { from: "ayesha", text: "New project is dope 🔥", time: "Yesterday" },
    
    { from: "me", text: "Haha thanks man!", time: "Yesterday" },
  ],
  alice: [
    { from: "alice", text: "New project is dope 🔥", time: "Yesterday" },
    
    { from: "me", text: "Haha thanks man!", time: "Yesterday" },
  ],
};

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState("alice");
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    messagesData[selectedChat].push({
      from: "me",
      text: input,
      time: "Now",
    });
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-pink-50 to-purple-100">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-300 bg-white shadow-lg">
        <h2 className="text-xl font-bold p-4 border-b bg-gradient-to-r from-pink-500 to-purple-500 text-white">
          Messages
        </h2>
        {Object.keys(messagesData).map((chat) => (
          <div
            key={chat}
            onClick={() => setSelectedChat(chat)}
            className={`p-4 cursor-pointer hover:bg-pink-100 transition ${
              selectedChat === chat ? "bg-pink-200 font-semibold" : ""
            }`}
          >
            {chat.charAt(0).toUpperCase() + chat.slice(1)}
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold">
          Chat with {selectedChat.charAt(0).toUpperCase() + selectedChat.slice(1)}
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-pink-50">
          {messagesData[selectedChat].map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.from === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow-md ${
                  msg.from === "me"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-white text-gray-800 border"
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-xs text-gray-400 mt-1">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex bg-white">
          <input
            type="text"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow hover:opacity-90"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

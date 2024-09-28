import React, { useEffect, useRef } from "react";
import Message from "./Message";

const ChatBox = ({ messages, setSendMessage, userName, messageContent, setMessageContent }) => {
  const endOfMessagesRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageContent.trim()) {
      setSendMessage(); 
      setMessageContent(""); 
      setTimeout(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-grow custom-scrollbar overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            text={msg.content}
            userName={userName}
            time={new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            type={msg.type}
          />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center p-4 border-t border-gray-300">
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border font-normal rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-gray-700 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;

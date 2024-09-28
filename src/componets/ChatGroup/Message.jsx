import React from 'react';

const Message = ({ text, sender, userName, time, type }) => {
  const isUser = sender === userName;

  return (
    <div className={`mb-3 ${type === "JOIN" || type === "LEAVE" ? "text-center" : ""}`}>
      {type === "JOIN" || type === "LEAVE" ? (
        <div className="text-gray-500">
          <span className="italic text-sm font-normal">
            {type === "JOIN" ? `${sender} has joined the chat` : `${sender} has left the chat`}
          </span>
        </div>
      ) : (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
          <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-center`}>
            <div className="rounded-full w-10 h-10 flex items-center justify-center m-2 shadow-md" style={{ backgroundColor: isUser ? '#f87171' : '#6C757D' }}>
              <span className="text-white font-bold text-sm">{isUser ? userName.charAt(0) : sender.charAt(0)}</span>
            </div>
            <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
              <div className={`p-3 rounded-lg text-sm text-white ${isUser ? "bg-red-500 shadow-lg" : "bg-gray-600 shadow-md"} transition-transform transform hover:scale-105`}>
                {text}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                <span>{isUser ? "You" : sender}</span> • <span>{time}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;

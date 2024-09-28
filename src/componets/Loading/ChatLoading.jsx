import React from 'react';

const ChatLoading = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-6 bg-gray-300 rounded w-full"></div>
    </div>
  );
};

export default ChatLoading;

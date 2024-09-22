import React from "react";

function EventHostingSkeleton() {
  return (
    <div className="bg-gray-800/5 m-5 shadow-md w-full max-w-md p-3 rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>

      <div className="h-8 bg-gray-300 rounded-md mb-2"></div>
      <div className="h-6 bg-gray-200 rounded-md mb-2"></div>

      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-1">
          <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-5 w-20 bg-gray-200 rounded-md"></div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-1">
          <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
        <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
      </div>

      <div className="flex justify-between pt-5">
        <button
          disabled
          className="h-10 w-32 bg-gray-300 rounded-md animate-pulse"
        ></button>
        <button
          disabled
          className="h-10 w-32 bg-gray-300 rounded-md animate-pulse"
        ></button>
      </div>
    </div>
  );
}

export default EventHostingSkeleton;

import React from "react";

function Category({ category }) {
  return (
    <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 h-24 font-sans p-3 text-gray-300 grid place-content-center rounded-full text-md w-32 transition-transform transform hover:scale-110 shadow-lg hover:shadow-2xl hover:shadow-gray-600">
      <div className="flex flex-col items-center justify-center">
        <span className="text-center transition duration-300 transform hover:scale-110 text-gray-300">{category}</span>
      </div>
    </div>
  );
}

export default Category;

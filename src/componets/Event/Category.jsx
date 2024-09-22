import React from "react";


function Category({ category }) {
  return (
    <div className="bg-gray-900/85 h-36 font-sans p-2 text-gray-400 grid place-content-center rounded-full text-lg w-36">
  <div className="flex flex-col items-center justify-center">
    <span className="text-center">{category}</span>
  </div>
</div>

  );
}

export default Category;

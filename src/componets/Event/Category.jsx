import React from "react";


function Category({ category }) {
  return (
    <div className="bg-gray-900/85 h-32 font-sans p-2 text-gray-400 grid place-content-center rounded-3xl text-lg w-36">
  <div className="flex flex-col items-center justify-center">
    <span className="text-center">{category}</span>
  </div>
</div>

  );
}

export default Category;

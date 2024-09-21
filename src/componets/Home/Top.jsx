import React from "react";

function Top() {
  return (
    <div className="w-full h-[30rem] flex justify-between pt-16 ">
      <div className="bg-white text-red-600 h-full w-[50%] p-14">
       
          <h1 class="mb-2 text-slate-800 font-extrabold text-4xl">
          Every gathering is a chance to connect and create memories.
          </h1>
          <p class="text-slate-600 leading-normal font-light">
          Every gathering is a tapestry of connections, where stories intertwine and memories are woven together.
          </p>
          { localStorage.getItem('token') == null && <div className="flex justify-between">
            <button
              class="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Join Now
            </button>
            <button
              class="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Sign In
            </button>
        </div>}
      </div>

      <div className="bg-white h-full w-[50%] ">
        <img
          class="object-cover object-center w-full h-full"
          src="https://wallpapers.com/images/hd/white-anime-urbog3hogy72tscj.jpg"
          alt="nature image"
        />
      </div>
    </div>
  );
}

export default Top;

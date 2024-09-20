import React from "react";
import { IoLocation } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";

function EventPublic() {
  return (
    <div className="bg-white m-5 w-full p-3 rounded-xl shadow-sm overflow-scroll custom-scrollbar">
      <img
        className="h-[30%] w-full rounded-lg object-cover object-center"
        src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
        alt="nature image"
      />

      <div className="text-2xl m-2">This is the title for event</div>
      <div className=" bg-gray-500/10 rounded-lg p-2 font-normal">
        Description : Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Repudiandae explicabo corporis doloremque non cumque dolorem, sunt
        quasi, sed voluptatum dicta quae nulla aspernatur perferendis, vitae
        quis ea veritatis eligendi tempora.
      </div>

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span className="flex items-center gap-1"><IoPersonSharp/>Host</span><span className="flex items-center gap-1"><IoLocation /> Location</span>
    </div>
      
      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span className="flex items-center gap-1"><CiCalendarDate/>Start</span>
        <span className="flex items-center gap-1"><CiCalendarDate/>Start</span>
    </div>
    <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span>Tickets: 100</span>
        <span>Booked: 100</span>
      </div>

      <div className="font-normal flex justify-between pt-5">
        <span className="text-lg">Free/110$</span>
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          <svg
            class="w-3.5 h-3.5 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 21"
          >
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          Buy Ticket
        </button>
      </div>
    </div>
  );
}

export default EventPublic;

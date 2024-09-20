import React from "react";
import { IoLocation } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";

function EventAttending() {
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
        <span className="flex items-center gap-1"><CiCalendarDate/>End</span>
    </div>
    
    </div>
  );
}

export default EventAttending;

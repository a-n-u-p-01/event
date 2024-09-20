import React from "react";
import EventCard2 from "../Event/EventCard2";
import FilterBtn from "./FilterBtn";
import EventHosting from "../Event/EventHosting";

function HostingEvent() {
  return (
    <div className="bg-green-500 flex justify-between">
      
        <div className="bg-red-700  overflow-scroll custom-scrollbar p-5">
          <EventCard2 />
          <EventCard2 />
          <EventCard2 />
        </div>
    
      <div className="flex justify-center bg-orange-400 w-[60%] pt-6">
        <EventHosting />
      </div>
    </div>
  );
}

export default HostingEvent; 

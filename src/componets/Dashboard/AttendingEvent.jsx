import React from "react";
import EventCard2 from "../Event/EventCard2";
import FilterBtn from "./FilterBtn";
function AttendingEvent() {
  return (
   
    <div className="w-[80%] bg-white mx-auto overflow-auto custom-scrollbar">
    <FilterBtn/>
  <div className="grid grid-cols-1">
    <EventCard2/>
    <EventCard2/>
  </div>
</div>
  );
}

export default AttendingEvent;

import React, { useState } from "react";
import EventCard2 from "../Event/EventCard2";
import EventPublic from "../Event/EventPublic";

const EventDiscovery = () => {
  return (
    <div className="bg-red-400  h-[50rem] flex ml-24 mt-20">
  


      <div className="bg-green-400 border-l-2 border-l-red-200 h-full w-full flex justify-center pt-7 ">
        <EventPublic/>
      </div>
      <div className="bg-yellow-200 border-l-2 border-l-red-200 pr-32 w-[80%] grid grid-cols-1 justify-items-center overflow-scroll custom-scrollbar pt-10">
  <EventCard2 />
  <EventCard2 />
  <EventCard2 />
</div>
    </div>
  );
};

export default EventDiscovery;

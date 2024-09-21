import React from "react";
import { IoLocation } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";

function EventAttending({ ticket }) {
  // Verify if ticket is null or undefined
  if (!ticket) {
    return (
      <div className="bg-gray-800/5 m-5 p-3 rounded-xl shadow-md">
        <p className="text-center text-xl">No tickets available.</p>
      </div>
    );
  }

  const { event } = ticket; // Destructure event and user from ticket

 
  // Safely access properties to avoid errors
  const userName = event.organizer.fullName || "Unknown Host";
  const eventTitle = event?.title || "No Title";
  const eventDescription = event?.description || "No Description";
  const eventLocation = event?.location || "Unknown Location";
  const startTime = event?.startTime ? new Date(event.startTime).toLocaleString() : "No Start Time";
  const endTime = event?.endTime ? new Date(event.endTime).toLocaleString() : "No End Time";
  const status = event.status
  

  return (
    <div className="bg-gray-800/5 m-5 h-[55%] shadow-md w-full p-3 rounded-xl md:max-w-lg lg:max-w-xl">
      <img
        className="h-[30%] w-full rounded-lg object-cover object-center"
        src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
        alt={eventTitle}
      />

      <div className="text-2xl m-2">{eventTitle}</div>
      <div className="bg-gray-500/10 rounded-lg p-2 font-normal">
        Description: {eventDescription}
      </div>

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span className="flex items-center gap-1">
          <IoPersonSharp /> {userName} (Host)
        </span>
        <span className="flex items-center gap-1">
          <IoLocation /> {eventLocation}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span className="flex items-center gap-1">
          <CiCalendarDate /> {startTime}
        </span>
        <span className="flex items-center gap-1">
          <CiCalendarDate /> {endTime}
        </span>
      </div>
      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span className={`p-1 font-mono ${status ? 'text-green-500' : 'text-red-500'}`}>Status {status ? "Active":"Ended"}</span>
      </div>
    </div>
  );
}

export default EventAttending;

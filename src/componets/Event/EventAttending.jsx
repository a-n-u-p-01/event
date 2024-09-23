import React, { useState } from "react";
import { IoLocation } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import FeedBackForm from "../User/FeedBackForm";

function EventAttending({ ticket }) {
  // Verify if ticket is null or undefined
  if (!ticket) {
    return (
      <div className="bg-gray-800/5 m-5 p-3 rounded-xl shadow-md">
        <p className="text-center text-xl">No tickets available.</p>
      </div>
    );
  }

  const { event } = ticket; // Destructure event from ticket

  // Safely access properties to avoid errors
  const userName = event.organizer?.fullName || "Unknown Host";
  const eventTitle = event?.title || "No Title";
  const eventDescription = event?.description || "No Description";
  const eventLocation = event?.location || "Unknown Location";
  const startTime = event?.startTime ? new Date(event.startTime).toLocaleString() : "No Start Time";
  const endTime = event?.endTime ? new Date(event.endTime).toLocaleString() : "No End Time";
  const status = event.status; // assuming this is a boolean
  const ticketType = ticket.ticketType;

  // Mapping ticket types to their respective descriptions and colors
  const ticketTypeMap = {
    1: { label: "Basic", color: "text-yellow-600" },
    2: { label: "Standard", color: "text-gray-400" },
    3: { label: "Premium", color: "text-yellow-300" },
  };

  const ticketTypeInfo = ticketTypeMap[ticketType] || { label: "Unknown", color: "text-gray-500" };


  return (
    <div className="bg-gray-800/5 m-5 h-[70%] shadow-md  bg p-3 rounded-xl ">
      <img
        className="w-full h-32 rounded-lg object-cover object-center"
        src={event.imageUrl}
        alt={eventTitle}
      />

      <div className="text-xl m-2">
        <span className="bg-zinc-600/20 mr-2 text-sm font-sans rounded-lg">
          {event.eventId}
        </span>
        {eventTitle}
      </div>
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
        <span className={`p-1 font-mono ${status ? 'text-green-500' : 'text-red-500'}`}>
          Status: {status ? "Active" : "Ended"}
        </span>
        <span className={`p-1 font-mono ${ticketTypeInfo.color}`}>
          {ticketTypeInfo.label}
        </span>
      </div>
      <FeedBackForm disabled={status} eventId={event.eventId} />
    </div>
  );
}

export default EventAttending;

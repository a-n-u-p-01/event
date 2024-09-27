import React, { useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import FeedBackForm from "../User/FeedBackForm";
import { useState } from "react";
import axios from "axios";
import { APP_URL } from "../util";
import Login from "../Auth/Login";
import { header } from "framer-motion/client";

function EventAttending({ ticket }) {
  const [isCanceled, setIsCanceled] = useState(null);
  const ticketId = ticket.ticketId;
  useEffect(() => {
    setIsCanceled(cancelStatus);
  }, []);

  const handleCancel = async () => {
    try {
      const response = await axios.get(`${APP_URL}/ticket/cancel/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setIsCanceled(true)
    } catch (err) {
      return console.log(err);
    }
  };

  if (!ticket) {
    return (
      <div className="bg-gray-800/5 m-3 p-3 rounded-xl shadow-md">
        <p className="text-center text-xl">No tickets available.</p>
      </div>
    );
  }

  console.log(ticketId);

  const { event } = ticket;
  const userName = event.organizer?.fullName || "Unknown Host";
  const eventTitle = event?.title || "No Title";
  const eventDescription = event?.description || "No Description";
  const eventLocation = event?.location || "Unknown Location";
  const startTime = event?.startTime
    ? new Date(event.startTime).toLocaleString()
    : "No Start Time";
  const endTime = event?.endTime
    ? new Date(event.endTime).toLocaleString()
    : "No End Time";
  const status = event.status;
  const ticketType = ticket.ticketType;
  const cancelStatus = ticket.cancelStatus;

  console.log(cancelStatus);

  const ticketTypeMap = {
    1: { label: "Basic", color: "text-yellow-600" },
    2: { label: "Standard", color: "text-gray-400" },
    3: { label: "Premium", color: "text-yellow-300" },
  };

  const ticketTypeInfo = ticketTypeMap[ticketType] || {
    label: "Unknown",
    color: "text-gray-500",
  };

  return (
    <div className="bg-gray-800/5 m-3 max-w-md shadow-md p-3 rounded-xl">
      <img
        className="w-full h-32 rounded-lg object-cover"
        src={event.imageUrl}
        alt={eventTitle}
      />
      <div className="text-xl m-2">
        <span className="bg-zinc-600/20 mr-2 text-sm rounded-lg">
          {event.eventId}
        </span>
        {eventTitle}
      </div>
      <div className="bg-gray-500/10 text-sm font-normal rounded-lg p-2">
        Description: {eventDescription}
      </div>
      <div className="flex justify-between font-normal pt-4">
        <span className="flex items-center gap-1">
          <IoPersonSharp /> {userName} (Host)
        </span>
        <span className="flex items-center gap-1">
          <IoLocation /> {eventLocation}
        </span>
      </div>
      <div className="flex justify-between font-normal pt-4">
        <span className="flex items-center gap-1">
          <CiCalendarDate /> {startTime}
        </span>
        <span className="flex items-center gap-1">
          <CiCalendarDate /> {endTime}
        </span>
      </div>
      <div className="flex justify-between pt-4">
        <span
          className={`p-1 font-mono ${
            status ? "text-green-500" : "text-red-500"
          }`}
        >
          Status: {status ? "Active" : "Ended"}
        </span>
        <span className={`p-1 font-mono ${ticketTypeInfo.color}`}>
          {ticketTypeInfo.label}
        </span>
      </div>
      <button className="text-red-600 pl-1" onClick={handleCancel}>
        {isCanceled ? "Canceled" : "Cancel ticket"}
      </button>
      <FeedBackForm disabled={status} eventId={event.eventId} />
    </div>
  );
}

export default EventAttending;

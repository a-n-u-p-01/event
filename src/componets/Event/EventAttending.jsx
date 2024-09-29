import React, { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import FeedBackForm from "../User/FeedBackForm";
import axios from "axios";
import { APP_URL } from "../util";

function EventAttending({ ticket }) {
  const [isCanceled, setIsCanceled] = useState(ticket.cancelStatus);

  const handleCancel = async () => {
    try {
      await axios.get(`${APP_URL}/ticket/cancel/${ticket.ticketId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setIsCanceled(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (!ticket) {
    return <div className="bg-gray-800/5 m-3 p-3 rounded-xl shadow-md">No tickets available.</div>;
  }

  const { event } = ticket;
  const {
    title: eventTitle,
    location: eventLocation,
    startTime,
    endTime,
    status,
    imageUrl,
  } = event;

  return (
    <div className="bg-gray-800/10 m-2 p-4 rounded-lg shadow-md flex flex-col">
      <img className="w-full h-32 rounded-lg object-cover" src={imageUrl} alt={eventTitle} />
      <h2 className="text-lg font-semibold mt-2">{eventTitle}</h2>
      <div className="flex justify-between mt-2 text-xs">
        <span className="flex items-center text-gray-700">
          <IoPersonSharp /> {event.organizer?.fullName || "Unknown Host"}
        </span>
        <span className="flex items-center text-gray-700">
          <IoLocation /> {eventLocation || "Unknown Location"}
        </span>
      </div>
      <div className="flex justify-between mt-1 text-xs">
        <span className="flex items-center text-gray-700">
          <CiCalendarDate /> {new Date(startTime).toLocaleString() || "No Start Time"}
        </span>
        <span className="flex items-center text-gray-700">
          <CiCalendarDate /> {new Date(endTime).toLocaleString() || "No End Time"}
        </span>
      </div>
      <div className="flex justify-between mt-1 text-xs">
        <span className={`p-1 font-mono ${status ? "text-green-500" : "text-red-500"}`}>
          Status: {status ? "Active" : "Ended"}
        </span>
        <button
          className={`text-sm ${isCanceled ? "text-gray-400" : "text-red-600"} font-semibold`}
          onClick={isCanceled ? null : handleCancel}
        >
          {isCanceled ? "Canceled" : "Cancel Ticket"}
        </button>
      </div>
      <FeedBackForm disabled={status} eventId={event.eventId} />
    </div>
  );
}

export default EventAttending;

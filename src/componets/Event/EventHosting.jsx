import React, { useState, useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import EventPublicSkeleton from "../Loading/EventPublicSkeleton";
import { APP_URL } from "../util";

function EventHosting({ hostEventId }) {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${APP_URL}/event/get-event/${hostEventId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvent(data.event);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (hostEventId) {
      fetchEvent();
    }
  }, [hostEventId]);


const [bookedNumber,setBookedNumber] = useState(0);

  useEffect(() => {
    const fetchBookedTickets = async () => {
      try {
        const response = await fetch(
          `${APP_URL}/ticket/get-no-ticket-booked/${hostEventId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBookedNumber(data);
      } catch (error) {
        console.error("Error fetching booked tickets:", error);
      }
    };

    fetchBookedTickets();
  }, [hostEventId]);
  

  if (!event) {
    return <div>No event found.</div>;
  }

  const {
    title,
    description,
    organizer,
    location,
    startTime,
    endTime,
    capacity,
    bookedTickets,
  } = event;

  return (
    <div className="bg-gray-800/5 m-5 shadow-md w-full max-w-md h-96 p-3 rounded-xl overflow-auto custom-scrollbar">
      <img
        className="h-[30%] w-full rounded-lg object-cover object-center"
        src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
        alt="nature image"
      />

      <div className="text-2xl m-2">{title || "N/A"}</div>
      <div className="bg-gray-500/10 rounded-lg p-2 font-normal">
        Description: {description || "N/A"}
      </div>

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span className="flex items-center gap-1">
          <IoPersonSharp /> {organizer?.fullName || "N/A"}
        </span>
        <span className="flex items-center gap-1">
          <IoLocation /> {location || "N/A"}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span className="flex items-center gap-1">
          <CiCalendarDate /> Start: {startTime || "N/A"}
        </span>
        <span className="flex items-center gap-1">
          <CiCalendarDate /> End: {endTime || "N/A"}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span>Tickets: {capacity || "N/A"}</span>
        <span>Booked: {bookedNumber || "0"}</span>
      </div>

      <div className="font-normal flex justify-end pt-5">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default EventHosting;

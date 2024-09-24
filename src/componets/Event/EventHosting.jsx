import React, { useState, useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import { APP_URL } from "../util";
import Attendees from "../User/Attendees";
import EventHostingSkeleton from "../Loading/EventHostingSkeleton";

function EventHosting({ loading, setLoading, hostEventId, setShowAttendees }) {
  const [event, setEvent] = useState(null);
  const [bookedNumber, setBookedNumber] = useState(0);
  const [eventStatus, setEventStatus] = useState(true);
  const [closing, setClosing] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true); // New loading state for data fetching

  useEffect(() => {
    const fetchEventAndTickets = async () => {
      setLoading(true);
      setIsDataLoading(true); // Set data loading to true at the beginning

      try {
        const eventResponse = await fetch(`${APP_URL}/event/get-event/${hostEventId}`);
        if (!eventResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const eventData = await eventResponse.json();
        setEvent(eventData.event);
        setEventStatus(eventData.event.status);

        const ticketsResponse = await fetch(`${APP_URL}/ticket/get-no-ticket-booked/${hostEventId}`);
        if (!ticketsResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const bookedData = await ticketsResponse.json();
        setBookedNumber(bookedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsDataLoading(false); // Set data loading to false when all fetching is complete
        setLoading(false); // Set loading to false
      }
    };

    if (hostEventId) {
      fetchEventAndTickets();
    }
  }, [hostEventId, setLoading]);

  const handleCloseEvent = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }
    setClosing(true);
    try {
      const response = await fetch(`${APP_URL}/event/change-status/${hostEventId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setClosing(false);
      setEventStatus(false);
    } catch (error) {
      console.error("Error closing event:", error);
    }
  };

  // Show skeleton only while data is being loaded
  if (isDataLoading) {
    return <EventHostingSkeleton />;
  }

  if (!event) {
    return (
      <div>
        <p className="text-gray-500 transition-opacity duration-300 ease-in-out opacity-0">
          No Event found.
        </p>
      </div>
    );
  }

  const {
    title,
    description,
    organizer,
    location,
    startTime,
    endTime,
    capacity,
    imageUrl,
  } = event;

  return (
    <div className="bg-gray-800/5 m-5 shadow-md w-full max-w-md p-3 rounded-xl overflow-hidden">
      <>
        <img
          className="w-full h-[30%] rounded-lg object-cover object-center"
          src={imageUrl}
          alt="Event"
        />
        <div className="text-xl m-2">
          <span className="bg-zinc-600/20 p-1 m-1 text-lg font-sans rounded-lg">
            {hostEventId}
          </span>
          {title || "N/A"}
        </div>
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
        <div className="font-normal flex justify-between pt-5">
          <button
            type="button"
            onClick={() => {
              setShowAttendees(true);
              setLoading(true);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            See Attendees
          </button>
          {!eventStatus ? (
            <span className="text-red-500">Closed</span>
          ) : closing ? (
            <span className="text-yellow-500">Closing...</span>
          ) : (
            <button
              type="button"
              onClick={handleCloseEvent}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              Close Event
            </button>
          )}
        </div>
      </>
    </div>
  );
}

export default EventHosting;

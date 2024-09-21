import React, { useState, useEffect, useRef } from "react";
import { IoLocation } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import EventPublicSkeleton from "../Loading/EventPublicSkeleton";

function EventPublic({ eventId }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for dropdown

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8888/api/event/get-event/${eventId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvent(data.event);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  useEffect(() => {
    // Close dropdown on click outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <EventPublicSkeleton />;
  }

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
    ticketPricing,
  } = event;

  const handleTicketSelect = (ticketType) => {
    setSelectedTicket(ticketType);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-800/5 m-5 shadow-md w-full p-3 rounded-xl overflow-scroll custom-scrollbar">
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
        <span>Booked: {/* Add booked tickets count here */}</span>
      </div>

      <div className="font-normal flex justify-between pt-5 relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="rounded-md bg-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
          type="button"
        >
          {selectedTicket ? `${selectedTicket.charAt(0).toUpperCase() + selectedTicket.slice(1)} - $${ticketPricing?.[`${selectedTicket}Price`]}` : "Price"}
        </button>
        {isDropdownOpen && (
          <ul
            role="menu"
            className="absolute mt-10 z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5"
          >
            {["basic", "standard", "premium"].map((type) => (
              <li
                key={type}
                role="menuitem"
                onClick={() => handleTicketSelect(type)}
                className={`cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 ${selectedTicket === type ? "bg-slate-200" : ""}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} - ${ticketPricing?.[`${type}Price`] || "N/A"}
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          <svg
            className="w-3.5 h-3.5 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 21"
          >
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          Buy Ticket
        </button>
      </div>
    </div>
  );
}

export default EventPublic;

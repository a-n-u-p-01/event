import React, { useState, useEffect, useRef } from "react";
import { IoLocation } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import EventPublicSkeleton from "../Loading/EventPublicSkeleton";
import { APP_URL } from "../util";
import { useNavigate } from "react-router-dom";
import Feedback from "./Feedbacks";
import CommentsBox from "../User/CommentsBox";

function EventPublic({ eventId, setShowFeedbacks, showFeedbacks }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [bookedNumber, setBookedNumber] = useState(0);
  const [eventNotFound, setEventNotFound] = useState(false);
  const [isProceeding, setIsProceeding] = useState(false); // New state for processing
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const response = await fetch(`${APP_URL}/event/get-event/${eventId}`);
        if (!response.ok) throw new Error("Failed to fetch event.");
        const data = await response.json();
        if (!data.event) {
          setEventNotFound(true);
        } else {
          setEvent(data.event);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load event. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  useEffect(() => {
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

  useEffect(() => {
    const fetchBookedTickets = async () => {
      try {
        const response = await fetch(
          `${APP_URL}/ticket/get-no-ticket-booked/${eventId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setBookedNumber(data);
      } catch (error) {
        console.error("Error fetching booked tickets:", error);
      }
    };

    fetchBookedTickets();
  }, [eventId]);

  if (loading) {
    return <EventPublicSkeleton />;
  }

  if (eventNotFound) {
    return <div>No event found.</div>;
  }

  if (!event) {
    return <div>No event data available.</div>;
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
    imageUrl,
  } = event;

  const handleTicketSelect = (ticketType) => {
    setSelectedTicket(ticketType);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleBuyTicket = () => {
    if (selectedTicket) {
      setIsProceeding(true); // Start processing
      const price = ticketPricing?.[`${selectedTicket}Price`] || "N/A";
      // Show a temporary message for processing
      setTimeout(() => {
        navigate(
          `/payment?id=${eventId}&type=${selectedTicket}&price=${price}`
        );
      }, 1000); // 1 second delay
    } else {
      alert("Please select a ticket type before proceeding.");
    }
  };

  const isSoldOut = bookedNumber >= capacity;

  let ticketButton;

  if (event.status && !isSoldOut) {
    ticketButton = (
      <>
        <button
          onClick={toggleDropdown}
          className="rounded-md bg-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg"
          type="button"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          {selectedTicket
            ? `${
                selectedTicket.charAt(0).toUpperCase() + selectedTicket.slice(1)
              } - $${ticketPricing?.[`${selectedTicket}Price`] || "N/A"}`
            : "Price"}
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
                className={`cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 ${
                  selectedTicket === type ? "bg-slate-200" : ""
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} - $
                {ticketPricing?.[`${type}Price`] || "N/A"}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  } else if (isSoldOut && event.status) {
    ticketButton = (
      <span className="text-red-700 font-mono p-2 font-semibold text-lg">
        Sold Out
      </span>
    );
  } else if (!isSoldOut && !event.status) {
    ticketButton = (
      <span className="text-red-700 font-mono p-2 font-semibold text-lg">
        Ended
      </span>
    );
  } else if (isSoldOut && !event.status) {
    ticketButton = (
      <span className="text-red-700 font-mono p-2 font-semibold text-lg">
        Ended
      </span>
    );
  }

  console.log(event);

  //main container
  return showFeedbacks ? (
    <Feedback setShowFeedbacks={setShowFeedbacks} eventId={eventId} />
  ) : (
    <div className="flex flex-col custom-scrollbarEvent overflow-y-scroll h-full bg-zinc-800/5 m-5 shadow-md w-full p-3 rounded-xl overflow-hidden">
      <img
        className="h-[30%] w-full rounded-lg object-cover object-center"
        src={imageUrl}
        alt="Event"
      />

      <div className="text-xl m-2">
        <span className="bg-zinc-600/20 p-1 m-1 text-lg font-sans rounded-lg">
          {eventId}
        </span>
        {title || "N/A"}
      </div>
      <div className="bg-gray-500/10 rounded-lg p-2 font-normal">
        Description: {description || "N/A"}
      </div>

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span className="flex items-center gap-1">
          <IoPersonSharp />{" "}
          {event.organizer.userId == localStorage.getItem("userId")
            ? "You"
            : organizer?.fullName || "N/A"}
          -[Host]
        </span>
        <span className="flex items-center gap-1">
          <IoLocation /> {location || "N/A"}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span className="flex items-center gap-1">
          <CiCalendarDate /> Start:{" "}
          {startTime
            ? `${new Date(startTime).toLocaleTimeString()} | ${new Date(
                startTime
              ).toLocaleDateString()} `
            : "N/A"}
        </span>
        <span className="flex items-center gap-1">
          <CiCalendarDate /> End:{" "}
          {endTime
            ? `${new Date(endTime).toLocaleTimeString()} | ${new Date(
                endTime
              ).toLocaleDateString()} `
            : "N/A"}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span>Tickets: {capacity-bookedNumber || "N/A"}</span>
        <span>Booked: {bookedNumber}</span>
      </div>

      <div
        className="font-normal flex justify-between pt-5 relative"
        ref={dropdownRef}
      >
        {ticketButton}

        {!isSoldOut && event.status && (
          <button
            onClick={handleBuyTicket}
            type="button"
            disabled={event.organizer.userId == localStorage.getItem("userId")}
            className={`text-white ${
              event.organizer.userId == localStorage.getItem("userId")
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center`}
          >
            {isProceeding ? (
              <span>Proceeding...</span>
            ) : (
              <>
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
              </>
            )}
          </button>
        )}
      </div>

      <div className="mt-auto p-2 flex justify-between">
        {!event.status && (
          <button
            onClick={() => setShowFeedbacks(true)}
            type="button"
            className="font-medium rounded-lg text-sm text-center inline-flex items-center text-green-600"
          >
            See Feedbacks
          </button>
        )}
        <button className="text-zinc-700" onClick={() => {navigate(`/chat-group?eventId=${eventId}`)}}>
          Community
        </button>
      </div>

      <CommentsBox eventId={eventId} />
    </div>
  );
}

export default EventPublic;

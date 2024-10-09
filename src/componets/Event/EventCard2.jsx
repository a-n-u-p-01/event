import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import EventCard2Skeleton from "../Loading/EventCard2Skeleton";

function EventCard2({ setShowFeedbacks, event, handleEventId, loading, titleLimit = 100, totalLimit = 200 }) {
  const navigate = useNavigate(); // Initialize navigate

  const handClick = () => {
    setShowFeedbacks(false);
    handleEventId(event.eventId);
    navigate(`?id=${event.eventId}`, { replace: true }); // Update URL on click
  };

  const truncateText = (text, charLimit) => {
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit) + "...";
  };

  // Truncate title if it exceeds the title limit
  const truncatedTitle = truncateText(event.title, titleLimit);
  const titleLength = truncatedTitle.length;

  // Calculate the remaining limit for the description
  const remainingLimit = totalLimit - titleLength > 0 ? totalLimit - titleLength : 0;
  const truncatedDescription = truncateText(event.description, remainingLimit);

  if (loading) {
    return <EventCard2Skeleton />;
  }

  return (
    <div
      id={event.eventId}
      className="my-3 bg-white h-48 shadow-sm border border-slate-200 rounded-lg w-96 flex flex-col"
    >
      <div className="p-2 flex-grow">
        <h5 className="mb-1 text-slate-800 font-semibold bg-zinc-700/5 rounded-md">
          <span className="bg-gray-700/20 p-1 mr-1 rounded-md text-sm font-sans">
            {event.eventId}
          </span>
          {truncatedTitle}
        </h5>
        <p className="text-slate-600 leading-normal font-light text-sm">
          <span className="font-semibold">Description: </span>{truncatedDescription}
        </p>
        <div className="flex justify-end font-normal">{event.category}</div>
      </div>
     
      <div className="flex justify-between p-2">
        <span className="text-red-600">{!event.status && "Ended"}</span>
        <button
          onClick={handClick}
          className="rounded-md bg-slate-800 py-1 px-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          More Details
        </button>
      </div>
    </div>
  );
}

export default EventCard2;

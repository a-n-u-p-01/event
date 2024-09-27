import React from "react";
import { useNavigate } from "react-router-dom";

function EventCard({ event, titleLimit = 50, totalLimit = 80 }) {
  const navigate = useNavigate();

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

  return (
    <div className="w-72 h-48 bg-gray-800/10 rounded-3xl shadow-lg flex flex-col">
      <div className="p-3 flex-grow">
     
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
            <span className="bg-gray-50 p-1 text-sm font-sans rounded-lg">
              {event.eventId}
            </span>{" "}
            {truncatedTitle}
          </h5>
       
        <p className="mb-3 font-normal text-sm text-gray-700">
       <span className="font-semibold"> Description:</span> {truncatedDescription}
        </p>
      </div>
      <button 
        onClick={() => navigate(`/events?id=${event.eventId}`)} 
        className="m-3 w-32 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Book now
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  );
}

export default EventCard;

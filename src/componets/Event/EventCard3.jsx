import React from "react";
import EventCard2Skeleton from "../Loading/EventCard2Skeleton";

function EventCard3({
  event,
  setHostEventId,
  loading,
  setShowAttendees,
  titleLimit = 40,
  descriptionLimit = 100,
  setIsEditing
}) {
  const handleClick = () => {
    setShowAttendees(false);
    setHostEventId(event.eventId);
  };

  const truncateText = (text, charLimit) => {
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit) + "...";
  };

  // Truncate title and description based on the limits
  const truncatedTitle = truncateText(event.title, titleLimit);
  const truncatedDescription = truncateText(
    event.description,
    descriptionLimit
  );

  return (
    <div
      id={event.eventId}
      className="my-6 bg-white h-48 shadow-sm border border-slate-200 rounded-lg w-96 relative flex flex-col"
    >
      <div className="p-4 flex-grow">
        <h5 className="mb-2 text-slate-800 text-lg font-semibold bg-zinc-900/10 p-2 rounded-lg">
          <span className="bg-zinc-100 m-1 p-1 text-sm rounded-lg">
            {event.eventId}
          </span>
          {truncatedTitle}
        </h5>
        <p className="text-slate-600 leading-normal font-light">
          <span className="font-semibold">Description: </span>
          {truncatedDescription}
        </p>
      </div>
      <div className="flex justify-between mb-5 ml-4 mr-4">
        <button onClick={()=>
        {
          setIsEditing(true)
          setHostEventId(event.eventId);
        }
        } className="text-blue-500 hover:text-blue-700">Edit</button>

        <button
          onClick={handleClick}
          className="rounded-md bg-slate-800 py-1 px-2 text-xs text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 disabled:pointer-events-none disabled:opacity-50"
          type="button"
        >
          More Details
        </button>
      </div>
    </div>
  );
}

export default EventCard3;

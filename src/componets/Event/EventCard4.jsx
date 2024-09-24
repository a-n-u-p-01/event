import React, { useState } from 'react';
import axios from 'axios';
import { APP_URL } from '../util';

function EventCard4({ event, setEvents, titleLimit = 40, descriptionLimit = 100 }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true); // Set loading to true when the request starts

    try {
      // Send a DELETE request to the server
      await axios.delete(`${APP_URL}/event/delete/${event.eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      // Update the local state to remove the event
      setEvents(prevEvents => prevEvents.filter(e => e.eventId !== event.eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      // Optionally, show a user-friendly message here
    } finally {
      setLoading(false); // Set loading back to false when the request is complete
    }
  };

  const truncateText = (text, charLimit) => {
    return text.length <= charLimit ? text : text.slice(0, charLimit) + '...';
  };

  const truncatedTitle = truncateText(event.title, titleLimit);
  const truncatedDescription = truncateText(event.description, descriptionLimit);

  return (
    <div id={event.eventId} className="my-6 bg-white h-48 shadow-sm border border-slate-200 rounded-lg w-96 relative flex flex-col">
      <div className="p-4 flex-grow">
        <h5 className="mb-2 text-slate-800 text-lg font-semibold bg-zinc-900/10 p-2 rounded-lg">
          <span className='bg-zinc-100 m-1 p-1 text-sm rounded-lg'>{event.eventId}</span> 
          {truncatedTitle}
        </h5>
        <p className="text-slate-600 leading-normal font-light">
          <span className='font-semibold'>Description: </span>{truncatedDescription}
        </p>
      </div>
      <div className="absolute bottom-4 right-4">
        <button
          onClick={handleClick}
          className={`rounded-md py-1 px-2 text-xs text-white transition-all shadow-md hover:shadow-lg ${loading ? 'bg-gray-400' : 'bg-red-600'}`}
          type="button"
          disabled={loading} 
        >
          {loading ? 'Deleting...' : 'Delete Event'}
        </button>
      </div>
    </div>
  );
}

export default EventCard4;

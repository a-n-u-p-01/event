import React from 'react';
import EventCard2Skeleton from '../Loading/EventCard2Skeleton';

function EventCard2({ event, handleEventId, loading }) {
  const handClick = () => {
    handleEventId(event.eventId);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  if (loading) {
    return <EventCard2Skeleton />;
  }

  return (
    <div id={event.eventId} className="my-6 bg-white h-60 shadow-sm border border-slate-200 rounded-lg w-96">
      <div className="p-4">
        <h5 className="mb-2 text-slate-800 text-xl font-semibold">{event.title}</h5>
        <p className="text-slate-600 leading-normal font-light">{truncateText(event.description, 15)}</p>
        <div className='flex justify-end'>
          {/* <button onClick={handClick} className="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            Read more
          </button> */}
          <button onClick={handClick} className="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            More Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard2;

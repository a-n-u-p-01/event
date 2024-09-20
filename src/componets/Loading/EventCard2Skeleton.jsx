import React from 'react';

function EventCard2Skeleton() {
  return (
    <div className="my-6 bg-white h-60 shadow-sm border border-slate-200 rounded-lg w-96 animate-pulse">
      <div className="p-4">
        <div className="mb-2 h-6 bg-slate-300 rounded w-3/4"></div>
        <div className="h-4 bg-slate-300 rounded w-full mb-4"></div>
        <div className="h-4 bg-slate-300 rounded w-full mb-4"></div>
        <div className="flex justify-between">
          <div className="h-8 bg-slate-300 rounded w-1/2"></div>
          <div className="h-8 bg-slate-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export default EventCard2Skeleton;

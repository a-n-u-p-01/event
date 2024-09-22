import React from "react";

function EventPublicSkeleton() {
  return (
    <div className="bg-white m-5 w-full p-3 rounded-xl shadow-sm">
      <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div> {/* Placeholder for image */}

      <div className="h-8 bg-gray-300 animate-pulse rounded m-2"></div> {/* Title placeholder */}
      <div className="h-12 bg-gray-300 animate-pulse rounded p-2 my-2"></div> {/* Description placeholder */}

      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-1 bg-gray-300 animate-pulse h-8 rounded"></div> {/* Organizer placeholder */}
        <div className="flex items-center gap-1 bg-gray-300 animate-pulse h-8 rounded"></div> {/* Location placeholder */}
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-1 bg-gray-300 animate-pulse h-8 rounded"></div> {/* Start time placeholder */}
        <div className="flex items-center gap-1 bg-gray-300 animate-pulse h-8 rounded"></div> {/* End time placeholder */}
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="bg-gray-300 animate-pulse h-8 rounded"></div> {/* Capacity placeholder */}
        <div className="bg-gray-300 animate-pulse h-8 rounded"></div> {/* Booked tickets placeholder */}
      </div>

      <div className="flex justify-between pt-5">
        <div className="bg-gray-300 animate-pulse h-8 w-24 rounded"></div> {/* Price placeholder */}
        <button className="bg-gray-300 animate-pulse h-10 w-32 rounded"></button> {/* Buy Ticket button placeholder */}
      </div>
    </div>
  );
}

export default EventPublicSkeleton;

import React from "react";

function EventPublicSkeleton() {
  return (
    <div className="bg-white m-5 w-full p-3 rounded-xl shadow-md overflow-auto custom-scrollbar md:max-w-lg lg:max-w-xl">
      <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div> {/* Placeholder for image */}

      <div className="h-10 bg-gray-300 animate-pulse rounded m-2"></div> {/* Title placeholder */}
      <div className="h-20 bg-gray-300 animate-pulse rounded p-2 my-2"></div> {/* Description placeholder */}

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span className="flex items-center gap-1 bg-gray-300 animate-pulse h-8 rounded w-1/2"></span> {/* Organizer placeholder */}
        <span className="flex items-center gap-1 bg-gray-300 animate-pulse h-8 rounded w-1/2"></span> {/* Location placeholder */}
      </div>

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span className="flex items-center gap-1 bg-gray-300 animate-pulse h-8 rounded w-1/2"></span> {/* Start time placeholder */}
        <span className="flex items-center gap-1 bg-gray-300 animate-pulse h-8 rounded w-1/2"></span> {/* End time placeholder */}
      </div>

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <span className="bg-gray-300 animate-pulse h-8 rounded w-1/2"></span> {/* Capacity placeholder */}
        <span className="bg-gray-300 animate-pulse h-8 rounded w-1/2"></span> {/* Booked tickets placeholder */}
      </div>

      <div className="font-normal flex justify-between pt-5 relative">
        <div className="bg-gray-300 animate-pulse h-8 w-24 rounded"></div> {/* Price placeholder */}
        <button className="bg-gray-300 animate-pulse h-10 w-32 rounded"></button> {/* Buy Ticket button placeholder */}
      </div>
    </div>
  );
}

export default EventPublicSkeleton;

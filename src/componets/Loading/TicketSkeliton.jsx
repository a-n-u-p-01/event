import React from "react";
import Skeleton from "react-loading-skeleton"; // Make sure to install this package

function TicketSkeleton() {
  return (
    <div className="bg-gray-800/5 m-5 h-[55%] shadow-md w-full p-3 rounded-xl md:max-w-lg lg:max-w-xl">
      <Skeleton height={200} className="rounded-lg" />
      
      <div className="text-2xl m-2">
        <Skeleton width={150} />
      </div>
      <div className="bg-gray-500/10 rounded-lg p-2 font-normal">
        <Skeleton count={2} />
      </div>
      
      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <Skeleton width={100} />
        <Skeleton width={150} />
      </div>

      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <Skeleton width={100} />
        <Skeleton width={100} />
      </div>
      
      <div className="flex items-center justify-between pt-4 font-sans font-normal">
        <Skeleton width={100} />
        <Skeleton width={80} />
      </div>
    </div>
  );
}

export default TicketSkeleton;

import React from "react";
import { useLocation} from 'react-router-dom';

function EventCard({event}) {
 
    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
      };
    
  return (
    <div className="w-72 h-48 bg-gray-800/10 rounded-3xl shadow-lg"> 
      
      <div className="p-3">
        <a href="#">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                        {truncateText(event.title, 15)}
          </h5>
        </a> 
        <p className="mb-3 font-normal text-sm text-gray-700">
          {truncateText(event.description, 15)}
        </p>
        <a 
          href=""
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
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
        </a>
      </div>
    </div>
  );
}

export default EventCard;

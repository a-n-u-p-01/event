import React from 'react';

function Attendee({ attendee, ticketType }) {
  // Define the styles and labels based on ticket type
  const ticketInfo = {
    1: { label: 'Basic', textColor: 'text-yellow-600' },    // Bronze color
    2: { label: 'Standard', textColor: 'text-gray-400' },     // Silver color
    3: { label: 'Premium', textColor: 'text-yellow-300' },     // Gold color
  };


  const { label, textColor } = ticketInfo[ticketType] || { label: 'Unknown', textColor: 'text-gray-300' };

  return (
    <div className={`bg-gray-200 text-gray-800 font-mono h-8 w-[80%] flex justify-between rounded-lg p-2 pl-4 pr-4`}>
      <span>{attendee.fullName}</span>
      <span className={textColor}>{label}</span>
    </div>
  );
}

export default Attendee;

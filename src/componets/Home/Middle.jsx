import React, { useState, useEffect } from 'react';
import EventCard from '../Event/EventCard';
import { useNavigate } from 'react-router-dom';

function Middle() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const handleGoEventDis = () => {
    navigate('/events');
  };

  useEffect(() => {
    // Fetch data from the API
    fetch(`http://localhost:8888/api/event/get-all`)
      .then(response => {
        // Check if the response is okay
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setEvents(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <div className='w-full h-[30rem] bg-red-600 p-6'>
      <div className='flex justify-between ml-10 mr-10 '>
      <h2 className=' text-white font-semibold text-2xl'>Upcoming Events</h2>
      <button onClick={handleGoEventDis} className=' text-white font-semibold text-lg'>See all</button>
      </div>
      <div className='flex justify-around'>
        {events.slice(0,4).map((event, index) => (
          <EventCard
            event={event}
          />
        ))}
      </div>
    </div>
  );
}

export default Middle;

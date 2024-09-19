import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EventCard from '../Event/EventCard';

const EventDiscovery = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('search'); // Get the query from the URL
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); // To store filtered events

  useEffect(() => {
    // Fetch all events from the API when the component mounts
    fetch('http://localhost:8888/api/event/get-all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setEvents(data); // Set all events
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  useEffect(() => {
    // Filter events based on the search query
    if (query) {
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase()) // Check if the event title contains the query
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events); // Show all events if no query
    }
  }, [query, events]); // Re-run when query or events change

  return (
    <div className='bg-blue-400 w-full h-[50rem]'>
      <div className='bg-green-400 h-10 flex justify-center items-center'>Search Result</div>
      <div className='flex bg-orange-300 h-full m-10 mb-0'>
        <div className='overflow-scroll bg-violet-400 w-full m-20 grid grid-cols-4 p-5 gap-4 '>
        {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <EventCard
                key={index} // Ensure to add a unique key for each element
                event={event}
              />
            ))
          ) : (
            <div className="text-center w-full">No events found</div> // Show this text when filteredEvents is empty
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDiscovery;

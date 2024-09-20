import React, { useState, useEffect, useRef } from "react";
import EventCard2 from "../Event/EventCard2";
import EventPublic from "../Event/EventPublic";
import { useLocation } from 'react-router-dom';
import EventCard2Skeleton from "../Loading/EventCard2Skeleton";

const EventDiscovery = () => {
  const [eventId, setEventId] = useState();
  const handleEventId = (id) => {
    setEventId(id);
  };

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('search');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const isFirstLoad = useRef(true); // Ref to track the first load

  useEffect(() => {
    if (isFirstLoad.current) {
      // Set loading to true before fetching
      setLoading(true);

      const timer = setTimeout(() => {
        // Fetch all events from the API
        fetch('http://localhost:8888/api/event/get-all')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setEvents(data);
            console.log("Fetched events:", data); // Debugging line
          
            setEventId(data[0].eventId); // Set eventId to the first event's ID
     
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          })
          .finally(() => {
            setLoading(false); // Set loading to false after fetching
            isFirstLoad.current = false; // Mark as not the first load anymore
          });
      }, 500); // Delay for 2000 milliseconds (2 seconds)

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    } else {
      // No need to load data again
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Filter events based on the search query
    if (query) {
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [query, events]);

  return (
    <div className="bg-red-400 h-[50rem] flex ml-24 mt-14">
      <div className="bg-white h-full w-full flex justify-center pt-7">
        <EventPublic eventId={eventId} />
      </div>
      <div className="bg-white border-l-2 border-l-red-200 pr-32 w-[80%] grid grid-cols-1 justify-items-center overflow-scroll custom-scrollbar pt-10">
        {loading ? ( // Show skeletons while loading
          Array.from({ length: 5 }).map((_, index) => (
            <EventCard2Skeleton key={index} />
          ))
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <EventCard2
              key={index}
              event={event}
              handleEventId={handleEventId}
            />
          ))
        ) : (
          <div className="text-center w-full">No events found</div>
        )}
      </div>
    </div>
  );
};

export default EventDiscovery;

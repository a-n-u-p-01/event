import React, { useState, useEffect, useRef } from "react";
import EventCard2 from "../Event/EventCard2";
import EventPublic from "../Event/EventPublic";
import { useLocation, useNavigate } from 'react-router-dom';
import EventCard2Skeleton from "../Loading/EventCard2Skeleton";
import { APP_URL } from "../util";

const EventDiscovery = () => {
  const [eventId, setEventId] = useState();
  const handleEventId = (id) => {
    setEventId(id);
  };
  const [showFeedbacks,setShowFeedbacks] = useState(false)

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('search');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFirstLoad = useRef(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (isFirstLoad.current) {
      setLoading(true);
  
      const timer = setTimeout(() => {
        fetch(`${APP_URL}/event/get-all`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            const reversedEvents = data.reverse();
            setEvents(reversedEvents);
            console.log("Fetched events (reversed):", reversedEvents);
  
            if (reversedEvents.length > 0) {
              setEventId(reversedEvents[0].eventId);
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          })
          .finally(() => {
            setLoading(false);
            isFirstLoad.current = false;
          });
      }, 300);
  
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    if (query) {
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [query, events]);

  // Effect to update URL when eventId changes
  useEffect(() => {
    if (eventId) {
      navigate(`?id=${eventId}`, { replace: true });
    }
  }, [eventId, navigate]);

  return (
    <div className="bg-red-400 h-64 md:h-[50rem] flex ml-0 md:ml-24 mt-16">
      <div className="bg-white h-full w-full flex justify-center pt-7">
        <EventPublic eventId={eventId} setShowFeedbacks={setShowFeedbacks} showFeedbacks={showFeedbacks}/>
      </div>
      <div className="bg-white border-l-2 border-l-red-200 pr-32 w-[80%] grid grid-cols-1 justify-items-center overflow-scroll custom-scrollbar pt-10">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <EventCard2Skeleton key={index} />
          ))
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <EventCard2
              key={index}
              event={event}
              handleEventId={handleEventId}
              setShowFeedbacks={setShowFeedbacks}
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

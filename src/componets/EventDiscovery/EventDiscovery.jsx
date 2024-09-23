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
  const [showFeedbacks, setShowFeedbacks] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('search');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFirstLoad = useRef(true);
  const [hasFetched, setHasFetched] = useState(false); // New state to track data fetching
  const navigate = useNavigate();

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
            setHasFetched(true); // Set hasFetched to true after fetching data
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
      const searchWords = query.toLowerCase().split(/\s+/);
      const numberRegex = /^\d+$/;

      const filtered = events.filter(event => {
        let matchCount = 0;

        const titleMatch = searchWords.some(word => {
          if (event.title.toLowerCase().includes(word)) {
            matchCount++;
            return true;
          }
          return false;
        });

        const descriptionMatch = searchWords.some(word => {
          if (event.description.toLowerCase().includes(word)) {
            matchCount++;
            return true;
          }
          return false;
        });

        const isSingleNumber = searchWords.length === 1 && numberRegex.test(searchWords[0]);
        const matchesEventId = isSingleNumber && event.eventId.toString() === searchWords[0];

        return matchCount > 0 || matchesEventId;
      });

      filtered.sort((a, b) => {
        const aMatches = a.title.split(' ').filter(word => searchWords.includes(word)).length +
                         a.description.split(' ').filter(word => searchWords.includes(word)).length;
        const bMatches = b.title.split(' ').filter(word => searchWords.includes(word)).length +
                         b.description.split(' ').filter(word => searchWords.includes(word)).length;
        return bMatches - aMatches;
      });

      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [query, events]);

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

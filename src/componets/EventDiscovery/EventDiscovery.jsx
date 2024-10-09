import React, { useState, useEffect, useRef } from "react";
import EventCard2 from "../Event/EventCard2";
import EventPublic from "../Event/EventPublic";
import { useLocation, useNavigate } from 'react-router-dom';
import EventCard2Skeleton from "../Loading/EventCard2Skeleton";
import { APP_URL } from "../util";
import axios from "axios";


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


  useEffect(() => {
    if (isFirstLoad.current) {
      setLoading(true);

      const timer = setTimeout(() => {
        fetch(`${APP_URL}/event/get-all`)
          .then(response => {
            if (!response.ok) {
               return <div>'Network response was not ok'</div>;
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

  // useEffect(()=>{
  //     const fetchEvents = async () =>{
  //       setLoading(true)
  //         try{
  //           const response = await axios.get(`${APP_URL}/event/get-all`)
  //           const data = await response.data;
  //           setEvents(data.reverse())
          
  //         }
  //         catch(error){
  //           <div>Error while fetching events</div>
  //         }
  //         finally{
  //           setLoading(false)
  //         }
  //     }
  //     fetchEvents();
  //     if (events.length > 0) {
  //       setEventId(events[0].eventId);
  //    }
  //     console.log(eventId);
      
  // },[]);



  // Filter the query
useEffect(() => {
  if (query) {
    const searchWords = query.toLowerCase().trim().split(' ');
    const isSingleNumber = searchWords.length === 1 && !isNaN(searchWords[0]);
    
    const filtered = events.filter(event => {
      const titleMatch = searchWords.some(word => event.title.toLowerCase().includes(word));
      const descriptionMatch = searchWords.some(word => event.description.toLowerCase().includes(word));
      const categoryMatch = searchWords.some(word => event.category.toLowerCase().includes(word));
      const matchesEventId = isSingleNumber && event.eventId.toString() === searchWords[0];

      return titleMatch || descriptionMatch || categoryMatch || matchesEventId;
    });
    setFilteredEvents(filtered);
  } else {
    setFilteredEvents(events);
  }
}, [query, events]);

  
  return (
    <div className=" h-64 md:h-[50rem] flex ml-0 md:ml-24 mt-20">
      <div className=" h-full w-full flex justify-center">
        <EventPublic eventId={eventId} setShowFeedbacks={setShowFeedbacks} showFeedbacks={showFeedbacks}/>
      </div>
      <div className="bg-white border-l-2 p-2 border-l-red-200 pr-32 w-[80%]  grid grid-cols-1 justify-items-center overflow-scroll custom-scrollbar">
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

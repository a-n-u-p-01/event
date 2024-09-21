import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard2 from "../Event/EventCard2";
import EventHosting from "../Event/EventHosting";
import { APP_URL } from "../util";
import EventCard3 from "../Event/EventCard3";

function HostingEvent() {
  const [events, setEvents] = useState([]);
  const [hostEventId, setHostEventId] = useState();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${APP_URL}/event/get-events`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        });
        
        const fetchedEvents = response.data.events;

        // Reverse the fetched events and set state
        const reversedEvents = fetchedEvents.reverse();
        setEvents(reversedEvents);

        // Set hostEventId to the ID of the first event in the reversed order
        if (reversedEvents.length > 0) {
          setHostEventId(reversedEvents[0].eventId);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className=" flex justify-between w-full h-screen">
      <div className="overflow-scroll custom-scrollbar p-5 h-full pl-14">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard3
              key={event.eventId}
              event={event}
              setHostEventId={setHostEventId}
            />
          ))
        ) : (
          <div>No events found.</div>
        )}
      </div>
      <div className="flex justify-center pr-20 h-full pt-6 ">
        <EventHosting hostEventId={hostEventId} />
      </div>
    </div>
  );
}

export default HostingEvent;

import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard2 from "../Event/EventCard2";
import EventHosting from "../Event/EventHosting";
import { APP_URL } from "../util";
import EventCard3 from "../Event/EventCard3";
import Attendees from "../User/Attendees";

function HostingEvent() {
  const [events, setEvents] = useState([]);
  const [hostEventId, setHostEventId] = useState();
  const [showAttendees, setShowAttendees] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${APP_URL}/event/get-events`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        setTimeout(() => setLoading(false), 400);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className=" flex justify-between w-full h-screen">
      <div className="overflow-y-scroll overflow-x-hidden custom-scrollbar p-5 h-full pl-12">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard3
              key={event.eventId}
              event={event}
              setHostEventId={setHostEventId}
              setShowAttendees={setShowAttendees}
              loading={loading}
            />
          ))
        ) : (
          <p className="text-gray-500 transition-opacity duration-300 ease-in-out opacity-0">
          No Event found.
        </p>
        )}
      </div>
      <div className="flex justify-center pr-20 h-ful w-[60%]">
        {showAttendees ? (
          <Attendees
            setShowAttendees={setShowAttendees}
            hostEventId={hostEventId}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <EventHosting
            loading={loading}
            setLoading={setLoading}
            hostEventId={hostEventId}
            setShowAttendees={setShowAttendees}
          />
        )}
      </div>
    </div>
  );
}

export default HostingEvent;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import EventCard2 from "../Event/EventCard2";
import EventHosting from "../Event/EventHosting";
import { APP_URL } from "../util";
import EventCard3 from "../Event/EventCard3";
import Attendees from "../User/Attendees";
import { div } from "framer-motion/client";
import EventEdit from "../Event/EventEdit";

function HostingEvent() {
  const [events, setEvents] = useState([]);
  const [hostEventId, setHostEventId] = useState();
  const [showAttendees, setShowAttendees] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing,setIsEditing] = useState(false);

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

        const fetchedEvents =await response.data.events;
        const reversedEvents =await fetchedEvents.reverse();
        setEvents(reversedEvents);

        if (reversedEvents.length > 0) {
          setHostEventId(reversedEvents[0].eventId);
        }
        setTimeout(() => setLoading(false), 500);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  if(isEditing){
   return <EventEdit hostEventId={hostEventId} setIsEditing={setIsEditing} setHostEventId={setHostEventId}/>
  }

  return (
    <div className="flex justify-between w-full h-screen">
      <motion.div
        className="overflow-y-scroll overflow-x-hidden custom-scrollbar p-5 h-full pl-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {events.length > 0 ? (
          events.map((event) => (
            <motion.div
              key={event.eventId}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <EventCard3
                event={event}
                setHostEventId={setHostEventId}
                setShowAttendees={setShowAttendees}
                loading={loading}
                setIsEditing={setIsEditing}
              />
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-gray-500 transition-opacity duration-300 ease-in-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No Event found.
          </motion.p>
        )}
      </motion.div>
      <div className="flex justify-center pr-20 h-full w-[60%]">
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

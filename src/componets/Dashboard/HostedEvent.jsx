import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { APP_URL } from "../util";
import EventCard4 from "../Event/EventCard4";

function HostedEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${APP_URL}/event/get-events`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        const fetchedEvents = response.data.events;
        const filteredEvents = fetchedEvents.filter(event => event.status === false);
        const reversedEvents = filteredEvents.reverse();

        setEvents(reversedEvents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex justify-between w-full h-screen">
      <motion.div
        className="overflow-y-scroll overflow-x-hidden custom-scrollbar p-5 h-full pl-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : events.length > 0 ? (
          events.map((event) => (
            <motion.div
              key={event.eventId}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <EventCard4
                event={event}
                setEvents={setEvents} // Make sure this is correct
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
    </div>
  );
}

export default HostedEvent;

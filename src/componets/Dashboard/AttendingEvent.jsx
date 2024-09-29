import React, { useState, useEffect } from "react";
import EventAttending from "../Event/EventAttending";
import axios from "axios";
import { APP_URL } from "../util";
import { motion } from "framer-motion";

function AttendingEvent() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${APP_URL}/ticket/get-user-tickets`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        });

        setTickets(response.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (tickets.length === 0) {
    return <div className="text-center text-gray-500">You do not have any tickets.</div>;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-lg shadow-lg p-6 max-w-4xl w-full overflow-y-auto">
        {tickets.slice().reverse().map((ticket) => (
          <motion.div
            key={ticket.ticketId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <EventAttending ticket={ticket} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AttendingEvent;

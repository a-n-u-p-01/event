import React, { useState, useEffect } from "react";
import EventAttending from "../Event/EventAttending";
import axios from "axios";
import { APP_URL } from "../util";

function AttendingEvent() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${APP_URL}/ticket/get-user-tickets`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        });

        const fetchedTickets = response.data;
        setTickets(fetchedTickets);

      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="flex justify-center pr-52">
      <div className="overflow-scroll custom-scrollbar gap-3">
        {tickets.length > 0 ? (
          tickets.slice().reverse().map((ticket) => (
            <EventAttending
              key={ticket.ticketId} // Ensure this is unique
              ticket={ticket}
            />
          ))
        ) : (
          <div>No events found.</div>
        )}
      </div>
    </div>
  );
}

export default AttendingEvent;

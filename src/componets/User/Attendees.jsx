import React, { useState, useEffect } from 'react';
import Attendee from './Attendee';
import axios from 'axios';
import { APP_URL } from '../util';
import EventHostingSkeleton from '../Loading/EventHostingSkeleton';

function Attendees({ setShowAttendees, hostEventId, loading, setLoading }) {
    const [tickets, setTickets] = useState([]);
    const [showNoAttendeesMessage, setShowNoAttendeesMessage] = useState(false);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${APP_URL}/ticket/get-booked-tickets/${hostEventId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                    },
                });

                const fetchedTickets = response.data;
                setTickets(fetchedTickets);
                console.log("-------------------------------1");
                console.log(fetchedTickets); // Log fetched tickets directly
                console.log("-------------------------------2");

                // Show the no attendees message after a delay if no tickets were fetched
                if (fetchedTickets.length === 0) {
                    setTimeout(() => setShowNoAttendeesMessage(true), 400);
                } else {
                    setShowNoAttendeesMessage(false);
                }
                setTimeout(() => setLoading(false), 400);
            } catch (err) {
                console.error("Error fetching events:", err);
            }
            finally{
                setTimeout(() => setLoading(false), 400);
            }
        };

        fetchTickets();
    }, [hostEventId]);

    if (loading) {
        return <EventHostingSkeleton />;
    }

    return (
        <div className='m-8 mt-0 w-full p-5 rounded-2xl shadow-md overflow-y-scroll custom-scrollbar flex flex-col items-center gap-1'>
            <button onClick={() => setShowAttendees(false)} className='text-blue-600'>Go Back</button>
            {tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                    <Attendee 
                        key={index} 
                        attendee={ticket.attendee}
                        ticketType={ticket.ticketType}
                    />
                ))
            ) : (
                showNoAttendeesMessage && (
                    <p className="text-gray-500 transition-opacity duration-300 ease-in-out opacity-100">No attendees found.</p>
                )
            )}
            {!showNoAttendeesMessage && tickets.length === 0 && (
                <p className="text-gray-500 transition-opacity duration-300 ease-in-out opacity-0">No attendees found.</p>
            )}
        </div>
    );
}

export default Attendees;

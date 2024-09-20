import React, { useState, useEffect } from "react";
import EventCard from "../Event/EventCard";
import { useNavigate } from "react-router-dom";
import Category from "../Event/Category";

function Middle() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleGoEventDis = () => {
    navigate("/events");
  };

  useEffect(() => {
    // Fetch data from the API
    fetch(`http://localhost:8888/api/event/get-all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="w-full h-auto max-w-screen-xl mx-auto rounded-3xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 text-zinc-800 font-sans">
        <h2 className="font-semibold text-2xl">Upcoming Events</h2>
        <button
          onClick={handleGoEventDis}
          className="font-semibold text-lg mt-2 md:mt-0"
        >
          See all
        </button>
      </div>
      <div className="grid bg-white grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.slice(0, 4).map((event, index) => (
          <div key={index} className="min-w-[200px]">
            <EventCard event={event} />
          </div>
        ))}
      </div>
      <h2 className="font-semibold text-2xl pt-4">Categories</h2>
      <div className="grid grid-cols-7 bg-zinc-800/5 mt-2 gap-6 place-items-center p-4 rounded-xl ">
        <Category category="Conferences and Summits" />
        <Category category="Workshops and Classes" />
        <Category category="Festivals and Fairs" />
        <Category category="Networking Events" />
        <Category category="Webinars and Virtual Events" />
        <Category category="Charity and Fundraising Events" />
        <Category category="Trade Shows and Expos" />
      </div>
    </div>
  );
}

export default Middle;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { APP_URL } from "../util";
import Success from "../assets/Success";
import Update from "../assets/Updated";

const categories = [
  "TRAVEL",
  "SOCIAL",
  "HOBBIES",
  "SPORTS",
  "HEALTH",
  "TECHNOLOGY",
  "ART",
  "GAMEING",
  "MUSIC",
  "FOOD",
  "BUSINESS",
  "EDUCATION",
  "NETWORKING",
  "FASHION",
  "PHOTOGRAPHY",
  "FILM",
  "ENVIRONMENT"
];

function EventEdit({ handleSetOption, hostEventId, setIsEditing, setHostEventId }) {
  const [isCreated, setIsCreated] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    capacity: "",
    category: "",
    ticketPricing: {
      basicPrice: "",
      standardPrice: "",
      premiumPrice: "",
    },
  });
  const [loading, setLoading] = useState(true);

  // Fetch event data when the component mounts
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/event/get-event/${hostEventId}`);
        const data = response.data.event;

        setEvent({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          startTime: data.startTime || "",
          endTime: data.endTime || "",
          capacity: data.capacity || "",
          category: data.category || "",
          ticketPricing: data.ticketPricing || {
            basicPrice: "",
            standardPrice: "",
            premiumPrice: "",
          },
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [hostEventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleTicketChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      ticketPricing: {
        ...prevEvent.ticketPricing,
        [name]: value,
      },
    }));
  };

  const handleCreated = (e) => {
    setIsCreated(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      // Log the event data before sending
      console.log("Updated Event Data:", event);

      const response = await axios.put(
        `${APP_URL}/event/update/${hostEventId}`,
        event,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        }
      );
      handleCreated(true);
      
      setHostEventId(hostEventId)
      setTimeout(()=>{setIsEditing(false)},500)
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="h-[50%] w-[80%]">
      <form className="bg-white px-8 pt-2 pb-8 mb-4 text-gray-700 font-sans" onSubmit={handleSubmit}>
        <h2 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-red-500">Edit Event {hostEventId}</h2>

        {/* Form Fields */}
        <div className="mb-1">
            <label htmlFor="title" className="block text-gray-700 font-normal">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            className="font-light shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="mb-1">
        <label htmlFor="description" className="block text-gray-700 font-normal ">Description</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event description"
            required
          />
        </div>

        <div className="mb-1">
        <label htmlFor="location" className="block text-gray-700 font-normal">Location</label>
          <input
            id="location"
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event location"
            required
          />
        </div>

        <div className="mb-1">
        <label htmlFor="startTime" className="block text-gray-700 font-normal">Start Time</label>
          <input
            id="startTime"
            type="datetime-local"
            name="startTime"
            value={event.startTime}
            onChange={handleChange}
            className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-1">
        <label htmlFor="endTime" className="block text-gray-700 font-normal">End Time</label>
          <input
            id="endTime"
            type="datetime-local"
            name="endTime"
            value={event.endTime}
            onChange={handleChange}
            className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-1">
        <label htmlFor="capacity" className="block text-gray-700 font-normal">Capacity</label>
          <input
            id="capacity"
            type="number"
            name="capacity"
            value={event.capacity}
            onChange={handleChange}
            className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event capacity"
            required
          />
        </div>

        <div className="mb-1">
          <label htmlFor="category" className="block text-gray-700 font-normal">Select Category</label>
          <select
            id="category"
            name="category"
            value={event.category}
            onChange={handleChange}
            className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Ticket Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-normal" htmlFor="basicPrice">Basic Price</label>
              <input
                id="basicPrice"
                type="number"
                name="basicPrice"
                value={event.ticketPricing.basicPrice}
                onChange={handleTicketChange}
                className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter basic ticket price"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-normal" htmlFor="standardPrice">Standard Price</label>
              <input
                id="standardPrice"
                type="number"
                name="standardPrice"
                value={event.ticketPricing.standardPrice}
                onChange={handleTicketChange}
                className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter standard ticket price"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-normal" htmlFor="premiumPrice">Premium Price</label>
              <input
                id="premiumPrice"
                type="number"
                name="premiumPrice"
                value={event.ticketPricing.premiumPrice}
                onChange={handleTicketChange}
                className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter premium ticket price"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isCreating}
          >
            {isCreating ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
      {isCreated && <Update handleCreated={handleCreated} handleSetOption={handleSetOption} />}
    </div>
  );
}

export default EventEdit;

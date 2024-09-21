import React from "react";
import { useState } from "react";
import axios from "axios";
import { APP_URL } from "../util";
import { useNavigate } from "react-router-dom";
import Success from "../assets/Success";

function HostEvent({handleSetOption}) {
  const handleCreated = (e) => {
    setIsCreated(e);
  };



  const [isCreated,setIsCreated] = useState(false) 

  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    capacity: "",
    ticketPricing: {
      id: "",
      basicPrice: "",
      standardPrice: "",
      premiumPrice: "",
    },
  });

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

console.log(event);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if(event.title.length < 5 ){
        alert("Enter minimum 5 word for title.")
        return
      }

      if(event.description.length < 10 ){
        alert("Enter minimum 10 word for description.")
        return
      }
     
      const response = await axios.post(
        `${APP_URL}/event/create-event`,
        event,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEvent({
        title: "",
        description: "",
        location: "",
        startTime: "",
        endTime: "",
        capacity: "",
        ticketPricing: {
          id: "",
          basicPrice: "",
          standardPrice: "",
          premiumPrice: "",
        },
      });
      console.log("Event created successfully:", response.data);

      // console.log("_______________-------------------______1");
      // console.log(response)
      // console.log("_______________-------------------______1");
   
      handleCreated(true)
      
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };


  return (
    <div className="h-[50%] w-[80%]">
      <form className="bg-white  px-8 pt-6 pb-8 mb-4  text-gray-700 font-sans" onSubmit={handleSubmit}>
        <h2 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-red-500">Create Event</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-normal "
            htmlFor="title"
          >
          </label>
          <input
            id="title"
            type="text"
            name="title"
            onChange={handleChange}
            className="font-light shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-normal"
            htmlFor="description"
          >

          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event description"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-normal"
            htmlFor="location"
          >
          </label>
          <input
            id="location"
            type="text"
            name="location"
            onChange={handleChange}
            className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event location"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-normal"
            htmlFor="startTime"
          >
            Start Time
          </label>
          <input
            id="startTime"
            type="datetime-local"
            name="startTime"
            onChange={handleChange}
            className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-normal"
            htmlFor="endTime"
          >
            End Time
          </label>
          <input
            id="endTime"
            type="datetime-local"
            name="endTime"
            onChange={handleChange}
            className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-normal"
            htmlFor="capacity"
          >

          </label>
          <input
            id="capacity"
            type="number"
            name="capacity"
            onChange={handleChange}
            className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event capacity"
            required
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Ticket Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className="block text-gray-700 font-normal"
                htmlFor="basicPrice"
              >
                Basic Price
              </label>
              <input
                id="basicPrice"
                type="number"
                name="basicPrice"
                onChange={handleTicketChange}
                className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter basic ticket price"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-normal"
                htmlFor="standardPrice"
              >
                Standard Price
              </label>
              <input
                id="standardPrice"
                type="number"
                name="standardPrice"
                onChange={handleTicketChange}
                className="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter standard ticket price"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-normal"
                htmlFor="premiumPrice"
              >
                Premium Price
              </label>
              <input
                id="premiumPrice"
                type="number"
                name="premiumPrice"
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
          >
            Create Event
          </button>
        </div>
      </form>
    {isCreated && <Success handleCreated={handleCreated} handleSetOption={handleSetOption}/>}

    </div>
  );
}

export default HostEvent;

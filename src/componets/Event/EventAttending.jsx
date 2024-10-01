import React, { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import FeedBackForm from "../User/FeedBackForm";
import axios from "axios";
import { APP_URL } from "../util";

function EventAttending({ ticket }) {
  const [isCanceled, setIsCanceled] = useState(ticket.cancelStatus);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleCancel = async () => {
    try {
      await axios.get(`${APP_URL}/ticket/cancel/${ticket.ticketId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setIsCanceled(true);
    } catch (err) {
      console.error(err);
    } finally {
      setShowConfirmDialog(false); // Close dialog after action
    }
  };

  const handleCancelClick = () => {
    setShowConfirmDialog(true);
  };

  const handleCloseDialog = () => {
    setShowConfirmDialog(false);
  };

  if (!ticket) {
    return <div className="bg-gray-800/5 m-3 p-3 rounded-xl shadow-md">No tickets available.</div>;
  }

  const { event } = ticket;
  const {
    title: eventTitle,
    location: eventLocation,
    startTime,
    endTime,
    status,
    imageUrl,
  } = event;

  return (
    <div className="bg-gray-800/10 m-2 p-4 rounded-lg shadow-md flex flex-col">
      <img className="w-full h-32 rounded-lg object-cover" src={imageUrl} alt={eventTitle} />
      <h2 className="text-lg font-semibold mt-2">{eventTitle}</h2>
      <div className="flex justify-between mt-2 text-xs">
        <span className="flex items-center text-gray-700">
          <IoPersonSharp /> {event.organizer?.fullName || "Unknown Host"}
        </span>
        <span className="flex items-center text-gray-700">
          <IoLocation /> {eventLocation || "Unknown Location"}
        </span>
      </div>
      <div className="flex justify-between mt-1 text-xs">
        <span className="flex items-center text-gray-700">
          <CiCalendarDate /> {new Date(startTime).toLocaleString() || "No Start Time"}
        </span>
        <span className="flex items-center text-gray-700">
          <CiCalendarDate /> {new Date(endTime).toLocaleString() || "No End Time"}
        </span>
      </div>
      <div className="flex justify-between mt-1 text-xs">
        <span className={`p-1 font-mono ${status ? "text-green-500" : "text-red-500"}`}>
          Status: {status ? "Active" : "Ended"}
        </span>
        <button
          className={`text-sm ${isCanceled ? "text-gray-400" : "text-red-600"} font-semibold`}
          onClick={isCanceled ? null : handleCancelClick}
        >
          {isCanceled ? "Canceled" : "Cancel Ticket"}
        </button>
      </div>
      <FeedBackForm disabled={status} eventId={event.eventId} />

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Confirm Cancellation</h3>
            <p>Are you sure you want to cancel this ticket?</p>
            <div className="mt-4 flex justify-end">
              <button className="mr-2 text-gray-500" onClick={handleCloseDialog}>
                Cancel
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleCancel}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventAttending;

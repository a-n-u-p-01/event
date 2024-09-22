import React, { useState } from "react";
import axios from "axios";
import { APP_URL } from "../util"; // Adjust the import path as needed

function FeedBackForm({ disabled, eventId }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("normal"); // "normal", "submitting", "submitted"

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!message.trim()) {
      alert("Please enter your message.");
      return;
    }

    setStatus("submitting"); // Show submitting status

    try {
      await axios.post(`${APP_URL}/feedback/submit/${eventId}`, 
        { message }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(""); // Clear the input field after submission
      

      // Delay before hiding the form
      setTimeout(() => {
        setStatus("hidden"); // Change to hidden state
      }, 1000); // 3 seconds delay
      
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("There was an error submitting your feedback. Please try again.");
      setStatus("normal"); // Reset status in case of error
    }
  };

  return (
    <div className="p-4 mx-auto max-w-x font-[sans-serif]">
      {status === "submitting" && <p>Submitting...</p>}

      {status === "normal" && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full rounded-md py-2 p-1 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-none border border-gray-300 focus:border-blue-500 ${disabled ? "bg-gray-300 cursor-not-allowed" : ""}`}
            disabled={disabled}
          />

          <button
            type="submit"
            className={`text-white bg-blue-500 h-7 mt-1 hover:bg-blue-600 tracking-wide rounded-md text-sm w-full ${disabled ? "bg-gray-500 cursor-not-allowed" : ""}`}
            disabled={disabled}
          >
            Send
          </button>
        </form>
      )}
      {status === "hidden" && <p className="text-green-600">feedback submitted successfully!</p>}
    </div>
  );
}

export default FeedBackForm;

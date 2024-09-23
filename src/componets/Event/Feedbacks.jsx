import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { APP_URL } from '../util';
import { FaUserCircle } from 'react-icons/fa'; // Importing a user icon

function Feedback({ setShowFeedbacks, eventId }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`${APP_URL}/feedback/feed/${eventId}`);
        const data = await response.json();

        if (data.responseStatus === 200) {
          setFeedbackList(data.feedbackDTOList.reverse());
        } else {
          setError(data.responseMessage);
        }
      } catch (err) {
        setError('Failed to fetch feedbacks.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [eventId]);

  if (loading) {
    return <div className="text-center text-lg h-full jf font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-lg">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 w-[70%] min-h-screen">
      <button 
        onClick={() => setShowFeedbacks(false)} 
        className="mb-6 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go Back
      </button>
      <h2 className="text-xl font-bold text-gray-800 mb-5">Feedback for Event {eventId}</h2>
      <div className="max-h-64 custom-scrollbar overflow-y-auto border border-gray-300 rounded-lg shadow-lg p-4 bg-white w-full">
        {feedbackList.length > 0 ? (
          feedbackList.map((feedback) => (
            <motion.div
              key={feedback.id || feedback.createdAt}
              className="mb-3 p-2 border rounded-md bg-gray-50 shadow-sm transition-transform transform hover:scale-105"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaUserCircle className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="font-semibold text-sm">{feedback.userId}</span>
                </div>
                <span className="text-xs text-gray-500">{new Date(feedback.createdAt).toLocaleString()}</span>
              </div>
              <p className="mt-1 text-gray-700 text-sm">{feedback.message || 'No message provided'}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600">No feedback available for this event.</p>
        )}
      </div>
    </div>
  );
}

export default Feedback;

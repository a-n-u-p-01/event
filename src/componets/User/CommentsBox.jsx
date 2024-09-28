import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { APP_URL } from '../util';


function CommentsBox({ eventId }) {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${APP_URL}/comment/${eventId}`);
        setCommentsList(response.data);

      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
    const intervalId = setInterval(fetchComments, 100000);
    return () => clearInterval(intervalId); // Cleanup on unmount to ensure that it does not fetch while not rendered the comment
  }, [eventId]);




const handleCommentChanges = (e)=>{
  setComment(e.target.value)
}

const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('You must be logged in to add a comment.');
      setTimeout(() => setErrorMessage(''), 1500);
      return;
    }

    if (comment.trim()) {
      const newComment = {
        comment,
        userName: localStorage.getItem('userName') || 'Unknown',
        eventId,
        createdAt: new Date().toISOString(),
      };

      try {
        await axios.post(`${APP_URL}/comment`, newComment, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCommentsList((prevComments) => [newComment, ...prevComments]);
        setComment('');
      } catch (error) {
        console.error('Error posting comment:', error);
        setErrorMessage('Failed to post comment.');
        setTimeout(() => setErrorMessage(''), 1500);
      }
    }
  };


  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(); // Format date
  };

  return (
    <div className='w-full p-4 rounded-lg'>
      <form onSubmit={handleCommentSubmit} className='flex flex-col'>
        <input
          type='text'
          value={comment}
          onChange={handleCommentChanges}
          placeholder='Write a comment...'
          className='mb-2 p-1 font-normal focus:outline-none rounded text-sm'
        />
        <button
          type='submit'
          className='self-start bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition'
        >
          Add
        </button>
        {errorMessage && (
          <p className='text-red-500 text-sm mt-2'>{errorMessage}</p>
        )}
      </form>
      <div className='mt-4'>
        {commentsList
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((c, index) => (
            <div key={index} className='bg-white font-normal p-2 my-1 rounded-lg flex items-start'>
              <FaUserCircle className='text-gray-500 mr-1' size={24} />
              <div className='flex flex-col w-full'>
                <div className='flex justify-between text-sm'>
                  <div className='font-medium text-xs'>{c.userName}</div>
                  <div className='text-gray-500 text-xs'>{new Date(c.createdAt).toLocaleTimeString()} | {formatDate(c.createdAt)}</div>
                </div>
                <div className='mt-1 text-gray-700 text-sm'>{c.comment}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommentsBox;

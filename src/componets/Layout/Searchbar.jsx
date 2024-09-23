import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true); // Set loading state to true

    // Simulate a delay (optional, for demonstration purposes)
    setTimeout(() => {
      if (query) {
        // Navigate to the /events page with the query parameter
        navigate(`/events?search=${encodeURIComponent(query)}`);
      } else {
        navigate(`/events`);
      }
      setIsLoading(false); // Reset loading state
    }, 1000); // Adjust the delay as needed
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center max-w-sm mx-auto"
    >
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <rect
              x="2"
              y="4"
              width="20"
              height="18"
              rx="3"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="2"
              y1="8"
              x2="22"
              y2="8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="12" cy="16" r="2" fill="currentColor" />
            <line
              x1="12"
              y1="14"
              x2="12"
              y2="18"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="10"
              y1="16"
              x2="14"
              y2="16"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[20rem] h-9 border-red-700 text-gray-900 font-normal rounded-3xl border-none block ps-10 p-2.5 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-600"
          placeholder="Search Events"
        />
      </div>
      <button
        type="submit"
        className="p-2.5 ms-2 text-sm font-medium text-white bg-red-600 rounded-3xl border-none hover:bg-red-700 focus:outline-none"
      >
        {isLoading ? (
          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        )}
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}

export default Searchbar;

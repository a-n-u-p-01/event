import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import { useNavigate } from "react-router-dom";
import { Profile } from "./Profile";
import { LoginButton } from "./LoginButton";


function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const authenticated = localStorage.getItem("token") // Call the isAuthenticat function
      setAuthenticated(authenticated); // Update the state based on the return value
    };

    checkAuthentication(); // Run the function to check authentication
  }, []); 

  return (
    <nav className="w-full z-10 h-20  text-black flex justify-between pt-4 pl-5 pr-5 fixed">
      <div className="flex gap-5">
        <button
          onClick={handleGoHome}
          className="flex items-center justify-center gap-3 p-[13px] text-black font-bold text-2xl"
        >
          Event
        </button>
        <Searchbar />
      </div>
      
      <div className="flex justify-around gap-3 p-3 pl-10">
        {isAuthenticated ? <Profile /> : <LoginButton />}
      </div>
    </nav>
  );
}

export default Navbar;

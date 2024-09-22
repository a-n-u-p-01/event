import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import HostEvent from "./HostEvent";
import HostingEvent from "./HostingEvent";
import AttendingEvent from "./AttendingEvent";
import SavedEvent from "./SavedEvent";
import PastEvent from "./PastEvent";
import ProfileDetails from "./ProfileDetails";

const Dashboard = () => {
  const [option, setOption] = useState("profile");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to get query parameter value
    const getQueryParam = (param) => {
      const params = new URLSearchParams(location.search);
      return params.get(param);
    };

    const p = getQueryParam('p');

    // Set option based on p value
    if (p) {
      switch (p) {
        case '1':
          setOption('profile');
          break;
        case '2':
          setOption('hosting');
          break;
        case '3':
          setOption('booked');
          break;
        case '4':
          setOption('hostEvent');
          break;
        default:
          setOption('profile'); // Default to profile if no match
      }
    }
  }, [location.search]);

  const handleSetOption = (selectedOption) => {
    setOption(selectedOption);

    // Update the URL with the selected option
    let paramValue;
    switch (selectedOption) {
      case 'profile':
        paramValue = '1';
        break;
      case 'hosting':
        paramValue = '2';
        break;
      case 'booked':
        paramValue = '3';
        break;
      case 'hostEvent':
        paramValue = '4';
        break;
      default:
        paramValue = '1'; // Default to profile
    }

    // Update the URL with the new query parameter
    navigate(`?p=${paramValue}`);
  };

  return (
    <div className="h-[50rem] flex ml-24 mt-20">
      <div className="h-full w-[25%]">
        <Menu currentOption={option} handleSetOption={handleSetOption} />
      </div>

      <div className="border-l-2 border-l-red-200 h-full w-full flex justify-center pt-7">
        {option === 'profile' && <ProfileDetails />}
        {option === 'hosting' && <HostingEvent />}
        {option === 'booked' && <AttendingEvent />}
        {option === 'hostEvent' && <HostEvent handleSetOption={handleSetOption} />}
      </div>
    </div>
  );
};

export default Dashboard;

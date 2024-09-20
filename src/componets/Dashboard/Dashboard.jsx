import React, { useState } from "react";
import Menu from "./Menu";
import HostEvent from "./HostEvent";
import HostingEvent from "./HostingEvent";
import AttendingEvent from "./AttendingEvent";
import SavedEvent from "./SavedEvent";
import PastEvent from "./PastEvent";
import Success from "../assets/Success";
import ProfileDetails from "./ProfileDetails";

const Dashboard = () => {
  const [option, setOption] = useState("profile");

  const handleSetOption = (selectedOption) => {
    setOption(selectedOption);
  };

  return (
    <div className="bg-red-400  h-[50rem] flex ml-24 mt-20">
      <div className="bg-yellow-300 h-full w-[25%]">
        <Menu currentOption={option} handleSetOption={handleSetOption} />
      </div>

      <div className="bg-blue-400 border-l-2 border-l-red-200 h-full w-full flex justify-center pt-7 ">
      {option === 'profile' && <ProfileDetails />}
        {option === 'hosting' && <HostingEvent />}
        {option === 'attending' && <AttendingEvent />}
        {option === 'saved' && <SavedEvent />}
        {option === 'pastEvents' && <PastEvent />}
        {option === 'hostEvent' && <HostEvent handleSetOption={handleSetOption}/>}
      </div>
    </div>
  );
};

export default Dashboard;

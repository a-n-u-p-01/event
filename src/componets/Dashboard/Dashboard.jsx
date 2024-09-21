import React, { useState } from "react";
import Menu from "./Menu";
import HostEvent from "./HostEvent";
import HostingEvent from "./HostingEvent";
import AttendingEvent from "./AttendingEvent";
import SavedEvent from "./SavedEvent";
import PastEvent from "./PastEvent";
import ProfileDetails from "./ProfileDetails";

const Dashboard = () => {
  const [option, setOption] = useState("profile");

  const handleSetOption = (selectedOption) => {
    setOption(selectedOption);
  };

  return (
    <div className="  h-[50rem] flex ml-24 mt-20">
      <div className=" h-full w-[25%]">
        <Menu currentOption={option} handleSetOption={handleSetOption} />
      </div>

      <div className=" border-l-2 border-l-red-200 h-full w-full flex justify-center pt-7 ">
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

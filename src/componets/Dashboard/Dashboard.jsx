import React, { useState } from "react";
import Menu from "./Menu";
import HostEvent from "./HostEvent";
import HostingEvent from "./HostingEvent";
import AttendingEvent from "./AttendingEvent";
import SavedEvent from "./SavedEvent";
import PastEvent from "./PastEvent";
import Success from "../assets/Success";

const Dashboard = () => {
  const [option, setOption] = useState("hosting");

  const handleSetOption = (selectedOption) => {
    setOption(selectedOption);
  };

  return (
    <div className="bg-red-400 max-w-screen-xl h-[50rem] flex ml-24 mr-24 mt-20">
      <div className="bg-white h-full w-[25%]">
        <Menu currentOption={option} handleSetOption={handleSetOption} />
      </div>

      <div className="bg-white border-l-2 border-l-red-200 h-full w-[75%] flex justify-center pt-7 ">
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

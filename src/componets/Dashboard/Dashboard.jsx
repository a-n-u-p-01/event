import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import HostEvent from "./HostEvent";
import HostingEvent from "./HostingEvent";
import AttendingEvent from "./AttendingEvent";
import ProfileDetails from "./ProfileDetails";
import HostedEvent from "./HostedEvent";

const optionMapping = {
  profile: "1",
  hosting: "2",
  booked: "3",
  hostEvent: "4",
  hosted: "5"
};

const Dashboard = () => {
  const [option, setOption] = useState("profile");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const p = params.get("p");
    const selectedOption = Object.keys(optionMapping).find(key => optionMapping[key] === p) || "profile";
    setOption(selectedOption);
  }, [location.search]);

  const handleSetOption = (selectedOption) => {
    setOption(selectedOption);
    navigate(`?p=${optionMapping[selectedOption]}`);
  };

  const renderComponent = () => {
    switch (option) {
      case "profile":
        return <ProfileDetails />;
      case "hosting":
        return <HostingEvent />;
      case "booked":
        return <AttendingEvent />;
      case "hostEvent":
        return <HostEvent handleSetOption={handleSetOption} />;
      case "hosted":
        return <HostedEvent />;
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <div className="h-[50rem] flex ml-24 mt-20">
      <div className="h-full w-[25%]">
        <Menu currentOption={option} handleSetOption={handleSetOption} />
      </div>
      <div className="border-l-2 border-l-red-200 h-full w-full flex justify-center pt-7">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;

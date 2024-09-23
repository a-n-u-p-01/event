import React from "react";
import EventCard2 from "../Event/EventCard2";
import EventHosting from "../Event/EventHosting";
import UserData from "../User/UserData";

function ProfileDetails() {
  return (
    <div className="w-[80%] h-fit custom-scrollbar flex gap-4">
        <UserData/>
    </div>
  );
}

export default ProfileDetails;

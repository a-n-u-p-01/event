import React from "react";

function UserData() {






  
  return (
    <div className="m-3 w-3/4 max-w-md p-3 rounded-lg shadow-md bg-gray-100">
      <div className="w-full p-3 rounded-lg shadow-sm mb-3">
        <h1 className="text-zinc-800 text-lg font-bold mb-2">User Details</h1>
        <div className="bg-gray-500 p-2 rounded-lg">
          <p className="text-white text-sm mb-1">
            <strong>Name:</strong> <span>Your Name</span>
          </p>
          <p className="text-white text-sm mb-1">
            <strong>Email:</strong> <span>Your Email</span>
          </p>
          <p className="text-white text-sm mb-1">
            <strong>Password:</strong> <span>Your Password</span>
          </p>
          <p className="text-white text-sm mb-1">
            <strong>Joined Date:</strong> <span>Your Joined Date</span>
          </p>
        </div>
      </div>

      <div className=" w-full p-3 rounded-lg shadow-sm flex justify-between items-center">
        <div className="bg-gray-400 p-2 rounded-lg shadow-sm text-center">
          <div className="text-white text-sm font-semibold">Events Attended</div>
          <div className="text-white text-xl font-bold">5</div>
        </div>
        <div className="bg-gray-400 p-2 rounded-lg shadow-sm text-center">
          <div className="text-white text-sm font-semibold">Events Hosted</div>
          <div className="text-white text-xl font-bold">3</div>
        </div>
      </div>
    </div>
  );
}

export default UserData;

import React, { useEffect, useState } from "react";
import { APP_URL } from "../util";

function UserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${APP_URL}/user/get-user-data`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!userData) return null;

  const { userDTO, eventHosted, eventBooked } = userData;
  const joinedDate = new Date(userDTO.createdAt).toLocaleDateString();

  return (
    <div className="w-3/4 max-w-md rounded-lg shadow-md bg-gray-100">
      <div className="w-full rounded-lg shadow-sm ">
        <h1 className="text-zinc-800 border-b-2 font-normal pl-4 p-1 ">User Details</h1>
        <div className=" p-1 pl-4 border-b-2 rounded-lg">
          <p className="text-gray-900 font-normal text-sm mb-1">
            <strong>Name:</strong> <span>{userDTO.fullName}</span>
          </p>
          <p className="text-gray-900 font-normal text-sm mb-1">
            <strong>Email:</strong> <span>{userDTO.email}</span>
          </p>
          <p className="text-gray-900 font-normal text-sm mb-1">
            <strong>Joined Date:</strong> <span>{joinedDate}</span>
          </p>
        </div>
      </div>

      <div className="w-full p-3 rounded-lg shadow-sm flex justify-between items-center">
        <div className="bg-gray-400 p-2 rounded-lg shadow-sm text-center">
          <div className="text-white text-sm font-semibold">Events Attended</div>
          <div className="text-xl font-bold">{eventBooked}</div>
        </div>
        <div className="bg-gray-400 p-2 rounded-lg shadow-sm text-center">
          <div className="text-white text-sm font-semibold">Events Hosted</div>
          <div className="text-xl font-bold">{eventHosted}</div>
        </div>
      </div>
    </div>
  );
}

export default UserData;

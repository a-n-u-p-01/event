import React, { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { APP_URL } from "../util";
import { FaComments } from "react-icons/fa";
import { div } from "framer-motion/m";
import { useNavigate } from "react-router-dom";

function ChatGroup() {
  const navigate = useNavigate()
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [userName, setUserName] = useState("");
  const [joined, setJoined] = useState(false);

  const params = new URLSearchParams(location.search);
  const eventId = params.get('eventId')



  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name);
  }, []);

  const connect = (name) => {
    const socket = new SockJS(`${APP_URL}/ws`);
    const client = Stomp.over(socket);
    setStompClient(client);

    client.connect({}, () => onConnected(name, client), onError);
  };

  const onError = () => {
    console.error(
      "Could not connect to the WebSocket. Please refresh and try again."
    );
  };

  const onConnected = (name, client) => {
    client.subscribe(`/topic/public/${eventId}`, onMessageReceived);
    client.subscribe(`/topic/users/${eventId}`, onUsersReceived);
    setJoined(true);

    const joinMessage = {
      sender: name,
      type: "JOIN",
      content: `${name} has joined the chat`,
    };
    client.send(`/app/chat.addUser/${eventId}`, {}, JSON.stringify(joinMessage));
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const onUsersReceived = (payload) => {
    const users = JSON.parse(payload.body).activeUsers;
    setActiveUsers(users);
  };

  const sendMessage = () => {
    if (messageContent && stompClient) {
      const chatMessage = {
        sender: userName,
        content: messageContent,
        type: "MESSAGE",
      };
      stompClient.send(
        `/app/chat.sendMessage/${eventId}`,
        {},
        JSON.stringify(chatMessage)
      );
      setMessageContent("");
    }
  };

  const fetchPastMessages = async () => {
    const response = await axios(`${APP_URL}/chat/get-messages/${eventId}`);
    const data = response.data; 
    console.log(data)
    setMessages(data);
    console.log(messages)
  };

  const joinGroup = () => {
    if (userName) {
      connect(userName);
      fetchPastMessages();
    }
  };

  const leaveGroup = () => {
    if (stompClient) {
      const leaveMessage = {
        sender: userName,
        type: "LEAVE",
        content: `${userName} has left the chat`,
      };
      stompClient.send(
        `/app/chat.removeUser/${eventId}`,
        {},
        JSON.stringify(leaveMessage)
      );
      stompClient.disconnect();
      setStompClient(null);
      setMessages((prevMessages) => [...prevMessages, leaveMessage]);
      setJoined(false);
      setActiveUsers([]);
      setMessages([]);
    }
  };

  useEffect(() => {
    return () => {
      if (joined) {
        leaveGroup();
      }
    };
  }, [joined]);

  return (
  
    <div className="flex pt-20 w-full h-screen bg-gray-100">
      <div className="h-full w-[20%] p-4 bg-white shadow-md rounded-lg">
        {!joined ? (
          <div className="flex justify-between">
          <button
            onClick={joinGroup}
            className="mt-1 bg-green-600 font-normal text-sm text-white p-2 rounded hover:bg-green-700 transition"
          >
            Join Chat
          </button>
           <button
           onClick={()=>{navigate("/events")}}
           className="mt-1 bg-gray-600 font-normal text-sm text-white p-2 rounded  transition"
         >
           Go Back
         </button>
         </div>
        ) : (
          <button
            onClick={leaveGroup}
            className="mt-1 bg-red-600 font-normal text-white text-sm p-2 rounded hover:bg-red-700 transition"
          >
            Leave Chat {eventId}
          </button>
        )}
        <div className="mt-4">
          {activeUsers.map((user, index) => (
         <div
         key={index}
         className="flex items-center text-sm bg-gray-200 rounded-lg p-1 mb-1 shadow-sm transition-transform hover:scale-105"
       >
         <span className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-600 text-white font-bold text-base">
           {user.charAt(0)}
         </span>
         <span className="ml-2 font-medium text-gray-800">{user}</span>
       </div>
       
          
          ))}
        </div>
      </div>
      <div className="ml-8 mr-8 rounded-3xl h-full w-[80%] bg-white shadow-md">
        {joined ? (
          <ChatBox
            messages={messages}
            setSendMessage={sendMessage}
            userName={userName}
            messageContent={messageContent}
            setMessageContent={setMessageContent}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-600 p-8 pb-44">
            <FaComments className="text-6xl mb-6 text-gray-400 animate-bounce" />
            <h2 className="text-xl font-semibold">Welcome to the Chat Room for event {eventId}</h2>
            <p className="mt-2 text-center">
              Join the conversation and connect with others! Click on left side button
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatGroup;

import React, { useEffect, useState, useRef } from "react";
import "./MeetingRoom.css";
import Sidebar from "../components/Sidebar";
import ChatRooms from "../components/ChatRooms";
import ChatRoom from "../components/ChatRoom";
import { useAuth } from "../../../contexts/AuthContext";

export default function MeetingRoom() {
  const { currentUser, getUser, logout } = useAuth();

  return (
    <div className="Dashboard">
      <Sidebar />
      <ChatRooms />

      <div className="chat-area">
        <h1 className="d-flex align-items-center justify-content-center mt-3">
          Main Chat
        </h1>
        <hr className="me-3" />
        <ChatRoom />
      </div>
    </div>
  );
}

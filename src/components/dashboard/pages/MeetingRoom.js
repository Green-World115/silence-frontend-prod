import React, { useEffect, useState } from "react";
import "./MeetingRoom.css";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { ChatRoomsData } from "../components/ChatRoomsData";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../../../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function MeetingRoom() {
  function ChatRooms() {
    const [sidebar, setSidebar] = useState(true);

    function AddChatRoom() {}

    return (
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className={sidebar ? "chat-room active" : "chat-room"}>
          <ul className="chat-room-items">
            <li className="chat-header">Chat Rooms</li>
            <hr className="hr" />
            {ChatRoomsData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <div className="d-flex flex-row align-items-center">
              <Button className="w-75 ms-2 mt-3" onClick={AddChatRoom}>
                Create a Room
                <FaIcons.FaPlus className="ms-2" />
              </Button>
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    );
  }

  return (
    <div className="Dashboard">
      <Sidebar />
      <ChatRooms />
      <div className="chat-area">MeetingRoom</div>
    </div>
  );
}

import React, { useState } from "react";
import "../pages/MeetingRoom.css";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { ChatRoomsData } from "../components/ChatRoomsData";
import { Button } from "react-bootstrap";

export default function ChatRooms() {
  function AddChatRoom() {}

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <nav className="chat-room active">
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

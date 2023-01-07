import React from "react";
import "../components/Sidebar.css";
import Sidebar from "../components/Sidebar";

export default function MeetingRoom() {
  return (
    <div className="Dashboard">
      <Sidebar />
      <div>MeetingRoom</div>
    </div>
  );
}

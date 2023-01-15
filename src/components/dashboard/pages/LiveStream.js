import React from "react";
import "../components/Sidebar.css";
import Sidebar from "../components/Sidebar";

export default function LiveStream() {
  return (
    <div className="Dashboard">
      <Sidebar />
      <div>LiveStream</div>
    </div>
  );
}

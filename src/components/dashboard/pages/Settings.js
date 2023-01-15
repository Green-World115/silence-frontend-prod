import React from "react";
import "../components/Sidebar.css";
import Sidebar from "../components/Sidebar";

export default function Settings() {
  return (
    <div className="Dashboard">
      <Sidebar />
      <div>Settings</div>
    </div>
  );
}

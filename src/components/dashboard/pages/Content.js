import React from "react";
import "../components/Sidebar.css";
import Sidebar from "../components/Sidebar";

export default function Content() {
  return (
    <div className="Dashboard">
      <Sidebar />
      <div>Content</div>
    </div>
  );
}

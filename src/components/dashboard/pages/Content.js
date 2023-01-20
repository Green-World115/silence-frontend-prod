import React from "react";
import "../components/Sidebar.css";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";

export default function Content() {
  return (
    <div className="Dashboard">
      <Sidebar />
      <NavBar title={"Content"} />

      <div>Content</div>
    </div>
  );
}

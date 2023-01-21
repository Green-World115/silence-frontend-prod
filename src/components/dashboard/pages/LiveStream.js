import React from "react";
import "../components/Sidebar.css";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";

export default function LiveStream() {
  return (
    <div className="Dashboard">
      <Sidebar />
      <NavBar title={"Livestream"} />

      <div>LiveStream</div>
    </div>
  );
}

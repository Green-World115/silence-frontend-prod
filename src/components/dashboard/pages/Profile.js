import React from "react";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import { Container } from "react-bootstrap";

export default function Profile() {
  return (
    <div>
      <Sidebar />
      <div className="Dashboard">Profile</div>
    </div>
  );
}

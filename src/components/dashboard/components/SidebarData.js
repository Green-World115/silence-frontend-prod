import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    icon: <FaIcons.FaHome />,
    path: "/",
    cName: "nav-text",
  },
  {
    title: "Meeting Room",
    icon: <FaIcons.FaRegCommentDots />,
    path: "/meeting-room",
    cName: "nav-text",
  },
  {
    title: "Content",
    icon: <FaIcons.FaFileImage />,
    path: "/content",
    cName: "nav-text",
  },
  {
    title: "Live Streams",
    icon: <FaIcons.FaVideo />,
    path: "/live-streams",
    cName: "nav-text",
  },
  {
    title: "Profile",
    icon: <FaIcons.FaUser />,
    path: "/profile",
    cName: "nav-text",
  },
  {
    title: "Settings",
    icon: <FaIcons.FaSlidersH />,
    path: "/settings",
    cName: "nav-text",
  },
];

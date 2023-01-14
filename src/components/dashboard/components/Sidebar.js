import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import { useAuth } from "../../../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Button, Image } from "react-bootstrap";

function Sidebar() {
  const [sidebar, setSidebar] = useState(true);
  const { currentUser, getUser, logout } = useAuth();
  const [username, setUsername] = useState();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    setUsername(docSnap.data().firstName);
    setAvatar(docSnap.data().avatar);
  }
  function LogOut() {
    logout();
  }
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="userInfo">
              {avatar !== undefined ? (
                <img
                  src={avatar}
                  alt="..."
                  class="img-thumbnail"
                  style={{ height: 100, width: 100 }}
                />
              ) : (
                <FaIcons.FaUser style={{ height: 100, width: 100 }} />
              )}
            </li>
            <li className="userInfo">
              Logged in as:
              <strong>{username !== undefined ? username : "  "}</strong>
            </li>
            <li className="userInfo">
              <strong>{currentUser.email}</strong>
            </li>
            <hr className="hr" />
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <Button className="w-75 ms-2 mt-3" onClick={LogOut}>
              Log Out
            </Button>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;

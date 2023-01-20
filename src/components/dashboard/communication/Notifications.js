import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";

import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import Filter from "../components/Filter";
import NotificationRow from "./NotificationRow";

export default function Notifications() {
  const {
    currentUser,
    addNotification,
    getNotificationByUser,
    updateNotifications,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({});

  const [user, setUser] = useState();
  const [username, setUsername] = useState();
  const [location, setLocation] = useState();

  const [avatar, setAvatar] = useState();

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const docSnap = await getDoc(doc(db, "users", currentUser.uid));
        setUsername(docSnap.data().firstName);
        setLocation(docSnap.data().location);
        setAvatar(docSnap.data().avatar);

        //   const userNotifications = await getDoc(
        //     doc(db, "notifications", currentUser.uid)
        //   );
        //   setNotifications(userNotifications.data().notifications);
      } catch (error) {}

      setLoading(false);
    };
    get();
  }, []);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const response = await getNotificationByUser(currentUser.uid);
        setNotifications(response.data().notifications);
      } catch (error) {}

      setLoading(false);
    };

    get();
  }, []);

  //------------------------------Update Notifications For User-------------------------------------//
  async function handleSubmit(e) {
    const docData = {
      Timestamp: serverTimestamp(),
      Text: "This is a random entry",
      Avatar: avatar,
      Type: "Group",
    };

    const docsData = [
      {
        Timestamp: "11:59",
        Text: "This is a random entry",
        Avatar: "html....",
        Type: "Group",
      },
    ];
    console.log(docData);
    e.preventDefault();
    try {
      await updateNotifications(currentUser.uid, docsData);
    } catch {
      console.log("Failed to add notification.");
    }
  }

  return (
    <div className="Dashboard">
      <Sidebar />
      <NavBar title={"Notifications"} />
      <div class="d-flex flex-row justify-content-between mb-1">
        <div class="p-2 bd-highlight w-75 mx-2 ">
          <div class="d-flex flex-row justify-content-between mb-3">
            <p
              className="text-center p-3 mb-2 bg-light text-dark rounded"
              style={{ width: "100px" }}
            >
              Today
            </p>
            <Button className="" type="button" onClick={handleSubmit}>
              Add Notification
            </Button>
          </div>
          <NotificationRow initialValues={notifications} />
        </div>
        <Filter />
      </div>
    </div>
  );
}

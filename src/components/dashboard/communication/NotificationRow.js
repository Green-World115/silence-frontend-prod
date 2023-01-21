import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Card, Button } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";

export default function NotificationRow() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({});
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
      } catch (error) {}

      setLoading(false);
    };
    get();
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          {avatar !== undefined ? (
            <img
              src={avatar}
              alt="..."
              class="rounded-circle"
              style={{ height: 50, width: 50 }}
            />
          ) : (
            <FaIcons.FaUser style={{ height: 100, width: 100 }} />
          )}
        </Card.Body>
      </Card>
    </>
  );
}

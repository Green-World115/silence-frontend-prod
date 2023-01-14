import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Card, Button } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";
import { getSymptomByUser } from "../../../api/symptoms";
import SymptomForm from "../../authentication/account_creation/components/SymptomForm";

export default function Profile() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [symptoms, setSymptoms] = useState({});
  const [username, setUsername] = useState();
  const [location, setLocation] = useState();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const response = await getSymptomByUser(currentUser.uid);
        setSymptoms(response.data().symptoms);
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
    <div>
      <Sidebar />
      <div className="Dashboard">
        <div className="d-flex">
          <div>
            <ul className="profileUserInfo">
              <li className="profileUserThumb">
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
              <li className="mt-3">
                Name:
                <br />
                <strong>{username !== undefined ? username : "  "}</strong>
              </li>
              <li className="mt-3">
                Email: <br />
                <strong>{currentUser.email}</strong>
              </li>
              <li className="mt-3">
                Location:
                <br /> <strong>{location}</strong>
              </li>
              <Button className="w-100 mt-3">Edit</Button>
            </ul>
          </div>
          <Card className="w-100 me-3">
            <Card.Body>
              {loading ? (
                <h4 className="p-4">Loading...</h4>
              ) : (
                <SymptomForm initialValues={symptoms} page={"profile"} />
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

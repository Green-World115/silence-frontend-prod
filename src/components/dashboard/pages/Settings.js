import React, { useEffect, useState } from "react";
import "../components/Sidebar.css";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import * as FaIcons from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Card, Form, Button, Alert, Row, Col } from "react-bootstrap";

export default function Settings() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
  const [location, setLocation] = useState();
  const [avatar, setAvatar] = useState();

  const [error, setError] = useState("");

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
    <div className="Dashboard">
      <Sidebar />
      <NavBar title={"Settings"} />
      <div>
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
                <div class="form-check my-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <label class="form-check-label" for="defaultCheck1">
                        Email Notifications
                      </label>
                      <input
                        class="form-check-input mx-5"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                    </div>
                    <div>
                      <Button
                        disabled={loading}
                        className="w-100 mt-3 btn-danger"
                        type="submit"
                      >
                        Pause Account
                      </Button>
                    </div>
                  </div>
                  <Row>
                    <Col>
                      <label class="form-check-label" for="defaultCheck1">
                        Desktop 'Push' notifications
                      </label>
                      <input
                        class="form-check-input mb-3  mx-5"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                    </Col>
                  </Row>
                  <hr></hr>
                  <Card className="mx-5 mt-5">
                    <Card.Body>
                      {error && <Alert variant="danger">{error}</Alert>}
                      {/* <Form onSubmit={handleSubmit}> */}
                      <Row>
                        <Col>
                          <div className="d-flex flex-column">
                            <Form.Group id="email">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                readonly
                                required
                                disabled
                              />
                            </Form.Group>
                            <Form.Group id="name">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                type="text"
                                //ref={nameRef}
                                required
                              />
                            </Form.Group>
                            <Form.Group id="creditCard">
                              <Form.Label>Credit/Debit Card Number</Form.Label>
                              <Form.Control
                                type="text"
                                //ref={creditCardRef}
                                required
                              />
                            </Form.Group>
                            <Col>
                              <Row>
                                <Col>
                                  <Form.Label>Exp Date</Form.Label>
                                  <Form.Control
                                    type="text"
                                    //ref={expDateRef}
                                    required
                                  />
                                </Col>
                                <Col>
                                  <Form.Label>Security Code</Form.Label>
                                  <Form.Control
                                    type="text"
                                    //ref={securityCodeRef}
                                    required
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Button
                              disabled={loading}
                              className="w-100 mt-3"
                              type="submit"
                            >
                              Update
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

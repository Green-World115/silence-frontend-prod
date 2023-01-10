import React, { useRef, useState } from "react";

import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function AccountCreation() {
  const nameRef = useRef();
  const ageRef = useRef();
  const locationRef = useRef();

  const maleRef = useRef(null);
  const femaleRef = useRef(null);
  const tinnitusRef = useRef(null);
  const pulsatileRef = useRef(null);
  const vertigoRef = useRef(null);
  const hypercausisRef = useRef(null);
  const hearingLossRef = useRef(null);
  const visualSnowRef = useRef(null);

  const { currentUser, addUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const symptoms = [];

    const gender = maleRef.current.checked ? "Male" : "Female";
    if (tinnitusRef.current.checked) {
      symptoms.push("Tinnitus");
    }
    if (pulsatileRef.current.checked) {
      symptoms.push("Pulsatile Tinitus");
    }
    if (vertigoRef.current.checked) {
      symptoms.push("Vertigo");
    }
    if (hypercausisRef.current.checked) {
      symptoms.push("Hyperacusis");
    }
    if (hearingLossRef.current.checked) {
      symptoms.push("Hearing Loss");
    }
    if (visualSnowRef.current.checked) {
      symptoms.push("Visual Snow");
    }

    try {
      setError("");
      setLoading(true);
      await addUser(
        nameRef.current.value,
        ageRef.current.value,
        currentUser.email,
        gender,
        locationRef.current.value,
        symptoms
      );
      navigate("/symptom-assessment");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <h1 className="display-1 text-center mb-4">Account Creation</h1>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Enter Information</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex flex-row">
                <Form.Group id="Name" className="pe-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" ref={nameRef} required />
                </Form.Group>
                <Form.Group className="ms-4 mb-3 me-2" controlId="cb">
                  <Form.Label>Gender</Form.Label>
                  <br />
                  <Form.Check
                    name="gender"
                    label="Male"
                    type="radio"
                    inline
                    ref={maleRef}
                    required
                  />
                  <Form.Check
                    name="gender"
                    label="Female"
                    type="radio"
                    inline
                    ref={femaleRef}
                  />
                </Form.Group>
              </div>
              <div className="d-flex flex-row">
                <Form.Group id="Age" className="pe-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="text" ref={ageRef} />
                </Form.Group>
                <Form.Group id="Location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" ref={locationRef} required />
                </Form.Group>
              </div>
              <Form.Label>Symptoms</Form.Label>
              <div className="d-flex flex-row justify-content-center">
                <div className="d-flex flex-column pb-1 me-3">
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      name="cbTinnitus"
                      label="Tinnitus"
                      ref={tinnitusRef}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      name="cbPulsatile"
                      label="Pulsatile tinitus"
                      ref={pulsatileRef}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      name="cbVertigo"
                      label="Vertigo"
                      ref={vertigoRef}
                    />
                  </Form.Group>
                </div>
                <div class="d-flex flex-column pb-1">
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      name="cbHyperacusis"
                      label="Hyperacusis"
                      ref={hypercausisRef}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      name="cbHearing"
                      label="Hearing loss"
                      ref={hearingLossRef}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      name="cbSnow"
                      label="Visual Snow"
                      ref={visualSnowRef}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>

            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Next
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="=w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

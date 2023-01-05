import React, { useRef, useState } from "react";

import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function SymptomCause() {
  const loudNoisesRef = useRef(null);
  const medicationRef = useRef(null);
  const stressRef = useRef(null);

  const { currentUser, addUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    navigate("/avatar-upload");

    setLoading(false);
  }
  function goBack() {
    navigate("/symptom-assessment");
  }

  return (
    <>
      <h1 className="display-2 text-center mb-4">Symptom Cause</h1>
      <Card>
        <Card.Body>
          <h3 className="text-center mb-1">What Caused Your Symptoms?</h3>
          <h4 className="text-center mb-5">This information will be public.</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="cbLoudNoise"
                  label="Loud Noises"
                  ref={loudNoisesRef}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="cbmedication"
                  label="Ototoxic medications"
                  ref={medicationRef}
                />
              </Form.Group>
              <Form.Group className="mb-5" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="cbVertigo"
                  label="Stress"
                  ref={stressRef}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="textInformation">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter information here..."
                />
              </Form.Group>
            </div>
            <div className="d-flex flex-row justify-content-center mt-3">
              <Button
                disabled={loading}
                className="w-50 me-3"
                type="button"
                onClick={goBack}
              >
                Back
              </Button>
              <Button disabled={loading} className="w-50" type="submit">
                Next
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

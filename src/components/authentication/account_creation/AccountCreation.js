import React, { useState } from "react";
import { Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addSymptom } from "../../../api/symptoms";
import forEach from "lodash/forEach";
import camelCase from "lodash/camelCase";

export default function AccountCreation() {
  const { currentUser, addUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({});

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const symptoms = {};
      forEach(data.symptoms, (item) => {
        symptoms[camelCase(item)] = {
          name: item,
          left: 0,
          right: 0,
          type: "both",
        };
      });

      await addUser(
        data.name,
        data.age,
        currentUser.email,
        data.gender,
        data.location
      );
      await addSymptom(currentUser.uid, symptoms);
      navigate("/symptom-assessment");
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

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
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" required {...register("name")} />
                </Form.Group>
                <Form.Group className="ms-4 mb-3 me-2" controlId="cb">
                  <Form.Label>Gender</Form.Label>
                  <br />
                  <Form.Check
                    label="Male"
                    value="male"
                    type="radio"
                    inline
                    required
                    {...register("gender")}
                  />
                  <Form.Check
                    label="Female"
                    value="female"
                    type="radio"
                    inline
                    {...register("gender")}
                  />
                </Form.Group>
              </div>
              <div className="d-flex flex-row">
                <Form.Group id="Age" className="pe-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="text" {...register("age")} />
                </Form.Group>
                <Form.Group id="Location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("location")}
                    required
                  />
                </Form.Group>
              </div>
              <Form.Label>Symptoms</Form.Label>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Row>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Tinnitus"
                      value="Tinnitus"
                      {...register("symptoms")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Pulsatile tinnitus"
                      value="Pulsatile tinnitus"
                      {...register("symptoms")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Vertigo"
                      value="Vertigo"
                      {...register("symptoms")}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Hyperacusis"
                      value="Hyperacusis"
                      {...register("symptoms")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Hearing loss"
                      value="Hearing loss"
                      {...register("symptoms")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Visual Snow"
                      value="Visual Snow"
                      {...register("symptoms")}
                    />
                  </Col>
                </Row>
              </Form.Group>
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

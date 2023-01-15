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
        data.firstName,
        data.lastName,
        currentUser.email,
        data.age,
        data.gender,
        data.userBio,
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
      <h1 className="display-1 text-center mb-2">Account Creation</h1>
      <Card className="mx-5">
        <Card.Body>
          <h2 className="text-center mb-3">Enter Information</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column ">
              <div className="d-flex flex-row justify-content-center">
                <Form.Group id="FirstName" className="pe-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    {...register("firstName")}
                  />
                </Form.Group>
                <Form.Group id="Last Name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" {...register("lastName")} />
                </Form.Group>
              </div>
              <div className="d-flex flex-row justify-content-center mt-2">
                <Form.Group id="Age" className="pe-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="text" {...register("age")} required />
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
              <div className="d-flex flex-row justify-content-center mt-3">
                <Row>
                  <Col>
                    <Form.Group className="align-self-end" controlId="cb">
                      <Row>
                        <Col>
                          <Form.Label className="">Gender</Form.Label>
                        </Col>
                        <Col className="mt-4">
                          <Form.Check
                            label="Male"
                            value="male"
                            type="radio"
                            inline
                            required
                            {...register("gender")}
                          />
                          <Form.Check
                            className="align-self-end"
                            label="Female"
                            value="female"
                            type="radio"
                            inline
                            {...register("gender")}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-4 w-100"
                      controlId="textInformation"
                    >
                      <Form.Label className="pe-3">Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter information here..."
                        {...register("userBio")}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <div className="d-flex flex-row justify-content-center">
                  <Form.Label>Symptoms</Form.Label>
                </div>
                <div className="d-flex flex-row justify-content-center">
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
                      </Col>
                      <Col>
                        <Form.Check
                          type="checkbox"
                          label="Vertigo"
                          value="Vertigo"
                          {...register("symptoms")}
                        />
                        <Form.Check
                          type="checkbox"
                          label="Hyperacusis"
                          value="Hyperacusis"
                          {...register("symptoms")}
                        />
                      </Col>
                      <Col>
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
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center">
              <Button disabled={loading} className="w-50 mt-4" type="submit">
                Next
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="=w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

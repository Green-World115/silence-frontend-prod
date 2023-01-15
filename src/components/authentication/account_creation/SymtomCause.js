import React, { useState } from "react";
import { Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateSymptomCauses } from "../../../api/symptoms";

export default function SymptomCause() {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({});

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateSymptomCauses(
        currentUser.uid,
        data.symptomCauses,
        data.additionalSymptomCauses
      );
      navigate("/avatar-upload");
    } catch (error) {
      setError("Failed to add symptom causes");
    }
    setLoading(false);
  };

  const handleBack = () => navigate("/symptom-assessment");

  return (
    <>
      <h1 className="display-2 text-center mb-5 mt-5">Symptom Cause</h1>
      <Card className="mx-5">
        <Card.Body>
          <h3 className="text-center mb-1">What Caused Your Symptoms?</h3>
          <h4 className="text-center mb-5">This information will be public.</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-row justify-content-center mb-4">
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Row>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Loud Noises"
                      value="Loud Noises"
                      {...register("symptomCauses")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Ototoxic medication"
                      value="Ototoxic medication"
                      {...register("symptomCauses")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Stress"
                      value="Stress"
                      {...register("symptomCauses")}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Perforated ear drum"
                      value="Perforated ear drum"
                      {...register("symptomCauses")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Posture Issue"
                      value="Posture Issue"
                      {...register("symptomCauses")}
                    />

                    <Form.Check
                      type="checkbox"
                      label="Ear infection"
                      value="Ear infection"
                      {...register("symptomCauses")}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Cold/Flu/Virus"
                      value="Cold/Flu/Virus"
                      {...register("symptomCauses")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Parasitic Infection"
                      value="Parasitic Infection"
                      {...register("symptomCauses")}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Chemical Toxicity"
                      value="Chemical Toxicity"
                      {...register("symptomCauses")}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </div>
            <div className="d-flex flex-row justify-content-center mb-4">
              <Form.Group className="w-50" controlId="textInformation">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter information here..."
                  {...register("additionalSymptomCauses")}
                />
              </Form.Group>
            </div>
            <div className="d-flex flex-row justify-content-center mt-5">
              <Button
                disabled={loading}
                className="w-25 me-3"
                type="button"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button disabled={loading} className="w-25" type="submit">
                Next
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

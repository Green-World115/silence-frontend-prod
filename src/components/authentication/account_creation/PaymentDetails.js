import React, { useRef, useState } from "react";

import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function PaymentDetails() {
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const creditCardRef = useRef(null);
  const expDateRef = useRef(null);
  const securityCodeRef = useRef(null);
  const termsRef = useRef();

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
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm={7}>
                <div className="d-flex flex-column">
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      readonly
                      value={currentUser.email}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="name">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" ref={nameRef} required />
                  </Form.Group>
                  <Form.Group id="creditCard">
                    <Form.Label>Credit/Debit Card Number</Form.Label>
                    <Form.Control type="text" ref={creditCardRef} required />
                  </Form.Group>
                  <Col>
                    <Row>
                      <Col>
                        <Form.Label>Exp Date</Form.Label>
                        <Form.Control type="text" ref={expDateRef} required />
                      </Col>
                      <Col>
                        <Form.Label>Security Code</Form.Label>
                        <Form.Control
                          type="text"
                          ref={securityCodeRef}
                          required
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col className="w-100 mt-3">
                    <Row>
                      <Col sm={10}>
                        <p>Please agree to the T's & C's</p>
                      </Col>
                      <Col sm={2}>
                        <Form.Check
                          type="checkbox"
                          name="cbTerms"
                          ref={termsRef}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Button
                    disabled={loading}
                    className="w-100 mt-3"
                    type="submit"
                  >
                    Buy Now
                  </Button>
                </div>
              </Col>
              <Col sm={5}>
                <h4>Payment</h4>
                <h6>$32usd per month 14 day free trial</h6>
                <p>
                  You get: A private members group with access to suppotive and
                  experienced members, allowing you to get to silence faster
                  Access to Liam Boehm Video content available no where else on
                  the internet, to get the best and most exclusive steps to
                  silence
                </p>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

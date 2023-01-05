import React, { useRef, useState } from "react";

import { Card, Form, Button, Alert, Image } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaArrowCircleUp } from "react-icons/fa";

export default function AvatarUpload() {
  const loudNoisesRef = useRef(null);
  const medicationRef = useRef(null);
  const stressRef = useRef(null);

  const { currentUser, addUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function uploadImage() {}

  async function handleSubmit(e) {
    e.preventDefault();

    navigate("/payment-details");

    setLoading(false);
  }
  function goBack() {
    navigate("/symptom-cause");
  }

  return (
    <>
      <h1 className="text-center mb-4">Avatar Upload</h1>
      <Card>
        <Card.Body>
          <h3 className="text-center mb-5">Upload Avatar</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center mb-5">
              <img
                src="icon_avatar.png"
                style={{ height: 100, width: 100 }}
                className="img-fluid hover-shadow"
                alt=""
              />
            </div>
            <div className="d-flex justify-content-center mb-5">
              <Button
                disabled={loading}
                className=""
                type="button"
                onClick={uploadImage}
              >
                <div class="d-flex flex-row justify-content-center">
                  <FaArrowCircleUp
                    className="align-self-center me-3"
                    size={25}
                  />
                  Upload
                </div>
              </Button>
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

{
  /* <div className="d-flex flex-row justify-content-center mt-3">
              <Button
                disabled={loading}
                className="w-50 me-3 ps-5"
                type="button"
                onClick={goBack}
              >
                <div class="d-flex justify-content-between me-5">
                  <FaChevronLeft class="align-self-center" />
                  Back
                </div>
              </Button>
              <Button disabled={loading} className="w-50 ps-5" type="submit">
                <div class="d-flex justify-content-between me-4">
                  Next
                  <FaChevronRight class="align-self-center" />
                </div>
              </Button>
            </div> */
}

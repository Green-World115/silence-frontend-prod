import React, { useRef, useState } from "react";
import {
  Card,
  Form,
  Button,
  Alert,
  FormControl,
  InputGroup,
  InputGroupAppend,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import * as FaIcons from "react-icons/fa";

//import ShowHidePasswordInput from "./account_creation/components/ShowHidePasswordInput";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function ShowHidePasswordInput(props) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      passwordRef.current.type = showPassword ? "password" : "text";
      setShowPassword(!showPassword);
    };

    return (
      <InputGroup>
        <Form.Control ref={props.inputRef} type="password" required />
        <div className="input-group-append">
          <Button variant="btn-light" onClick={togglePassword}>
            {showPassword ? <FaIcons.FaRegEyeSlash /> : <FaIcons.FaEye />}
          </Button>
        </div>
      </InputGroup>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(passwordRef.current.value);

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/account-creation");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }
  return (
    <>
      <h1 className="display-1 text-center mb-4">Silence</h1>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <ShowHidePasswordInput inputRef={passwordRef} />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
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

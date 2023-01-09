import React, { useRef, useState } from "react";
import {
  Card,
  Form,
  Button,
  Alert,
  FormControl,
  Input,
  InputGroup,
  InputGroupAppend,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import ShowHidePasswordInput from "./account_creation/components/ShowHidePasswordInput";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(passwordRef.current.value);

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  // function ShowHidePasswordInput(props) {
  //   console.log("Here");
  //   const [showPassword, setShowPassword] = useState(false);

  //   const togglePassword = () => {
  //     passwordRef.current.type = showPassword ? "password" : "text";
  //     setShowPassword(!showPassword);
  //   };

  //   return (
  //     <InputGroup>
  //       <Form.Control ref={props.inputRef} type="password" required />
  //       <div className="input-group-append">
  //         <Button variant="btn-light" onClick={togglePassword}>
  //           {showPassword ? <FaIcons.FaRegEyeSlash /> : <FaIcons.FaEye />}
  //         </Button>
  //       </div>
  //     </InputGroup>
  //   );
  // }

  return (
    <>
      <h1 className="display-1 text-center mb-4">Silence</h1>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
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
              Log In
            </Button>
          </Form>
          <div className="2-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="=w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

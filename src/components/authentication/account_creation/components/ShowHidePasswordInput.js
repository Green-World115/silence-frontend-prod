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
import * as FaIcons from "react-icons/fa";

export default function ShowHidePasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
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

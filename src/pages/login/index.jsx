import { Container } from "@mui/material";
import React from "react";
import Login from "../../feature/auth/login";

const LoginPage = () => {
  return (
    <Container sx={{ height: "100vh" }} maxWidth="md">
      <Login />
    </Container>
  );
};

export default LoginPage;

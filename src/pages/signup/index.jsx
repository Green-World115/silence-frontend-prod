import { Container } from "@mui/material";
import React from "react";
import SignUp from "../../feature/auth/signup";

const LoginPage = () => {
  return (
    <Container sx={{ height: "100vh" }} maxWidth="md">
      <SignUp />
    </Container>
  );
};

export default LoginPage;

import { Container } from "@mui/material";
import React from "react";
import ResetPassword from "../../feature/auth/reset-password";

const ResetPasswordPage = () => {
  return (
    <Container sx={{ height: "100vh" }} maxWidth="md">
      <ResetPassword />
    </Container>
  );
};

export default ResetPasswordPage;

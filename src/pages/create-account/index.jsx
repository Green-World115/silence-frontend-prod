import { Container } from "@mui/material";
import React from "react";
import CreateAccount from "../../feature/user/create-account";

const CreateAccountPage = () => {
  return (
    <Container sx={{ height: "100vh", py: 10 }} maxWidth="lg">
      <CreateAccount />
    </Container>
  );
};

export default CreateAccountPage;

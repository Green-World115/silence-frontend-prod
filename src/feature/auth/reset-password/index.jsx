import { Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RHFTextField from "../../../components/hook-forms/RHFTextField";
import { Company, Links, StyledGrid, StyledGridItem, StyledLink, Title } from "./styled";

const ResetPassword = () => {
  const { control } = useForm();
  const navigate = useNavigate();

  return (
    <StyledGrid container spacing={2}>
      <StyledGridItem item xs={12} md={6}>
        <Company variant="h5">Tinnitus pal</Company>
        <Title variant="h4">Reset your password</Title>
        <Stack spacing={3} sx={{ width: "100%" }}>
          <RHFTextField name="email" control={control} label="Email" />
          <Button size="large">Send</Button>
        </Stack>
        <Links onClick={() => navigate("/login")}>
          <StyledLink fontWeight={500}>Back to Login</StyledLink>
        </Links>
      </StyledGridItem>
      <Grid item xs={12} md={6}></Grid>
    </StyledGrid>
  );
};

export default ResetPassword;

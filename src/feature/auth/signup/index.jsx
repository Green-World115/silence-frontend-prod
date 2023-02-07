import { Grid, Stack, Paper } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RHFTextField from "../../../components/hook-forms/RHFTextField";
import { Company, Links, StyledGrid, StyledGridItem, StyledLink, Title, Content } from "./styled";
import * as authApi from "../../../api/auth";
import { useSnackbar } from "notistack";
import logo from "../hearingloss.png";

import Button from "components/Button";
const SignUp = () => {
  const [loading, setLoading] = useState();
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate({});
  const { enqueueSnackbar } = useSnackbar();

  const signup = handleSubmit(async (values) => {
    setLoading(true);
    const { error, data } = await authApi.signup(values.email, values.password);
    if (error) enqueueSnackbar(error.message, { variant: "error" });

    if (data?.user?.identities.length === 0) {
      enqueueSnackbar("Email already exits", { variant: "error" });
    } else {
      sessionStorage.setItem("temp-email", data.user.email);
      navigate("/create-account");
    }

    setLoading(false);
  });

  return (
    <Paper elevation={5}>
      <Content>
        <StyledGrid container spacing={2}>
          <StyledGridItem item xs={12} md={7}>
            <Company variant="h5">Tinnitus pal</Company>
            <Title variant="h4">Create account</Title>
            <Stack spacing={2} sx={{ width: "100%" }}>
              <RHFTextField name="email" control={control} label="Email" />
              <RHFTextField name="password" control={control} label="Password" type="password" />
              <RHFTextField
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                type="password"
                sx={{ mb: 2 }}
              />
              <Button size="large" onClick={signup}>
                Create
              </Button>
            </Stack>
            <Links onClick={() => navigate("/login")}>
              <StyledLink fontWeight={500}>Already have a account? Login</StyledLink>
            </Links>
          </StyledGridItem>
          <StyledGridItem item xs={12} md={5}>
            <img src={logo} alt="Logo" width={" 95%"} />
          </StyledGridItem>
        </StyledGrid>
      </Content>
    </Paper>
  );
};

export default SignUp;

import { Grid, Stack, Paper } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RHFTextField from "../../../components/hook-forms/RHFTextField";
import Button from "../../../components/Button";
import { Company, Links, StyledGrid, StyledGridItem, StyledLink, Title, Content } from "./styled";
import logo from '../hearingloss.png'; 
import * as authApi from "api/auth";
import { useSnackbar } from "notistack";
const Login = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const login = handleSubmit(async (values) => {
    const { data, error } = await authApi.login(values.email, values.password);
    if (error) enqueueSnackbar(error.message, { variant: "error" });
    else enqueueSnackbar("Login success");
  });

  return (
    <div style={{marginTop: "100px" }} >
    <Paper elevation={5}>
      <Content>
        <StyledGrid container spacing={3}>
          <StyledGridItem item xs={12} md={6}>
            <Company variant="h5">Tinnitus pal</Company>
            <Title variant="h4">Sign in to your account</Title>
            <Stack spacing={3} sx={{ width: "100%" }}>
              <RHFTextField name="email" control={control} label="Email" />
              <RHFTextField name="password" control={control} label="Password" type="password" />
              <Button size="large" onClick={login}>
                Login
              </Button>
            </Stack>
            <Links>
              <StyledLink fontWeight={500} onClick={() => navigate("/reset-password")}>
                Reset password
              </StyledLink>
              <StyledLink fontWeight={500} onClick={() => navigate("/create-account")}>
                Don't have account? Create account
              </StyledLink>
            </Links>
          </StyledGridItem>
          <Grid item xs={12} md={6}>
          <StyledGridItem item xs={12} md={6}>
          <img src={logo} alt="Logo" width={" 95%"}/>
          </StyledGridItem>
          </Grid>
        </StyledGrid>
      </Content>
    </Paper>
    </div>

  );
};

export default Login;

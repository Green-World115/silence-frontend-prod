import { Button, Container, Grid, Stack, TextField, Typography, Paper } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RHFTextField from "../../../components/hook-forms/RHFTextField";
import { Company, Links, StyledGrid, StyledGridItem, StyledLink, Title, Content } from "./styled";
import logo from '../hearingloss.png'; 

const ResetPassword = () => {
  const { control } = useForm();
  const navigate = useNavigate();

  return (
    <div style={{marginTop: "100px" }} >
    <Paper elevation={5}>
      <Content>
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
      <Grid item xs={12} md={6}><StyledGridItem item xs={12} md={6}>
          <img src={logo} alt="Logo" width={" 95%"}/>
          </StyledGridItem>
          </Grid>
        </StyledGrid>
      </Content>
    </Paper>
    </div>
  );
};

export default ResetPassword;

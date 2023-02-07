import { Grid, Paper } from "@mui/material";
import Button from "components/Button";
import RHFTextField from "components/hook-forms/RHFTextField";
import React from "react";
import { useForm } from "react-hook-form";
import { Content } from "./styled";

const Info = () => {
  const { control } = useForm();

  return (
    <Paper elevation={3}>
      <Content>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <RHFTextField name="firstName" label="First Name" control={control} fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="lastName" label="Last Name" control={control} fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="email" label="Email" control={control} fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="age" label="Age" control={control} fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="location" label="Location" control={control} fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Button>Save changes</Button>
          </Grid>
        </Grid>
      </Content>
    </Paper>
  );
};

export default Info;

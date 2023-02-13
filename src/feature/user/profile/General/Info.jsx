import { useState } from "react";
import { Box, Grid, Paper, FormLabel } from "@mui/material";
import Button from "components/Button";
import RHFTextField from "components/hook-forms/RHFTextField";
import RHFSwitch from "components/hook-forms/RHFSwitch";
import React from "react";
import * as userApi from "api/user";
import { useForm } from "react-hook-form";
import { Content } from "./styled";
import { useSnackbar } from "notistack";

const Info = ({ initialValues }) => {
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit } = useForm({ defaultValues: initialValues });

  const { enqueueSnackbar } = useSnackbar();

  const submit = handleSubmit(async (values) => {
    setSaving(true);
    const userResponse = await userApi.updateUserBasicInfo(values.id, {
      firstName: values.firstName,
      lastName: values.lastName,
      age: values.age,
      location: values.location,
      hideLocationAge: values.hideLocationAge,
    });

    if (userResponse.error) {
      enqueueSnackbar("Update failed", { variant: "error" });
      setSaving(false);
      return;
    } else {
      enqueueSnackbar("Update success", { variant: "success" });
    }

    setSaving(false);
  });

  return (
    <Paper elevation={3}>
      <Content>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RHFTextField name="firstName" label="First Name" control={control} fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="lastName" label="Last Name" control={control} fullWidth />
          </Grid>

          <Grid item xs={12} md={6}>
            <RHFTextField name="age" label="Age" control={control} fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="location" label="Location" control={control} fullWidth />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="space-between">
              <FormLabel>Keep my location and age private</FormLabel>
              <RHFSwitch name="hideLocationAge" control={control} />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={submit} loading={saving}>
                Save changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Content>
    </Paper>
  );
};

export default Info;

import { Box, FormLabel, Grid, Stack, Typography } from "@mui/material";
import Button from "components/Button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RHFTextField from "components/hook-forms/RHFTextField";
import Switch from "components/mui-form/Switch";
import Slider from "../Slider";
import { Info } from "./styled";
import * as userApi from "api/user";

const BasicInformation = ({ initialValues, symptomOptions }) => {
  const [saving, setSaving] = useState();

  const { control, handleSubmit } = useForm({ defaultValues: initialValues });

  const submit = handleSubmit(async (values) => {
    setSaving(true);

    const { data, error } = await userApi.updateUserBasicInfo(values.email, {
      firstName: values.firstName,
      lastName: values.lastName,
      age: values.age,
      location: values.location,
    });

    setSaving(false);
  });

  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <RHFTextField name="firstName" control={control} label="First Name" />
          <RHFTextField name="email" control={control} label="Email" disabled />
          <RHFTextField name="age" control={control} label="Age" />
          <RHFTextField name="location" control={control} label="Location" />

          <Info>
            <Typography variant="body2">
              Your email address will be hidden from all members, but your age, name, and location can be used to find
              people like you. You can opt to keep your location privie by clicking here
            </Typography>
          </Info>

          <Box display="flex" justifyContent="space-between">
            <FormLabel>Keep my location and age private</FormLabel>
            <Switch />
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          {symptomOptions?.map((symptom) => (
            <Slider label={symptom?.name} />
          ))}
        </Stack>
      </Grid>

      <Grid item>
        <Button loading={saving} onClick={submit}>
          Save and continue
        </Button>
      </Grid>
    </Grid>
  );
};

export default BasicInformation;

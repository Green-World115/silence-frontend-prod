import { Box, FormLabel, Grid, Stack, Typography } from "@mui/material";
import Button from "components/Button";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import RHFTextField from "components/hook-forms/RHFTextField";
import Switch from "components/mui-form/Switch";
import { Info } from "./styled";
import Input from "./Input";
import * as userApi from "api/user";
import * as symptomApi from "api/symptoms";

const BasicInformation = ({ initialValues }) => {
  const [saving, setSaving] = useState();

  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const { fields } = useFieldArray({
    control,
    name: "symptoms",
  });

  const submit = handleSubmit(async (values) => {
    setSaving(true);
    const userResponse = await userApi.updateUserBasicInfo(values.id, {
      firstName: values.firstName,
      lastName: values.lastName,
      age: values.age,
      location: values.location,
    });

    const symptoms = values.symptoms?.map((symptom) => ({
      value: symptom.value,
      symptomId: symptom.symptomId,
      userId: values.id,
      id: symptom.userSymptomId,
    }));

    const symptomResponse = await symptomApi.updateUserSymptoms(symptoms);

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

      <Grid item xs={12} md={6} marginTop="-30px">
        <Stack spacing={2}>
          {fields?.map((field, index) => (
            <Input
              type={field.type}
              label={field.name}
              control={control}
              name={`symptoms.${index}.value`}
              key={field.id}
            />
          ))}
        </Stack>
      </Grid>

      <Grid item marginTop="-75px">
        <Button loading={saving} onClick={submit}>
          Save and continue
        </Button>
      </Grid>
    </Grid>
  );
};

export default BasicInformation;

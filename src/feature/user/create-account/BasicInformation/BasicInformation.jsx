import { Box, FormLabel, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

import RHFTextField from "../../../../components/hook-forms/RHFTextField";
import Switch from "../../../../components/mui-form/Switch";
import Slider from "../Slider";
import { Info } from "./styled";

const BasicInformation = () => {
  const { control } = useForm();

  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <RHFTextField name="firstName" control={control} label="First Name" />
          <RHFTextField name="email" control={control} label="Email" />
          <RHFTextField name="password" control={control} label="Password" />
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

      <Grid item xs={12} md={6} style={{marginTop: '-30px'}}>
        <Stack spacing={2}>
          <Slider label="Tinnitus" />
          <Slider label="Pulsatile Tinnitus" />
          <Slider label="Hyperacusis" />
          <Slider label="Vertigo" />
          <Slider label="Hearing Loss" />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BasicInformation;

import TextField from "components/mui-form/TextField";
import React from "react";
import { Controller } from "react-hook-form";

const RHFTextField = ({ name, control, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...rest} />
      )}
    />
  );
};

export default RHFTextField;

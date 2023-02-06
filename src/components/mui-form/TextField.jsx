import { FormControl, FormHelperText, FormLabel, OutlinedInput } from "@mui/material";
import React from "react";

const TextField = ({ label, helperText, error, fullWidth = true, ...props }) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <FormLabel sx={{ mb: 0.5 }}>{label}</FormLabel>
      <OutlinedInput {...props} size="small"/>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default TextField;

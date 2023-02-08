import { Checkbox } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const RHFCheckbox = ({ name, control, ...rest }) => {
  return <Controller name={name} control={control} render={({ field }) => <Checkbox {...field} {...rest} />} />;
};

export default RHFCheckbox;

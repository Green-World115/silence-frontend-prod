import { forwardRef } from "react";
import Switch from "components/mui-form/Switch";
import { Controller } from "react-hook-form";

const RHFSwitch = forwardRef(({ name, control, ...rest }, ref) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Switch {...field} {...rest} checked={field.value} ref={ref} />}
    />
  );
});

export default RHFSwitch;

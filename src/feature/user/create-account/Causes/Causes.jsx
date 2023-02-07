import { createFilterOptions, Grid, Paper, Stack, Typography,FormLabel } from "@mui/material";
import TextField from "components/mui-form/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import RHFAutocomplete from "../../../../components/hook-forms/RHFAutocomplete";
import { Info } from "./styled";

const causes = [
  { id: 1, label: "Cause-1" },
  { id: 2, label: "Cause-2" },
  { id: 3, label: "Cause-3" },
  { id: 4, label: "Cause-4" },
  { id: 5, label: "Cause-5" },
];

const filter = createFilterOptions();

const Causes = () => {
  const { control } = useForm();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Stack spacing={1}>
        <FormLabel >Tinnitus</FormLabel>
          <RHFAutocomplete
            name="firstName"
            control={control}
            // onChange={(event, newValue) => {
            //   if (typeof newValue === "string") {
            //     setValue({
            //       title: newValue,
            //     });
            //   } else if (newValue && newValue.inputValue) {
            //     // Create a new value from the user input
            //     setValue({
            //       title: newValue.inputValue,
            //     });
            //   } else {
            //     setValue(newValue);
            //   }
            // }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some((option) => inputValue === option.title);
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={causes}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.label;
            }}
            renderOption={(props, option) => <li {...props}>{option.label}</li>}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Enter details..." />}
          />
          <FormLabel>Pulsatile Tinnitus</FormLabel>
          <RHFAutocomplete
            name="firstName"
            control={control}
            // onChange={(event, newValue) => {
            //   if (typeof newValue === "string") {
            //     setValue({
            //       title: newValue,
            //     });
            //   } else if (newValue && newValue.inputValue) {
            //     // Create a new value from the user input
            //     setValue({
            //       title: newValue.inputValue,
            //     });
            //   } else {
            //     setValue(newValue);
            //   }
            // }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some((option) => inputValue === option.title);
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={causes}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.label;
            }}
            renderOption={(props, option) => <li {...props}>{option.label}</li>}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Pulsatile Tinnitus" />}
          />
          <FormLabel >Hyperacusis</FormLabel>
          <RHFAutocomplete
            name="firstName"
            control={control}
            // onChange={(event, newValue) => {
            //   if (typeof newValue === "string") {
            //     setValue({
            //       title: newValue,
            //     });
            //   } else if (newValue && newValue.inputValue) {
            //     // Create a new value from the user input
            //     setValue({
            //       title: newValue.inputValue,
            //     });
            //   } else {
            //     setValue(newValue);
            //   }
            // }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some((option) => inputValue === option.title);
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={causes}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.label;
            }}
            renderOption={(props, option) => <li {...props}>{option.label}</li>}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Hyperacusis" />}
          />
          <FormLabel>Vertigo</FormLabel>
          <RHFAutocomplete
            name="firstName"
            control={control}
            // onChange={(event, newValue) => {
            //   if (typeof newValue === "string") {
            //     setValue({
            //       title: newValue,
            //     });
            //   } else if (newValue && newValue.inputValue) {
            //     // Create a new value from the user input
            //     setValue({
            //       title: newValue.inputValue,
            //     });
            //   } else {
            //     setValue(newValue);
            //   }
            // }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some((option) => inputValue === option.title);
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={causes}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.label;
            }}
            renderOption={(props, option) => <li {...props}>{option.label}</li>}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Vertigo" />}
          />
          
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Info style={{marginTop: "50px"}}>
          <Typography variant="body2">
            This page is used to gather information regarding the cause or causes of your tinnitus and/or other
            symptoms. <br/><br/>Simply start typing, and if your cause does not show, you can still enter it as a cause. <br/><br/>Please
            answer to the best of your abilities, and don't worry about getting everything perfect. <br/><br/>These answers can be
            changed later.
          </Typography>
        </Info>
      </Grid>
    </Grid>
  );
};

export default Causes;

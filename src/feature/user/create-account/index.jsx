import { Box, Button, Grid, Paper } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RHFTextField from "../../../components/hook-forms/RHFTextField";
import BasicInformation from "./BasicInformation";
import { Card, Company, Container, Content, Footer, Title } from "./styed";
import { useState } from "react";
import Causes from "./Causes";
import Plans from "./Plans";

export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          <>{children}</>
        </>
      )}
    </div>
  );
};

const CreateAccount = () => {
  const { control } = useForm();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Company variant="h5">Tinnitus pal</Company>
      <Title variant="h4">Complete your account</Title>
      <Paper elevation={5}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Basic Information" />
          <Tab label="Causes" />
          <Tab label="Plans" />
        </Tabs>
        <Content>
          <TabPanel value={value} index={0}>
            <BasicInformation />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Causes />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Plans />
          </TabPanel>
        </Content>
      </Paper>
    </div>
  );
};

export default CreateAccount;

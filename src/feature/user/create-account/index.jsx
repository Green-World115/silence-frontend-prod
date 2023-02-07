import { Box, Button, Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BasicInformation from "./BasicInformation";
import { Company, Content, Title } from "./styed";
import { useState } from "react";
import Causes from "./Causes";
import Plans from "./Plans";
import * as symptomApi from "api/symptoms";
import * as userApi from "api/user";

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
            <BasicInformation onNext={() => handleChange(1)} />
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

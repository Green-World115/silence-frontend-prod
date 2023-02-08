import { Box, Button, Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BasicInformation from "./BasicInformation";
import { Company, Content, Title, StyledLink } from "./styled";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import Causes from "./Causes";
import Plans from "./Plans";
import { useCreateAccount } from "./hooks/useCreateAccount";

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
  const [tab, setTab] = useState(0);
  const navigate = useNavigate({});

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const { loading, basicInfo, symptomOptions } = useCreateAccount(tab);

  return (
    <>
      <Company variant="h5">Tinnitus pal</Company>
      <Paper elevation={5}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Basic Information" />
          <Tab label="Causes" />
          <Tab label="Plans" />
        </Tabs>
        <Content>
          <TabPanel value={tab} index={0}>
            {!loading && (
              <BasicInformation
                onNext={() => handleChange(1)}
                symptomOptions={symptomOptions}
                initialValues={basicInfo}
              />
            )}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Causes />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Plans />
          </TabPanel>
        </Content>
      </Paper>
    </>
  );
};

export default CreateAccount;

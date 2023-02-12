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
    <div role="tabpanel" hidden={value !== index} aria-labelledby={`simple-tab-${index}`} {...other}>
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

  // const handleChange = (event, newValue) => {
  //   setTab(newValue);
  // };

  const { loading, basicInfo, symptomOptions, causes } = useCreateAccount(tab);

  return (
    <>
      <Company variant="h5">Tinnitus pal</Company>
      <Paper elevation={5}>
        <Tabs value={tab}>
          <Tab label="Basic Information" disableRipple />
          <Tab label="Causes" disableRipple />
          <Tab label="Plans" disableRipple />
        </Tabs>
        <Content>
          <TabPanel value={tab} index={0}>
            {!loading && <BasicInformation onNext={() => setTab(1)} initialValues={basicInfo} />}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            {!loading && <Causes initialValues={causes} onNext={() => setTab(2)} onBack={() => setTab(0)} />}
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Plans onBack={() => setTab(1)} />
          </TabPanel>
        </Content>
      </Paper>
    </>
  );
};

export default CreateAccount;

import { Box, Button, Grid, Paper } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RHFTextField from "../../../components/hook-forms/RHFTextField";
import BasicInformation from "./BasicInformation";
import { Card, Company, Container, Content, Footer, Title, StyledLink } from "./styled";
import { useNavigate } from "react-router-dom";


import { useState } from "react";
import Causes from "./Causes";

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
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{marginTop: "-70px"}}>
      <div style={{display: 'flex', whiteSpace: 'nowrap' }}>
        <Company variant="h5">Tinnitus pal</Company>
        <StyledLink fontWeight={300} onClick={() => navigate("/login")}>
              Already have account? Login
            </StyledLink>
      </div>
      <Paper elevation={5}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Basic Information" />
          <Tab label="Causes" />
          <Tab label="Plan" />
        </Tabs>
        <Content>
          <TabPanel value={value} index={0}>
            <BasicInformation />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Causes />
          </TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
          <Footer>
            <Button size="large">Save & continue</Button>
          </Footer>
        </Content>
      </Paper>
    </div>
  );
};

export default CreateAccount;

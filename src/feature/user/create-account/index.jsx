import { Box, Card, Link, Paper } from "@mui/material";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BasicInformation from "./BasicInformation";
import { Company, Content } from "./styled";

import { useState } from "react";
import Causes from "./Causes";
import Plans from "./Plans";
import { useCreateAccount } from "./hooks/useCreateAccount";
import * as authApi from "api/auth";
import { useRouter } from "next/router";
import TabPanel from "components/TabPanel";

const CreateAccount = () => {
  const [tab, setTab] = useState(0);

  const router = useRouter();

  const { loading, basicInfo, causes } = useCreateAccount(tab);

  const handleLogout = async () => {
    await authApi.logout();
    router.push("/login");
  };

  return (
    <>
      <Box justifyContent="space-between" display="flex">
        <Company variant="h5">Tinnitus pal</Company>
        <Link whiteSpace="nowrap" component="button" variant="h6" onClick={handleLogout}>
          Log out
        </Link>
      </Box>
      <Card >
        <Tabs value={tab} sx={{ "& .MuiTabs-flexContainer": { pl: 2 } }}>
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
      </Card>
    </>
  );
};

export default CreateAccount;

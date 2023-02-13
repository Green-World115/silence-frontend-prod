import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import General from "./General";
import TabPanel from "components/TabPanel";

const Profile = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (_event, newValue) => {
    setTab(newValue);
  };

  return (
    <div>
      <Typography variant="h5" fontWeight="bold" mb={5}>
        Profile
      </Typography>

      <Tabs value={tab} onChange={handleChange}>
        <Tab label="General" disableRipple />
        <Tab label="Billing" disableRipple />
        <Tab label="Password" disableRipple />
      </Tabs>

      <Box mt={4}>
        <TabPanel value={tab} index={0}>
          <General />
        </TabPanel>
      </Box>
    </div>
  );
};

export default Profile;

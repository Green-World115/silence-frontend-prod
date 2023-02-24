import React, { useState } from "react";
import { Box } from "@mui/material";
import Cover from "./Cover";
import Posts from "./Posts";

const tabs = [
  { component: <Posts />, name: "Posts", value: "posts" },
  { component: <div />, name: "Members", value: "members" },
];

const Group = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const handleChangeTab = (_, tab) => setActiveTab(tab);

  return (
    <Box sx={{ width: "100%" }}>
      <Cover activeTab={activeTab} onChangeTab={handleChangeTab} />
      {tabs.map((tab) => tab.value === activeTab && <div key={tab.value}> {tab.component} </div>)}
    </Box>
  );
};

export default Group;

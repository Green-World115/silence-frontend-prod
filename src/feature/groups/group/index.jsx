import React, { useState } from "react";
import { Box } from "@mui/material";
import Cover from "./Cover";
import Posts from "./Posts";
import { useGroup } from "./use-group";

const tabs = [
  { component: <Posts />, name: "Posts", value: "posts" },
  { component: <div />, name: "Members", value: "members" },
];

const Group = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const handleChangeTab = (_, tab) => setActiveTab(tab);

  const group = useGroup();

  return (
    <Box sx={{ width: "100%" }}>
      <Cover
        activeTab={activeTab}
        onChangeTab={handleChangeTab}
        name={group.data?.name}
        category={group?.data?.category?.name}
      />
      {tabs.map((tab) => tab.value === activeTab && <div key={tab.value}> {tab.component} </div>)}
    </Box>
  );
};

export default Group;

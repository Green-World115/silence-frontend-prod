import React from "react";
import { Box } from "@mui/material";
import Cover from "./Cover";
import Posts from "./Posts";

const Group = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Cover />
      <Posts />
    </Box>
  );
};

export default Group;

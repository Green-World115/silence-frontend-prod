import React from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../Sidebar";
import Header from "../Header";

const DashboardLayout = ({ children, maxWidth, title }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ maxHeight: "100%", width: "100%" }}>
        <Header />
        <Box
          component="main"
          sx={{ display: "flex", p: 3, minHeight: "calc(100vh - 64px)", width: "100%", flexDirection: "column" }}
          maxWidth={maxWidth}
          margin="auto"
        >
          <Box sx={{ display: "flex", flex: 1 }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;

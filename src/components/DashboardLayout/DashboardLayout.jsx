import React from "react";
import { Box, Container } from "@mui/material";
import Sidebar from "../Sidebar";
import Header from "../Header";

const DashboardLayout = ({ children, maxWidth }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ maxHeight: "100%", width: "100%" }}>
        <Header />
        <Box
          component="main"
          sx={{ display: "flex", p: 3, height: "calc(100vh - 64px)", width: "100%" }}
          maxWidth={maxWidth}
          margin="auto"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;

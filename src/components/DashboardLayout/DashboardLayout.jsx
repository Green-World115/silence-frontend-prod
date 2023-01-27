import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "../Sidebar";
import Header from "../Header";

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ maxHeight: "100%", width: "100%" }}>
        <Header />
        <Box component="main" sx={{ display: "flex", p: 3, height: "calc(100vh - 64px)", width: "100%" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;

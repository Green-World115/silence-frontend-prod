import { Typography } from "@mui/material";
import DashboardLayout from "components/dashboard-layout";
import React from "react";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

const Index = () => {
  return (
    <div>
      <Typography>Coming soon</Typography>
    </div>
  );
};

export default Index;

Index.getLayout = function getLayout(page) {
  return <DashboardLayout maxWidth="lg">{page}</DashboardLayout>;
};

export const getServerSideProps = dashboardGetServerSideProps;

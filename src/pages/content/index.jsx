import { Typography } from "@mui/material";
import DashboardLayout from "components/dashboard-layout";
import Content from "feature/content";
import React from "react";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

const ContentPage = () => {
  return <Content />;
};

export default ContentPage;

ContentPage.getLayout = function getLayout(page) {
  return <DashboardLayout maxWidth="md">{page}</DashboardLayout>;
};

export const getServerSideProps = dashboardGetServerSideProps;

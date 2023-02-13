import DashboardLayout from "components/DashboardLayout";
import React from "react";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

const Index = () => {
  return <div>Home</div>;
};

export default Index;

Index.getLayout = function getLayout(page) {
  return <DashboardLayout maxWidth="lg">{page}</DashboardLayout>;
};

export const getServerSideProps = dashboardGetServerSideProps;

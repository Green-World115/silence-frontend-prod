import DashboardLayout from "components/dashboard-layout";
import NewGroup from "feature/groups/new-group";
import React from "react";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

export const NewGroupPage = () => {
  return <NewGroup />;
};

export default NewGroupPage;

NewGroupPage.getLayout = function getLayout(page) {
  return <DashboardLayout maxWidth="xl">{page}</DashboardLayout>;
};

export const getServerSideProps = dashboardGetServerSideProps;

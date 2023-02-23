import DashboardLayout from "components/DashboardLayout";
import Group from "feature/groups/group";
import React from "react";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

export const GroupsPage = () => {
  return <Group />;
};

export default GroupsPage;

GroupsPage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout maxWidth="lg" title="Groups">
      {page}
    </DashboardLayout>
  );
};

export const getServerSideProps = dashboardGetServerSideProps;

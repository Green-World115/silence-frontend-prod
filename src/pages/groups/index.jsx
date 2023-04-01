import DashboardLayout from "components/dashboard-layout";
import GroupList from "feature/groups/group-list";
import React from "react";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

export const GroupsPage = () => {
  return <GroupList />;
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

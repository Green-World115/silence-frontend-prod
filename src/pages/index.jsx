import { Typography } from '@mui/material';
import DashboardLayout from 'components/dashboard-layout';
import Home from 'feature/home';
import React from 'react';
import { dashboardGetServerSideProps } from 'utils/getServerSideProps';

const Index = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default Index;

Index.getLayout = function getLayout(page) {
  return <DashboardLayout maxWidth="md">{page}</DashboardLayout>;
};

export const getServerSideProps = dashboardGetServerSideProps;

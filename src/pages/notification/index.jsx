import DashboardLayout from 'components/dashboard-layout';
import Notification from 'feature/notification';
import { dashboardGetServerSideProps } from 'utils/getServerSideProps';

const NotificationPage = () => {
  return <Notification />;
};

export default NotificationPage;

NotificationPage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout maxWidth="sm" title="Notification">
      {page}
    </DashboardLayout>
  );
};

export const getServerSideProps = dashboardGetServerSideProps;

import DashboardLayout from "components/DashboardLayout";
import Notification from "feature/notification";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

const NotificationPage = () => {
  return <Notification />;
};

export default NotificationPage;

NotificationPage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout maxWidth="lg" title="Notification">
      {page}
    </DashboardLayout>
  );
};

export const getServerSideProps = dashboardGetServerSideProps;

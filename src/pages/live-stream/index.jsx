import DashboardLayout from "components/dashboard-layout";
import LiveStream from "feature/live-stream";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

const LiveStreamPage = () => {
  return <LiveStream />;
};

export default LiveStreamPage;

LiveStreamPage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout maxWidth="lg" title="Notification">
      {page}
    </DashboardLayout>
  );
};

export const getServerSideProps = dashboardGetServerSideProps;

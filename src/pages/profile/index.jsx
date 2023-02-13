import DashboardLayout from "components/DashboardLayout";
import Profile from "feature/user/profile";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page) {
  return <DashboardLayout maxWidth="lg">{page}</DashboardLayout>;
};

export const getServerSideProps = dashboardGetServerSideProps;

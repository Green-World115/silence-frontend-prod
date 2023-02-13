import DashboardLayout from "components/DashboardLayout";
import Symptoms from "feature/user/symptoms";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

const SymptomPage = () => {
  return <Symptoms />;
};

export default SymptomPage;

SymptomPage.getLayout = function getLayout(page) {
  return <DashboardLayout maxWidth="lg">{page}</DashboardLayout>;
};

export const getServerSideProps = dashboardGetServerSideProps;

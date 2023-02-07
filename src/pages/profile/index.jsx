import DashboardLayout from "components/DashboardLayout";
import Profile from "feature/user/profile";
import React from "react";

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <Profile />
    </DashboardLayout>
  );
};

export default ProfilePage;

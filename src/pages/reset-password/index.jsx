import AuthLayout from "components/AuthLayout";
import React from "react";
import ResetPassword from "../../feature/auth/reset-password";

const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <ResetPassword />
    </AuthLayout>
  );
};

export default ResetPasswordPage;

import React from "react";
import Login from "feature/auth/login";
import AuthLayout from "components/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;

import AuthLayout from "components/AuthLayout";
import React from "react";
import SignUp from "../../feature/auth/signup";

const LoginPage = () => {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
};

export default LoginPage;

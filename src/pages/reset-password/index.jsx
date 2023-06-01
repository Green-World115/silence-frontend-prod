import AuthLayout from "components/AuthLayout";
import React from "react";
import ResetPassword from "../../feature/auth/reset-password";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import * as userApi from "@api/user";

const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <ResetPassword />
    </AuthLayout>
  );
};

export default ResetPasswordPage;

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const { data } = await supabase.rpc("get_session");

  if (data) {
    if (data && !data?.isAccountComplete) {
      return {
        redirect: {
          destination: "/create-account",
          permanent: false,
        },
      };
    } else if (data) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  }

  return {
    props: {},
  };
};

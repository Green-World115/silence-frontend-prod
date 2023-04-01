import React from "react";
import Login from "feature/auth/login";
import AuthLayout from "components/AuthLayout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import * as userApi from "api/user";

const LoginPage = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;

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

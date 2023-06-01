import AuthLayout from "components/AuthLayout";
import React from "react";
import SignUp from "feature/auth/signup";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import * as userApi from "@api/user";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
};

export default SignUpPage;

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

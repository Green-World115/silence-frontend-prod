import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import * as userApi from "api/user";

export const dashboardGetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data } = await userApi.getUserById(session.user.id);

    if (data && data?.isAccountComplete) {
      return {
        props: {
          initialSession: { ...session, user: data },
        },
      };
    } else if (data && !data?.isAccountComplete) {
      return {
        redirect: {
          destination: "/create-account",
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

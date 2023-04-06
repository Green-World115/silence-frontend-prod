import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import * as userApi from "api/user";

export const dashboardGetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const { data } = await supabase.rpc("get_session");

  console.log(ctx.req);

  if (data) {
    if (data && data?.isAccountComplete) {
      return {
        props: {
          initialSession: data,
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

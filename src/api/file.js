import { supabase } from "utils/superbase-client";
import { getPagination } from "utils/pagination";

export const getGroupsByUserId = (userId) => {
  return supabase
    .from("post_groups")
    .select(
      "id, name, userPostGroup: user_post_groups!inner(*,isAccepted), users:user_post_groups(user: users(firstName, image)), userCount: user_post_groups(count), postCount: posts(count)"
    )
    .eq("user_post_groups.userId", userId)
    .limit(3, { foreignTable: "user_post_groups" });
};

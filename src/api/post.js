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

export const createGroup = ({ name, description, createdBy, allowInvitation, allowLimitedInvitation }) => {
  return supabase
    .from("post_groups")
    .insert({ name, description, createdBy, allowInvitation, allowLimitedInvitation })
    .select()
    .single();
};
export const addUsersToGroup = (users) => {
  return supabase.from("user_post_groups").upsert(users);
};

export const acceptGroupInvitation = (userId, groupId) => {
  return supabase.from("user_post_groups").update({ isAccepted: true }).match({ userId, postGroupId: groupId });
};

export const declineGroupInvitation = (userId, groupId) => {
  return supabase.from("user_post_groups").delete().match({ userId, postGroupId: groupId });
};

export const createPost = ({ userId, groupId, text, media = [] }) => {
  return supabase.from("posts").insert({ userId, postGroupId: groupId, text, media }).throwOnError();
};

export const getPostsByGroup = async (groupId, page = 1) => {
  const { from, to } = getPagination(page, 5);
  const { data, count } = await supabase
    .from("posts")
    .select("id, text, media, createdAt, user:users(id, firstName, lastName, image), comments: post_comments(count)", {
      count: "exact",
    })
    .eq("postGroupId", groupId)
    .order("createdAt", { ascending: false })
    .range(from, to)
    .throwOnError();

  const totalPages = Math.ceil(count / 5);
  const nextCursor = totalPages > page && page + 1;
  return { data, nextCursor };
};

export const addComment = ({ userId, postId, text }) => {
  return supabase.from("post_comments").insert({ userId, postId, text }).throwOnError();
};

export const getCommentsByPost = (postId) => {
  return supabase
    .from("post_comments")
    .select("id, text, createdAt, user: users(id, firstName, lastName, image)")
    .eq("postId", postId)
    .throwOnError();
};

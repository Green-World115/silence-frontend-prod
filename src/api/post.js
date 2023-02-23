import { supabase } from "../utils/superbase-client";

export const getGroupsByUserId = (userId) => {
  return supabase
    .from("post_groups")
    .select("id, name, userPostGroup: user_post_groups!inner(*,isAccepted)")
    .eq("user_post_groups.userId", userId);
};

export const createGroup = ({ name, description, createdBy }) => {
  return supabase.from("post_groups").insert({ name, description, createdBy }).select().single();
};
export const addUsersToGroup = (groupId, userId, userIds = []) => {
  return supabase
    .from("user_post_groups")
    .upsert(userIds.map((id) => ({ userId: id, postGroupId: groupId, isAccepted: userId === id })));
};

export const acceptGroupInvitation = (userId, groupId) => {
  return supabase.from("user_post_groups").update({ isAccepted: true }).match({ userId, postGroupId: groupId });
};

export const declineGroupInvitation = (userId, groupId) => {
  return supabase.from("user_post_groups").delete().match({ userId, postGroupId: groupId });
};

export const createPost = (userId, { text, media = [] }) => {
  return supabase.from("posts").insert({ userId, text, media });
};

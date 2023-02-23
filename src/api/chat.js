import { getPagination } from "utils/pagination";
import { supabase } from "../utils/superbase-client";

export const getMessages = (chatGroupId, page = 1) => {
  const { from, to } = getPagination(page, 10);
  return supabase
    .from("chat_messages")
    .select("*, user:users(firstName,id)", { count: "exact" })
    .eq("chatGroupId", chatGroupId)
    .order("createdAt", { ascending: false })
    .range(from, to);
};

export const getMessagesByUserId = (chatGroupId, page = 1) => {
  const { from, to } = getPagination(page, 10);
  return supabase
    .from("chat_messages")
    .select("*, user:users(firstName,id), userGroup: user_group()", { count: "exact" })
    .eq("chatGroupId", chatGroupId)
    .order("createdAt", { ascending: false })
    .range(from, to);
};

export const getChatGroupById = (id) => {
  return supabase
    .from("chat_groups")
    .select("name,id,private, userChatGroups: user_chat_groups(user: users(id, firstName, lastName))")
    .eq("id", id)
    .limit(2, { foreignTable: "userChatGroups" });
};

export const getChatGroups = (userId) => {
  return supabase
    .from("chat_groups")
    .select(
      "name,id,type, user: user_chat_groups(*), userChatGroups: user_chat_groups(user: users(id, firstName, lastName))"
    )
    .eq("user.userId", userId)
    .limit(2, { foreignTable: "userChatGroups" });
};

export const sendMessage = (content, media, userId, chatGroupId) => {
  return supabase.from("chat_messages").insert({
    content,
    media,
    userId,
    chatGroupId,
  });
};

export const subscribeToMessages = (chatGroupId, handleUpdateMessages) => {
  supabase
    .channel("public:chat_messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "chat_messages", filter: `chatGroupId=eq.${chatGroupId}` },
      handleUpdateMessages
    )
    .subscribe();
};
export const unsubscribeToMessages = () => {
  supabase.removeChannel("public:chat_messages");
};

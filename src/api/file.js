import { supabase } from "utils/superbase-client";

export const uploadPostImage = (userId, file) => {
  return supabase.storage.from("users").upload(`${userId}/${file.name}`, file, {
    cacheControl: "3600",
    upsert: true,
  });
};

export const uploadChatImage = (userId, file) => {
  return supabase.storage.from("users").upload(`${userId}/chat/${file.name}`, file, {
    cacheControl: "3600",
    upsert: true,
  });
};

export const uploadUserAvatar = (userId, file) => {
  return supabase.storage.from("users").upload(`${userId}/${file.name}`, file, {
    cacheControl: "3600",
    upsert: true,
  });
};

export const deleteUserAvatar = (file) => {
  return supabase.storage.from("users").remove(file);
};

export const deleteGroupCover = (file) => {
  return supabase.storage.from("groups").remove(file);
};

export const uploadGroupCover = (groupId, file) => {
  console.log(`${groupId}/${file.name}`);
  return supabase.storage.from("groups").upload(`${groupId}/${file.name}`, file, {
    cacheControl: "3600",
    upsert: true,
  });
};

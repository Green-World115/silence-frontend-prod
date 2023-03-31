import { supabase } from "utils/superbase-client";

export const uploadPostImage = (userId, file) => {
  return supabase.storage.from("users").upload(`${userId}/${file.name}`, file, {
    cacheControl: "3600",
    upsert: true,
  });
};

import { supabase } from "utils/superbase-client";

export const getLiveStreams = () => {
  return supabase
    .from("live_streams")
    .select("id, title, description, dateTime, link")
    .order("dateTime", { ascending: false })
    .throwOnError();
};

export const addLiveStream = ({ title, description, link, dateTime }) => {
  return supabase
    .from("live_streams")
    .insert({
      title,
      description,
      link,
      dateTime,
    })
    .throwOnError();
};
export const deleteLiveStream = (id) => {
  return supabase.from("live_streams").delete().eq("id", id).throwOnError();
};

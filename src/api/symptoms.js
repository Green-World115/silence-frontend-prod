import { supabase } from "../utils/superbase-client";

export const getSymptoms = () => {
  return supabase.from("symptoms").select("name, id, type");
};

export const updateUserSymptoms = (symptom) => {
  return supabase.from("user_symptoms").upsert(symptom).select();
};
export const getUserSymptoms = (userId) => {
  return supabase
    .from("user_symptoms")
    .select("id, userId, value, symptom: symptoms(id, name), causes")
    .eq("userId", userId);
};

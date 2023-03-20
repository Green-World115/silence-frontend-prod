import { supabase } from "../utils/superbase-client";

export const updateUserBasicInfo = async (userId, { firstName, lastName, age, location, hideLocationAge }) => {
  return await supabase
    .from("users")
    .update({
      firstName,
      lastName,
      age,
      location,
      hideLocationAge,
    })
    .eq("id", userId);
};

export const getUserByEmail = async (email) => {
  return await supabase.from("users").select("*").eq("email", email).limit(1).single();
};

export const getUserById = async (userId) => {
  return await supabase
    .from("users")
    .select("id,email, firstName, lastName,age, location, hideLocationAge, isAccountComplete")
    .eq("id", userId)
    .limit(1)
    .single();
};

export const searchUsersBySymptomsAndCauses = async (searchText = "", symptoms, causes) => {
  return await supabase.rpc("search_users_by_symptoms_or_causes", {
    search_text: searchText,
    v_symptoms: symptoms,
    v_causes: causes,
  });
};

export const confirmUser = async (userId) => {
  return await supabase
    .from("users")
    .update({
      isAccountComplete: true,
    })
    .eq("id", userId);
};

export const searchUserByName = (searchText) => {
  return supabase
    .from("users")
    .select("id, firstName, lastName")
    .or(`firstName.ilike.%${searchText}%,lastName.ilike.%${searchText}%`);
};

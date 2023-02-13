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

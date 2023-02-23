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

export const getUsersBySymptomsAndCauses = async (symptoms, causes) => {
  return await supabase
    .from("users")
    .select("id, firstName, lastName, user_symptoms!inner(*)")
    .or("value->left.gt.0, value->right.gt.0, value->value.gt.0, value->value.eq.true", {
      foreignTable: "user_symptoms",
    })
    .or(`symptomId.in.(${symptoms.join(",")}),causes.ov.{${causes.join(",")}}`, { foreignTable: "user_symptoms" });
};

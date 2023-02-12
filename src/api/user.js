import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { supabase } from "../utils/superbase-client";

export const updateUserAvatar = (userId, url) => {
  return updateDoc(doc(db, "users", userId), {
    avatar: url,
  });
};
export const getUser = (userId) => {
  return getDoc(doc(db, "users", userId));
};

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

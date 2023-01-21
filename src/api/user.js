import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateUserAvatar = (userId, url) => {
  return updateDoc(doc(db, "users", userId), {
    avatar: url,
  });
};
export const getUser = (userId) => {
  return getDoc(doc(db, "users", userId));
};

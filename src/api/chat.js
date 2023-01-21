import { query, collection, where, getDocs, setDoc, doc, serverTimestamp, addDoc, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export const getGroupsByUser = (userId) => {
  const groupsRef = collection(db, "groups");
  const q = query(groupsRef, where("userIds", "array-contains", userId));
  return getDocs(q);
};

export const getPostsByGroup = (groupId) => {
  const postsRef = collection(db, "groups", groupId, "posts");
  const q = query(postsRef, orderBy("updatedAt", "desc"));
  return getDocs(q);
};

export const getCommentsByPost = (groupId, postId) => {
  const commentRefRef = collection(db, "groups", groupId, "posts", postId, "comments");
  const q = query(commentRefRef, orderBy("updatedAt", "desc"));
  return getDocs(q);
};

export const addPost = (text, media = [], userId, userName, groupId) => {
  const groupRef = doc(db, "groups", groupId);
  const postRef = collection(groupRef, "posts");
  return addDoc(postRef, {
    text,
    media,
    userId,
    groupId,
    userName,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
export const addComment = (text, userId, userName, groupId, postId) => {
  const postRef = doc(db, "groups", groupId, "posts", postId);
  const commentRef = collection(postRef, "comments");
  return addDoc(commentRef, {
    text,
    userId,
    userName,
    groupId,
    postId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

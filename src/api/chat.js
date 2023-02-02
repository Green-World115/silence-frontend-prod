import { query, collection, where, getDocs, setDoc, doc, serverTimestamp, addDoc, orderBy } from "firebase/firestore";
import { getPagination } from "utils/pagination";
import { db } from "../firebase";
import { supabase } from "../utils/superbase-client";

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
  const q = query(commentRefRef, orderBy("updatedAt", "asc"));
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

export const getMessages = (conversationId, page = 1) => {
  const { from, to } = getPagination(page, 10);
  return supabase
    .from("messages")
    .select("*, user:userId(firstName,id)", { count: "exact" })
    .eq("conversationId", conversationId)
    .order("createdAt", { ascending: false })
    .range(from, to);
};

export const getUserConversations = (userId) => {
  return supabase
    .from("user_conversations")
    .select("conversation: conversationId(*, user1: user1Id(*)), messages(*)")
    .eq("userId", userId);
};
export const sendMessage = (content, media, userId, conversationId) => {
  return supabase.from("messages").insert({
    content,
    media,
    userId,
    conversationId,
  });
};

export const subscribeToMessages = (conversationId, handleUpdateMessages) => {
  supabase
    .channel("public:messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages", filter: `conversationId=eq.${conversationId}` },
      handleUpdateMessages
    )
    .subscribe();
};
export const unsubscribeToMessages = () => {
  supabase.removeChannel("public:messages");
};

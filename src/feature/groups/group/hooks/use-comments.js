import { useQuery } from "@tanstack/react-query";
import * as postApi from "api/post";

const formatComments = (data) => {
  let formatted = {};
  data.forEach((item) => {
    console.log(item);
    const id = item.parentCommentId || item.id;
    if (formatted[id]) {
      if (item.parentCommentId) {
        formatted[id].replies.push(item);
      } else {
        formatted[id] = { ...formatted[id], ...item };
      }
    } else {
      if (item.parentCommentId) {
        formatted[id] = {
          replies: [item],
        };
      } else {
        formatted[id] = { ...item, replies: [] };
      }
    }
  });

  return formatted;
};

export const useComments = (postId, showComments) => {
  const comments = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => postApi.getCommentsByPost(postId),
    select: (data) => formatComments(data.data),
    enabled: !!showComments,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  console.log(comments.data);

  return comments;
};

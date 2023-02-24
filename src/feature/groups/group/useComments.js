import { useQuery } from "@tanstack/react-query";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import * as postApi from "api/post";

export const useComments = (postId, showComments) => {
  const comments = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => postApi.getCommentsByPost(postId),
    select: (data) =>
      data.data.map((comment) => ({ ...comment, time: formatDistanceToNow(new Date(comment.createdAt)) })),
    enabled: !!showComments,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return comments;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as postApi from "api/post";

export const useComment = (postId) => {
  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: postApi.addComment,
    onError: (e) => console.log(e),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  return commentMutation;
};

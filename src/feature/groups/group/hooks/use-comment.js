import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "services/api-client";

export const useComment = async (postId) => {
  const queryClient = useQueryClient();
  
  // const mentions = data.content.root.children[0].children.filter((item) => item.type === "mention");
  // if (mentions.length > 0) {
  //   const mentionIds = mentions.map((mention) => mention.mention.id);
  //   await notificationApi.sendCommentNotification(user.id, mentionIds);
  // }

  const commentMutation = useMutation({
    mutationFn: async (data) => apiClient.post("/comments", data),

    onError: (e) => console.log(e),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  return commentMutation;
};

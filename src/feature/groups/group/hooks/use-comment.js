import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "services/api-client";

export const useComment = (postId) => {
  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: async (data) => apiClient.post("/comments", data),

    // const mentions = data.content.root.children[0].children.filter((item) => item.type === "mention");
    // if (mentions.length > 0) {
    //   const mentionIds = mentions.map((mention) => mention.mention.id);
    //   await notificationApi.sendCommentNotification(user.id, mentionIds);
    // }

    onError: (e) => console.log(e),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  return commentMutation;
};

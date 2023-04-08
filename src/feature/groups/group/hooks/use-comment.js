import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as postApi from "api/post";
import * as notificationApi from "api/notification";
import { useUser } from "feature/auth/context";

export const useComment = (postId) => {
  const queryClient = useQueryClient();
  const user = useUser();

  const commentMutation = useMutation({
    mutationFn: async (data) => {
      await postApi.addComment({ userId: data.userId, postId: data.postId, content: JSON.stringify(data.content) });
      const mentions = data.content.root.children[0].children.filter((item) => item.type === "mention");
      if (mentions.length > 0) {
        const mentionIds = mentions.map((mention) => mention.mention.id);
        await notificationApi.sendCommentNotification(user.id, mentionIds);
      }
    },
    onError: (e) => console.log(e),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  return commentMutation;
};

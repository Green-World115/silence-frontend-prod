import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "services/api-client";

export const useDeleteComment = (id, postId) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => apiClient.delete(`/comment/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["comments", postId]),
  });
  return deleteMutation;
};

export const useDeletePost = (id, groupId) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => apiClient.delete(`/post/${id}`),
    // optimize this by deleting local data instead of refetching again
    onSuccess: () => queryClient.invalidateQueries(["posts", groupId.toString()]),
  });

  return deleteMutation;
};

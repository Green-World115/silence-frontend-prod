import { useMutation } from "@tanstack/react-query";
import * as fileApi from "api/file";
import * as postApi from "api/post";
import { useSnackbar } from "notistack";

export const useUpdateCover = (groupId, currentCover) => {
  const { enqueueSnackbar } = useSnackbar();

  const updateCoverMutation = useMutation({
    mutationFn: async (data) => {
      const { data: response, error } = await fileApi.uploadGroupCover(groupId, data);
      if (error) throw error;
      console.log('group id: ', groupId);
      console.log('data: ', data);
      console.log('current cover: ', currentCover);
      console.log('response path: ', response.path);
      await postApi.updateGroup(groupId, { cover: response.path });
      if (currentCover) {
        await fileApi.deleteGroupCover(currentCover);
      }
    },
    onSuccess: () => enqueueSnackbar("Update success", { variant: "success" }),
    onError: () => enqueueSnackbar("Update failed", { variant: "error" }),
  });

  return updateCoverMutation;
};

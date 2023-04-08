import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as liveStreamApi from "api/live-stream";
import { useSnackbar } from "notistack";

export const useLiveStreams = () => {
  const liveStreamsQuery = useQuery({
    queryKey: ["live-streams"],
    queryFn: liveStreamApi.getLiveStreams,
    select: (data) => data.data,
  });
  return liveStreamsQuery;
};

export const useDeleteLiveStreams = (id) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const deleteLiveStreamMutation = useMutation({
    mutationFn: () => liveStreamApi.deleteLiveStream(id),
    onSuccess: () => {
      enqueueSnackbar("Live stream removed", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["live-streams"] });
    },
    onError: () => {
      enqueueSnackbar("Failed to delete live stream", { variant: "error" });
    },
  });

  return deleteLiveStreamMutation;
};

export const useAddLiveStream = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const addLiveStreamMutation = useMutation({
    mutationFn: liveStreamApi.addLiveStream,
    onSuccess: () => {
      enqueueSnackbar("Live stream added", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["live-streams"] });
    },
    onError: () => {
      enqueueSnackbar("Failed to add live stream", { variant: "error" });
    },
  });

  return addLiveStreamMutation;
};

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as postApi from "api/post";

export const useGroup = () => {
  const router = useRouter();
  const { id: groupId } = router.query;

  const group = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => postApi.getGroupById(groupId),
    select: (data) => data.data,
  });

  return group;
};

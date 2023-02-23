import { useEffect, useState } from "react";
import * as postApi from "api/post";
import { useUser } from "feature/auth/context";

export const useGroupList = () => {
  const [groups, setGroups] = useState([]);
  const user = useUser();

  const handleJoin = async (groupId) => {
    const { data, error } = await postApi.acceptGroupInvitation(user.id, groupId);

    if (!error) {
      setGroups(groups.map((group) => (group.id === groupId ? { ...group, isAccepted: true } : group)));
    }
  };

  const handleDecline = async (groupId) => {
    const { data, error } = await postApi.declineGroupInvitation(user.id, groupId);
    if (!error) {
      setGroups(groups.filter((group) => group.id !== groupId));
    }
  };

  useEffect(() => {
    const get = async () => {
      const { data } = await postApi.getGroupsByUserId(user?.id);
      setGroups(
        data.map((item) => ({
          name: item.name,
          id: item.id,
          isAccepted: item?.userPostGroup[0]?.isAccepted,
        }))
      );
    };

    get();
  }, []);

  return { groups, handleJoin, handleDecline };
};

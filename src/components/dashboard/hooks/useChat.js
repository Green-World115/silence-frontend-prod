import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups, getPosts } from "../../../redux/slices/chat";

export const useGroupList = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((store) => store.chat.groups);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  return { data, loading };
};

export const usePosts = (groupId) => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((store) => store.chat.posts);

  useEffect(() => {
    if (groupId) dispatch(getPosts(groupId));
  }, [groupId, dispatch]);

  return { data, loading };
};

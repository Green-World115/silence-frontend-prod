import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as postApi from "api/post";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export const usePosts = () => {
  const router = useRouter();
  const { id: groupId } = router.query;

  const post = useInfiniteQuery({
    queryKey: ["posts", groupId],
    queryFn: ({ pageParam }) => postApi.getPostsByGroup(groupId, pageParam),
    select: (data) => ({
      pages: data.pages.map((item) => ({
        posts: item.data.map((post) => ({
          ...post,
          commentCount: post.comments[0].count,
          time: formatDistanceToNow(new Date(post.createdAt)),
        })),
      })),
    }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return post;
};

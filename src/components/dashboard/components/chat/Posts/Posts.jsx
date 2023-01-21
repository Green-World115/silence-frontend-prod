import React from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../../../hooks/useChat";
import Post from "./Post/Post";

const Posts = () => {
  let { id } = useParams();
  const { data } = usePosts(id);

  return (
    <div>
      {data.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          user={post.userName}
          time={post.time}
          text={post.text}
          groupId={id}
          comments={post.comments}
          commentsLoading={post.commentsLoading}
        />
      ))}
    </div>
  );
};

export default Posts;

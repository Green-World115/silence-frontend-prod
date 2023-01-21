import React from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../../../hooks/useChat";
import Post from "./Post/Post";
import styles from "./posts.module.scss";
import PostSkelton from "./PostSkelton";

const Posts = () => {
  let { id } = useParams();
  const { data, loading } = usePosts(id);

  return (
    <div className={styles.container}>
      {data.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.userName}
          time={post.time}
          text={post.text}
          groupId={id}
          comments={post.comments}
          commentsLoading={post.commentsLoading}
        />
      ))}

      {loading && (
        <>
          {[...Array(4)].map((_, key) => (
            <PostSkelton key={key} />
          ))}
        </>
      )}
    </div>
  );
};

export default Posts;

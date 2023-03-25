import { Box, Grid, Stack } from "@mui/material";
import Button from "components/Button";
import React from "react";
import NewPost from "./new-post";
import Post from "./Post";
import { usePosts } from "./use-post-action";

const Posts = () => {
  const posts = usePosts();
  const handleNextPage = () => {
    posts.fetchNextPage();
  };

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <NewPost />
        <Stack spacing={3}>
          {posts?.data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.posts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  groupId={post.postGroupId}
                  userId={post.user.id}
                  firstName={post.user.firstName}
                  lastName={post.user.lastName}
                  image={post.user.image}
                  text={post.text}
                  commentCount={post.commentCount}
                  time={post.time}
                />
              ))}
            </React.Fragment>
          ))}
          <Box display="flex" py={2} justifyContent="center">
            {posts.hasNextPage && (
              <Button variant="text" onClick={handleNextPage} loading={posts.isFetchingNextPage}>
                Load more
              </Button>
            )}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Posts;

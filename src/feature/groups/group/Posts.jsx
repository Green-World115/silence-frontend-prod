import { Card, Grid, Stack } from "@mui/material";
import React from "react";
import NewPost from "./NewPost";
import Post from "./Post";

const Posts = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <NewPost />
        <Stack spacing={3}>
          <Post />
          <Post />
          <Post />
          <Post />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Posts;

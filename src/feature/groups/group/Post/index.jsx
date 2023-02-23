import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import React from "react";
import Comment from "../Comment";
import NewComment from "../NewComment";

const Post = () => {
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<CustomAvatar name="test name" />}
        title={
          <Typography color="inherit" variant="subtitle2">
            Minimal UI
          </Typography>
        }
        subheader={
          <Typography variant="caption" component="div" sx={{ color: "text.secondary" }}>
            21 Feb 2023
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Typography>
      </CardContent>
      <CardContent>
        <Stack mb={4} spacing={2}>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </Stack>
        <NewComment />
      </CardContent>
    </Card>
  );
};

export default Post;

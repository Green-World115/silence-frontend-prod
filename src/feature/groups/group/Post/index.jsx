import React from "react";
import { Box, Card, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import Comments from "../Comments";
import NewComment from "../NewComment";

const Post = ({ id, firstName, lastName, text, image, commentCount, time }) => {
  const name = `${firstName} ${lastName}`;

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<CustomAvatar name={name} src={image} />}
        title={
          <Typography color="inherit" variant="subtitle2">
            {name}
          </Typography>
        }
        subheader={
          <Typography variant="caption" component="div" sx={{ color: "text.secondary" }}>
            {time} ago
          </Typography>
        }
      />
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="body1">{text}</Typography>
          <Divider />
          <Comments postId={id} commentCount={commentCount} />
          <NewComment postId={id} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Post;

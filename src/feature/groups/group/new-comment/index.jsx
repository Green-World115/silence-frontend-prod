import { Stack } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import React from "react";
import { useUser } from "feature/auth/context";

import { useComment } from "../hooks/use-comment";
import { useResponsive } from "hooks/useResponsive";
import CommentInput from "../comment-input";
import config from "@config/index";

const NewComment = ({ postId, parentCommentId, placeholder, sx }) => {
  const user = useUser();

  const { mobile } = useResponsive();
  const commentMutation = useComment(postId);

  const handleSubmit = (editorState) => {
    commentMutation.mutate({ userId: user.id, parentCommentId, postId, content: editorState.toJSON() });
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={sx}>
      {!mobile && (
        <CustomAvatar
          sx={{ height: 32, width: 32 }}
          name={user.firstName}
          src={user.avatar && `${config.avatarBaseUrl}${user.avatar}`}
        />
      )}
      <CommentInput onSubmit={handleSubmit} placeholder={placeholder} />
    </Stack>
  );
};

export default NewComment;

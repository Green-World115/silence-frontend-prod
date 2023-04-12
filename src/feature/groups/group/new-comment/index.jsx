import { Stack } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import React from "react";
import { useUser } from "feature/auth/context";

import { useComment } from "../hooks/use-comment";
import imageUrls from "constants/image-urls";
import { useResponsive } from "hooks/useResponsive";
import CommentInput from "../comment-input";

const NewComment = ({ postId, parentCommentId, placeholder }) => {
  const user = useUser();

  const { mobile } = useResponsive();
  const commentMutation = useComment(postId);

  const handleSubmit = (editorState) => {
    commentMutation.mutate({ userId: user.id, parentCommentId, postId, content: editorState.toJSON() });
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {!mobile && (
        <CustomAvatar
          sx={{ height: 32, width: 32 }}
          name={user.firstName}
          src={user.avatar && `${imageUrls.AVATAR_BASE_URL}/${user.avatar}`}
        />
      )}

      <>
        <CommentInput onSubmit={handleSubmit} placeholder={placeholder} />
      </>
    </Stack>
  );
};

export default NewComment;

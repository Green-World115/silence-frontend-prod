import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { CustomAvatar } from "components/custom-avatar";
import { Content } from "./styled";
import Button from "components/Button";
import { useComments } from "../useComments";

export const Comments = ({ postId, commentCount }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComment = () => setShowComments(!showComments);

  const comments = useComments(postId, showComments);

  return (
    <div>
      <Button
        variant="text"
        color="primary"
        onClick={toggleComment}
        endIcon={showComments ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        Comments {commentCount ? `(${commentCount})` : ""}
      </Button>
      {showComments && (
        <Stack spacing={2} sx={{ mt: 3 }}>
          {comments?.data?.map((comment) => (
            <Stack direction="row" spacing={2}>
              <CustomAvatar name={`${comment.user.firstName} ${comment.user.lastName}`} />
              <Box width="100%">
                <Content>
                  <Typography variant="subtitle2">{`${comment.user.firstName} ${comment.user.lastName}`}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {comment.text}
                  </Typography>
                </Content>
                <Typography variant="caption" color="text.secondary" display="">
                  {comment.time} ago
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      )}
    </div>
  );
};
export default Comments;

import React, { useState } from "react";
import { Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "components/Button";
import { useComments } from "../use-comments";
import Comment from "./Comment";

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
            <Comment
              key={comment.id}
              id={comment.id}
              userId={comment.user.id}
              postId={postId}
              name={`${comment.user.firstName} ${comment.user.lastName}`}
              avatar={comment.user.avatar}
              text={comment.text}
              time={comment.time}
              content={comment.content}
            />
          ))}
        </Stack>
      )}
    </div>
  );
};
export default Comments;

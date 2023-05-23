import { Box, Collapse, Link, Stack } from "@mui/material";
import Button from "components/Button";
import CommentInput from "components/comment-input";
import useToggle from "hooks/useToggle";
import React from "react";
import NewComment from "./NewComment";
import { useComments } from "../hooks/use-comment";
import Comment from "./Comment";
import { formatName } from "utils/user";

const Comments = ({ liveStreamId, isCommentingDisabled }) => {
  const [showComments, toggleComments] = useToggle();

  const commentsQuery = useComments(liveStreamId, showComments);

  return (
    <Box>
      <Link onClick={toggleComments} sx={{ cursor: "pointer", py: 2 }}>
        Post A Question Prior To The Live Stream
      </Link>
      <Collapse in={showComments}>
        <Stack spacing={1} sx={{ py: 2 }}>
          {commentsQuery.data?.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              user={comment.user}
              createdAt={comment.createdAt}
              content={comment.content}
            />
          ))}
        </Stack>
        {!isCommentingDisabled && <NewComment liveStreamId={liveStreamId} />}{" "}
      </Collapse>
    </Box>
  );
};

export default Comments;

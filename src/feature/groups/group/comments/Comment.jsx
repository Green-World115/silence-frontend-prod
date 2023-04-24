import React, { useState } from "react";
import { Box, IconButton, Link, MenuItem, Stack, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import MenuPopover from "components/menu-popover";
import ConfirmDialog from "components/confirm-dialog";
import Button from "components/Button";
import { CommentInfo, Content, StyledContentEditable } from "./styled";
import MoreVert from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { AutoLinkNode } from "@lexical/link";

import useToggle from "hooks/useToggle";
import { useUser } from "feature/auth/context";
import roles from "constants/roles";
import { useDeleteComment } from "../hooks/use-group-action";
import { MentionNode } from "components/lexical/mentions-plugin/MentionNode";
import NewComment from "../new-comment";
import { formatToNow } from "utils/date-formatter";
import config from "@config/index";

export const Comment = ({ id, userId, postId, name, text, content, createdAt, replies, avatar, level }) => {
  const [openPopover, setOpenPopover] = useState(null);
  const [showConfirmDelete, toggleConfirmDelete] = useToggle(false);
  const [showReply, toggleShowReply] = useToggle(false);

  const user = useUser();

  const canDelete = user.role === roles.ADMIN || user.id === userId;

  const handleClosePopover = () => setOpenPopover(null);
  const handleOpenPopover = (event) => setOpenPopover(event.currentTarget);

  const deleteMutation = useDeleteComment(id, postId);

  const handleConfirmDelete = () => {
    deleteMutation.mutate(null, { onSuccess: () => toggleConfirmDelete() });
  };
  return (
    <Stack direction="row" spacing={1}>
      <CustomAvatar sx={{ height: 32, width: 32 }} name={name} src={avatar && `${config.avatarBaseUrl}${avatar}`} />
      <Box width="100%">
        <Box display="flex" alignItems="center">
          <Content>
            <Typography variant="subtitle2" fontSize={13}>
              {name}
            </Typography>
            {content ? (
              <LexicalComposer
                initialConfig={{ editorState: content, nodes: [MentionNode, AutoLinkNode], editable: false }}
              >
                <Box sx={{ width: "100%" }}>
                  <PlainTextPlugin contentEditable={<StyledContentEditable />} />
                </Box>
              </LexicalComposer>
            ) : (
              <Typography>{text}</Typography>
            )}
          </Content>

          {canDelete && (
            <IconButton onClick={handleOpenPopover} edge="end">
              <MoreVert fontSize="small" />
            </IconButton>
          )}
        </Box>
        <CommentInfo direction="row" spacing={1}>
          {level < 3 && (
            <Link variant="caption" sx={{ cursor: "pointer" }} onClick={toggleShowReply}>
              Reply
            </Link>
          )}
          <Typography variant="caption" color="text.secondary" fontSize={11}>
            {formatToNow(createdAt)}
          </Typography>
        </CommentInfo>

        <Stack spacing={0}>
          {replies?.map((reply) => (
            <Comment
              key={reply.id}
              id={reply.id}
              userId={reply.user.id}
              postId={postId}
              name={`${reply.user.firstName} ${reply.user.lastName}`}
              avatar={reply.user.avatar}
              text={reply.text}
              createdAt={reply.createdAt}
              content={reply.content}
              replies={reply.replies}
              level={level + 1}
            />
          ))}
        </Stack>
        {showReply && (
          <NewComment postId={postId} parentCommentId={id} placeholder={`Reply to ${name}`} sx={{ mb: 2 }} />
        )}
      </Box>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="top-center" sx={{ width: 140 }}>
        <MenuItem
          onClick={() => {
            handleClosePopover();
            toggleConfirmDelete();
          }}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </MenuPopover>
      <ConfirmDialog
        open={showConfirmDelete}
        title="Delete comment"
        content="Are you sure want to delete this comment?"
        action={
          <Button variant="contained" onClick={handleConfirmDelete} loading={deleteMutation.isLoading}>
            Confirm
          </Button>
        }
        onClose={toggleConfirmDelete}
      />
    </Stack>
  );
};
export default Comment;

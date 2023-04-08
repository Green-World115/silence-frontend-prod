import React, { useState } from "react";
import { Box, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import MenuPopover from "components/menu-popover";
import ConfirmDialog from "components/confirm-dialog";
import Button from "components/Button";
import { Content, StyledContentEditable } from "./styled";
import MoreVert from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoLinkNode } from "@lexical/link";

import useToggle from "hooks/useToggle";
import { useUser } from "feature/auth/context";
import roles from "constants/roles";
import { useDeleteComment } from "../hooks/use-group-action";
import { MentionNode } from "components/lexical/mentions-plugin/MentionNode";
import imageUrls from "constants/image-urls";

export const Comment = ({ id, userId, postId, name, text, content, time, avatar }) => {
  const [openPopover, setOpenPopover] = useState(null);
  const [showConfirmDelete, toggleConfirmDelete] = useToggle(false);

  const user = useUser();

  const canDelete = user.role === roles.ADMIN || user.id === userId;

  const handleClosePopover = () => setOpenPopover(null);
  const handleOpenPopover = (event) => setOpenPopover(event.currentTarget);

  const deleteMutation = useDeleteComment(id, postId);

  const handleConfirmDelete = () => {
    deleteMutation.mutate(null, { onSuccess: () => toggleConfirmDelete() });
  };
  return (
    <Stack direction="row" spacing={2}>
      <CustomAvatar name={name} src={avatar && `${imageUrls.AVATAR_BASE_URL}/${avatar}`} />
      <Box>
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
                  <RichTextPlugin contentEditable={<StyledContentEditable />} />

                  {/* <LinkPlugin /> */}
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
        <Typography variant="caption" color="text.secondary" fontSize={11}>
          {time} ago
        </Typography>
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

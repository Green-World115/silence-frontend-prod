import React, { useState } from "react";
import { Card, CardContent, CardHeader, Divider, IconButton, Stack, Typography, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CustomAvatar } from "components/custom-avatar";
import Comments from "../comments";
import NewComment from "../new-comment";
import MenuPopover from "components/menu-popover";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "components/confirm-dialog";
import Button from "components/Button";
import useToggle from "hooks/useToggle";
import { useUser } from "feature/auth/context";
import roles from "constants/roles";
import { useDeletePost } from "../hooks/use-group-action";
import config from "@config/index";
import Image from "next/image";
import UserInfo from "components/user-info";
import { formatName } from "utils/user";
const Post = ({ id, groupId, user, text, commentCount, time, media }) => {
  const [openPopover, setOpenPopover] = useState(null);
  const [showConfirmDelete, toggleConfirmDelete] = useToggle(false);
  const [showUserinfo, setShowUserinfo] = useState(null);

  const currentUser = useUser();

  const canDelete = currentUser.role === roles.ADMIN || currentUser.id === user.id;

  const handleClosePopover = () => setOpenPopover(null);
  const handleOpenPopover = (event) => setOpenPopover(event.currentTarget);
  const handleOpenUserInfo = (event) => setShowUserinfo(event.currentTarget);
  const handleCloseUserInfo = () => setShowUserinfo(null);

  const deleteMutation = useDeletePost(id, groupId);

  const handleConfirmDelete = () => {
    deleteMutation.mutate(null, { onSuccess: () => toggleConfirmDelete() });
  };

  return (
    <Card>
      <UserInfo open={showUserinfo} onClose={handleCloseUserInfo} userId={user.id} />
      <CardHeader
        disableTypography
        avatar={
          <CustomAvatar
            onClick={handleOpenUserInfo}
            role="button"
            sx={{ cursor: "pointer" }}
            name={formatName(user)}
            src={user.avatar && `${config.avatarBaseUrl}${user.avatar}`}
          />
        }
        title={
          <Typography color="inherit" variant="subtitle2">
            {formatName(user)}
          </Typography>
        }
        subheader={
          <Typography variant="caption" component="div" sx={{ color: "text.secondary" }}>
            {time} ago
          </Typography>
        }
        action={
          canDelete && (
            <IconButton onClick={handleOpenPopover}>
              <MoreVertIcon />
            </IconButton>
          )
        }
      />
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="body1">{text}</Typography>

          {media.length > 0 && (
            <Image
              src={`${config.supabaseStorageUrl}/public/users/${media[0]}`}
              width="0"
              height="0"
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt="post-image"
            />
          )}

          <Divider />
          <Comments postId={id} commentCount={commentCount} />
          <NewComment postId={id} />
        </Stack>
      </CardContent>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-bottom" sx={{ width: 140 }}>
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
        title="Delete post"
        content="Are you sure want to delete this post?"
        action={
          <Button variant="contained" onClick={handleConfirmDelete} loading={deleteMutation.isLoading}>
            Confirm
          </Button>
        }
        onClose={toggleConfirmDelete}
      />
    </Card>
  );
};

export default Post;

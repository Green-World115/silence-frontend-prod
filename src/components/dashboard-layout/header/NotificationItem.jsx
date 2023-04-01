import { Box, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import notificationType from "constants/notification-type";
import React from "react";
import { formatToNow } from "utils/date-formatter";

const NotificationItem = ({ notification }) => {
  const { type, read, createdAt, user } = notification;
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
      }}
    >
      <ListItemAvatar>
        <CustomAvatar name={user.firstName} src={user.avatar} />
      </ListItemAvatar>

      <ListItemText
        disableTypography
        primary={formatNotification(type, user)}
        secondary={
          <Typography variant="caption" color="text.secondary">
            {formatToNow(createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default NotificationItem;

const formatNotification = (type, user) => {
  if (type === notificationType.MENTION_IN_COMMENT) {
    return (
      <Typography variant="body2">
        <Typography component="span" variant="body2" fontWeight={600}>
          {user.firstName} {user.lastName}
        </Typography>
        &nbsp;mention you in a comment
      </Typography>
    );
  }
};

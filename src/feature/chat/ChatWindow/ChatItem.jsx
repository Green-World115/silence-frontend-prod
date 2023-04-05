import { Avatar, Stack, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import React from "react";
import { ChatItemContent, ChatItemText, ChatItemContainer } from "./styled";
import imageUrls from "constants/image-urls";

const ChatItem = ({ content, time, avatar, name, guest }) => {
  return (
    <ChatItemContainer guest={guest}>
      {guest && (
        <CustomAvatar
          size="sm"
          name={name}
          alt={name}
          src={avatar && `${imageUrls.AVATAR_BASE_URL}/${avatar}`}
          sx={{ width: 30, height: 30, mr: 2, fontSize: 16 }}
        />
      )}
      <ChatItemContent guest={guest}>
        {/* <Typography variant="caption" mb={1} color="text.secondary">
          {time}
        </Typography> */}
        <ChatItemText guest={guest}>
          <Typography variant="body2">{content}</Typography>
        </ChatItemText>
      </ChatItemContent>
    </ChatItemContainer>
  );
};

export default ChatItem;

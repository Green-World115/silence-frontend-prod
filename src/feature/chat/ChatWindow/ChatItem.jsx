import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import { ChatItemContent, ChatItemText, ChatItemContainer } from "./styled";

const GuestChatItem = ({ text, time, avatar, name, guest }) => {
  return (
    <ChatItemContainer guest={guest}>
      {guest && <Avatar size="sm" alt={name} src="/static/images/avatar/1.jpg" sx={{ width: 30, height: 30, mr: 2 }} />}{" "}
      <ChatItemContent guest={guest}>
        <Typography variant="caption">{time}</Typography>
        <ChatItemText guest={guest}>
          <Typography>{text}</Typography>
        </ChatItemText>
      </ChatItemContent>
    </ChatItemContainer>
  );
};

export default GuestChatItem;

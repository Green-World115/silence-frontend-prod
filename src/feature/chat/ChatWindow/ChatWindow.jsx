import * as React from "react";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import GroupIcon from "@mui/icons-material/Group";
import { ChatContainer, Header } from "./styled";
import ChatItem from "./ChatItem";
import Input from "./Input";
import { useResponsive } from "../../../hooks/useResponsive";

const ChatWindow = () => {
  const { mobile } = useResponsive();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      <Header>
        <Stack direction="row" spacing={2}>
          <Avatar />
          <div>
            <Typography variant="subtitle2">Name</Typography>
            <Typography variant="caption">Name</Typography>
          </div>
        </Stack>
        {mobile && (
          <IconButton>
            <GroupIcon />
          </IconButton>
        )}
      </Header>
      <ChatContainer>
        <ChatItem
          name="Tim"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
          time="8 hours ago"
          guest
        />
        <ChatItem
          name="Tim"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
          time="8 hours ago"
        />
        <ChatItem
          name="Tim"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
          time="8 hours ago"
        />
        <ChatItem
          name="Tim"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
          time="8 hours ago"
          guest
        />
        <ChatItem
          name="Tim"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
          time="8 hours ago"
          guest
        />{" "}
        <ChatItem
          name="Tim"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
          time="8 hours ago"
        />
        <ChatItem
          name="Tim"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
          time="8 hours ago"
          guest
        />
        <ChatItem
          name="Tim"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
          time="8 hours ago"
          guest
        />{" "}
        <ChatItem
          name="Tim"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
          time="8 hours ago"
        />
        <ChatItem
          name="Tim"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
          time="8 hours ago"
          guest
        />
        <ChatItem
          name="Tim"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "
          time="8 hours ago"
          guest
        />
      </ChatContainer>

      <Input></Input>
    </Box>
  );
};

export default ChatWindow;

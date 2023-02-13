import * as React from "react";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import GroupIcon from "@mui/icons-material/Group";
import { ChatContainer, Header } from "./styled";
import ChatItem from "./ChatItem";
import Input from "./Input";
import { useResponsive } from "../../../hooks/useResponsive";
import { useParams } from "react-router-dom";
import { useMessages } from "../hooks/useMessages";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUser } from "feature/auth/context";

const ChatWindow = () => {
  const { mobile } = useResponsive();
  const { id: chatGroupId } = useParams();
  const user = useUser();

  const { messages, pagination, loadNext } = useMessages(chatGroupId);

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
      <ChatContainer id="chat-container">
        <InfiniteScroll
          scrollableTarget="chat-container"
          next={loadNext}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          inverse={true}
          hasMore={pagination.totalPages > pagination.currentPage}
          scrollThreshold={"20px"}
          dataLength={messages.length}
        >
          {messages?.map((message) => (
            <ChatItem key={message.id} name={message.name} content={message.content} time="8 hours ago" guest />
          ))}
        </InfiniteScroll>
      </ChatContainer>
      <Input chatGroupId={chatGroupId} userId={user.id} />
    </Box>
  );
};

export default ChatWindow;

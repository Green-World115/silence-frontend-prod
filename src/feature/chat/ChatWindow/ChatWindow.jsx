import * as React from "react";
import { Avatar, Divider, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import GroupIcon from "@mui/icons-material/Group";
import { ChatContainer, Header } from "./styled";
import ChatItem from "./ChatItem";
import Input from "./Input";
import { useResponsive } from "../../../hooks/useResponsive";
import { useMessages } from "../hooks/useMessages";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUser } from "feature/auth/context";
import { CustomAvatar } from "components/custom-avatar";
import { useRouter } from "next/router";

const ChatWindow = () => {
  const { mobile } = useResponsive();
  const router = useRouter();
  const { id, type } = router.query;
  const user = useUser();

  const { messages, pagination, loadNext, chatGroup } = useMessages(type, id);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      <Header>
        <Stack direction="row" spacing={2} alignItems="center">
          <CustomAvatar name={chatGroup.data?.name} />
          <Typography variant="subtitle2">{chatGroup.data?.name}</Typography>
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
            <ChatItem
              key={message.id}
              name={message.user?.firstName}
              content={message.content}
              time="8 hours ago"
              guest={message.user?.id !== user.id}
            />
          ))}
        </InfiniteScroll>
      </ChatContainer>
      <Divider />
      <Input chatGroupId={chatGroup.data?.id} userId={user.id} />
    </Box>
  );
};

export default ChatWindow;

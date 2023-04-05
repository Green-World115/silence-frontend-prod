import * as React from "react";
import { Divider, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import GroupIcon from "@mui/icons-material/Group";
import { ChatContainer, EmptyContainer, Header } from "./styled";
import ChatItem from "./ChatItem";
import Input from "./Input";
import { useResponsive } from "../../../hooks/useResponsive";
import { useMessages } from "../hooks/useMessages";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUser } from "feature/auth/context";
import { CustomAvatar } from "components/custom-avatar";
import { useRouter } from "next/router";
import HeaderSkeleton from "./Skeleton";
import get from "lodash/get";

const ChatWindow = () => {
  const { mobile } = useResponsive();
  const router = useRouter();

  const type = get(router, "query.query[0]");
  const id = get(router, "query.query[1]");

  const user = useUser();

  const { messages, pagination, loadNext, chatGroup } = useMessages(type, id);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      {!id && (
        <EmptyContainer>
          <Typography variant="h5" color="text.secondary">
            Select a chat to continue
          </Typography>
        </EmptyContainer>
      )}

      {id && (
        <>
          <Header>
            {chatGroup.isLoading ? (
              <HeaderSkeleton />
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                <CustomAvatar
                  name={chatGroup.data?.name}
                  src={chatGroup.data?.avatar && `${imageUrls.AVATAR_BASE_URL}/${chatGroup.data?.avatar}`}
                />
                <Typography variant="subtitle2">{chatGroup.data?.name}</Typography>
              </Stack>
            )}
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
                  avatar={message.user?.avatar}
                  content={message.content}
                  time="8 hours ago"
                  guest={message.user?.id !== user.id}
                />
              ))}
            </InfiniteScroll>
          </ChatContainer>
          <Divider />
          <Input chatGroupId={chatGroup.data?.id} userId={user.id} />
        </>
      )}
    </Box>
  );
};

export default ChatWindow;

import ChatProvider from "feature/chat/context";
import React from "react";
import DashboardLayout from "components/DashboardLayout";
import Chat from "feature/chat";

const ChatPage = () => {
  return (
    <DashboardLayout>
      <ChatProvider>
        <Chat />
      </ChatProvider>
    </DashboardLayout>
  );
};

export default ChatPage;

import ChatProvider from "feature/chat/context";
import React from "react";
import DashboardLayout from "components/DashboardLayout";
import Chat from "feature/chat";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

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

export const getServerSideProps = dashboardGetServerSideProps;

import ChatProvider from "feature/chat/context";
import React from "react";
import DashboardLayout from "components/dashboard-layout";
import Chat from "feature/chat";
import { dashboardGetServerSideProps } from "utils/getServerSideProps";

const ChatPage = () => {
  return (
    <ChatProvider>
      <Chat />
    </ChatProvider>
  );
};

export default ChatPage;

ChatPage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout maxWidth="xl" title="Chat">
      {page}
    </DashboardLayout>
  );
};

export const getServerSideProps = dashboardGetServerSideProps;

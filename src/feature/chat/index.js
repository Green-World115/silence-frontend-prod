import { Paper, Box, Typography, Card } from "@mui/material";
import React from "react";
import ChatWindow from "./ChatWindow";
import List from "./List";

const Chat = () => {
  return (
    <>
      <Card sx={{ flex: 1 }}>
        <Box display="flex" sx={{ height: "100%" }}>
          <List />
          <ChatWindow />
        </Box>
      </Card>
    </>
  );
};

export default Chat;

import { Paper, Box } from "@mui/material";
import React from "react";
import ChatWindow from "./ChatWindow";
import List from "./List";

const Chat = () => {
  return (
    <>
      <Paper elevation={10} sx={{ width: "100%" }}>
        <Box display="flex" sx={{ height: "100%" }}>
          <List />
          <ChatWindow />
        </Box>
      </Paper>
    </>
  );
};

export default Chat;

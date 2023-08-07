import React, { useMemo } from "react";
import { Box, Card, useTheme } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

import ChatWindow from "./chat-window";
import List from "./List";

const Chat = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const boxFlexDirection = useMemo(() => mobile ? 'column' : 'row')
  return (
    <>
      <Card sx={{ flex: 1, maxHeight: "calc(100vh - 150px)" }}>
        <Box display="flex" sx={{ height: "100%", flexDirection: boxFlexDirection }}>
          <List />
          <ChatWindow />
        </Box>
      </Card>
    </>
  );
};

export default Chat;

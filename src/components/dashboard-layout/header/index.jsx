import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, Box, Stack } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Search, ToolBar } from "./styled";
import { useResponsive } from "../../../hooks/useResponsive";
import { useRouter } from "next/router";
import NotificationsPopover from "./NotificationsPopover";

export default function SearchAppBar() {
  const { tab } = useResponsive();
  const router = useRouter();

  const handleChat = () => router.push("/chat");

  return (
    <AppBar elevation={0} color="inherit" position="relative">
      <ToolBar sx={{ justifyContent: "space-between" }}>
        {tab && (
          <IconButton size="large" edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
        )}

        <Box flexGrow={1} />

        <Stack direction="row" spacing={2}>
          <IconButton onClick={handleChat}>
            <Badge color="primary">
              <ChatBubbleOutlineOutlinedIcon color="primary" />
            </Badge>
          </IconButton>
          <NotificationsPopover />
        </Stack>
      </ToolBar>
    </AppBar>
  );
}

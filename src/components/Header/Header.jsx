import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, Stack } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Search, ToolBar } from "./styled";
import { useResponsive } from "../../hooks/useResponsive";

export default function SearchAppBar() {
  const { tab } = useResponsive();

  return (
    <AppBar elevation={0} color="inherit" position="relative">
      <ToolBar sx={{ justifyContent: "space-between" }}>
        {tab && (
          <IconButton size="large" edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
        )}
        <Search>
          <SearchIcon sx={{ mr: 1 }} />
          <InputBase fullWidth placeholder="Search" />
        </Search>

        <Stack direction="row" spacing={2}>
          <IconButton>
            <Badge badgeContent={2} color="primary">
              <ChatBubbleOutlineOutlinedIcon color="primary" />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={2} color="primary">
              <NotificationsNoneOutlinedIcon color="primary" />
            </Badge>
          </IconButton>
        </Stack>
      </ToolBar>
    </AppBar>
  );
}

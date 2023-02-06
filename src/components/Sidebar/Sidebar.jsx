import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import TextsmsIcon from "@mui/icons-material/Textsms";
import VideocamIcon from "@mui/icons-material/Videocam";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Button from "@mui/material/Button";
import { ListItem } from "./ListItem";

import { Avatar, Typography } from "@mui/material";
import { Container, UserContainer } from "./styled";
import { useAuth } from "feature/auth/context";
const drawerWidth = 240;

const Sidebar = ({ window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { user } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Container>
      <UserContainer>
        <Avatar alt="Remy" />
        <Box ml={2} sx={{ overflow: "hidden", textOverflow: "ellipsis", color: "#ffffff" }}>
          <Typography variant="body2" color="#ffffff">
            User name
          </Typography>
          <Typography variant="caption">{user?.email}</Typography>
        </Box>
      </UserContainer>
      <List disablePadding>
        <ListItem disablePadding title="Home" icon={<HomeIcon />} />
        <ListItem disablePadding title="Meeting room" icon={<TextsmsIcon />} />
        <ListItem disablePadding title="Content" icon={<ContentPasteIcon />} />
        <ListItem disablePadding title="Live streams" icon={<VideocamIcon />} />
        <ListItem disablePadding title="Profile" path="/profile" icon={<AccountBoxIcon />} />
        <ListItem disablePadding title="Settings" icon={<SettingsIcon />} />
      </List>
      <Button variant="contained" size="large" fullWidth>
        Log out
      </Button>
    </Container>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;

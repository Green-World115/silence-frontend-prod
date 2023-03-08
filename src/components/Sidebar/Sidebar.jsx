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
import * as authApi from "api/auth";

import { Avatar, Typography } from "@mui/material";
import { Container, UserContainer } from "./styled";
import { useUser } from "feature/auth/context";
import { useRouter } from "next/router";
import Collapse from "./Collapse";
import { CustomAvatar } from "components/custom-avatar";
const drawerWidth = 240;

const Sidebar = ({ window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const user = useUser();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await authApi.logout();
    router.push("/login");
  };

  const drawer = (
    <Container>
      <Box>
        <UserContainer>
          <CustomAvatar name={user?.firstName} />
          <Box ml={2} sx={{ overflow: "hidden", textOverflow: "ellipsis", color: "#ffffff" }}>
            <Typography variant="body2" color="#ffffff">
              {user?.firstName}
            </Typography>
            <Typography variant="caption">{user?.email}</Typography>
          </Box>
        </UserContainer>
        <List disablePadding>
          <ListItem disablePadding title="Home" icon={<HomeIcon />} path="/" />
          <ListItem disablePadding title="Meeting room" path="/groups" icon={<TextsmsIcon />} />
          <ListItem disablePadding title="Chat" path="/chat" icon={<TextsmsIcon />} />
          {/* <ListItem disablePadding title="Content" icon={<ContentPasteIcon />} /> */}
          {/* <ListItem disablePadding title="Live streams" icon={<VideocamIcon />} /> */}

          <Collapse title="User" icon={<AccountBoxIcon />}>
            <ListItem disablePadding title="Profile" path="/profile" />
            <ListItem disablePadding title="Symptoms" path="/profile/symptoms" />
          </Collapse>

          {/* <ListItem disablePadding title="Settings" icon={<SettingsIcon />} /> */}
        </List>
      </Box>

      <Button variant="contained" color="inherit" fullWidth onClick={handleLogout} sx={{ mt: 10 }}>
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

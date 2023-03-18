import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { StyledListItem } from "./styled";

export const ListItem = ({ title, icon, path }) => {
  const router = useRouter();

  const handleNavigation = () => router.push(path, path, { shallow: true });
  return (
    <StyledListItem disablePadding sx={{ color: "#ffffff" }}>
      <ListItemButton onClick={handleNavigation}>
        <ListItemIcon sx={{ color: "#ffffff" }}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </StyledListItem>
  );
};

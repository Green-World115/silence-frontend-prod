import React from "react";
import MuiListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { StyledListItem } from "./styled";

export const ListItem = ({ title, icon }) => {
  return (
    <StyledListItem disablePadding sx={{ color: "#ffffff" }}>
      <ListItemButton>
        <ListItemIcon sx={{ color: "#ffffff" }}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </StyledListItem>
  );
};

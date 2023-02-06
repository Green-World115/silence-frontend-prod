import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { StyledListItem } from "./styled";
import { useNavigate } from "react-router-dom";

export const ListItem = ({ title, icon, path }) => {
  const navigate = useNavigate();

  const handleNavigation = () => navigate(path);
  return (
    <StyledListItem disablePadding sx={{ color: "#ffffff" }}>
      <ListItemButton onClick={handleNavigation}>
        <ListItemIcon sx={{ color: "#ffffff" }}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </StyledListItem>
  );
};

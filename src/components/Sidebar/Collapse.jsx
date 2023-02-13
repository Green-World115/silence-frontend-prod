import { useState } from "react";
import MuiCollapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { StyledListItem } from "./styled";

export const Collapse = ({ title, icon, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledListItem disablePadding sx={{ color: "#ffffff" }}>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon sx={{ color: "#ffffff" }}>{icon}</ListItemIcon>
          <ListItemText primary={title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </StyledListItem>
      <MuiCollapse in={open} timeout="auto" unmountOnExit>
        {children}
      </MuiCollapse>
    </>
  );
};
export default Collapse;

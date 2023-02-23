import PropTypes from "prop-types";
import { useState } from "react";
import { Box } from "@mui/material";
import Main from "./Main";
import Header from "./header";
import NavVertical from "./nav/NavVertical";

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header onOpenNav={handleOpen} />
      <Box
        sx={{
          display: { lg: "flex" },
          minHeight: { lg: 1 },
        }}
      >
        <NavVertical openNav={open} onCloseNav={handleClose} />
        <Main>{children}</Main>
      </Box>
    </>
  );
}

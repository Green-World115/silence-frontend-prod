import { Paper, Avatar as MuiAvatar } from "@mui/material";
import React from "react";
import { Content } from "./styled";

const Avatar = () => {
  return (
    <Paper elevation={3}>
      <Content>
        <MuiAvatar
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
          sx={{ height: 100, width: 100 }}
        />
      </Content>
    </Paper>
  );
};

export default Avatar;

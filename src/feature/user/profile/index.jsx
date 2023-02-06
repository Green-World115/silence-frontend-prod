import { Grid, Paper } from "@mui/material";
import React from "react";
import Avatar from "./Avatar";
import Info from "./Info";

const Profile = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        <Avatar />
      </Grid>
      <Grid item xs={12} md={9}>
        <Info />
      </Grid>
    </Grid>
  );
};

export default Profile;

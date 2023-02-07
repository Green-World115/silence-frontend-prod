import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import Avatar from "./Avatar";
import Info from "./Info";

const Profile = () => {
  return (
    <div>
      <Typography variant="h5" fontWeight="bold" mb={5}>
        Profile
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Avatar />
        </Grid>
        <Grid item xs={12} md={9}>
          <Info />
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;

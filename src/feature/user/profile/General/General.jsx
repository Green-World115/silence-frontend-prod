import React from "react";
import { Grid } from "@mui/material";
import Info from "./Info";
import { useProfile } from "../hooks/useProfile";
import Avatar from "./Avatar";

const General = () => {
  const { profile, loading } = useProfile();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        <Avatar />
      </Grid>
      <Grid item xs={12} md={9}>
        {!loading && <Info initialValues={profile} />}
      </Grid>
    </Grid>
  );
};

export default General;

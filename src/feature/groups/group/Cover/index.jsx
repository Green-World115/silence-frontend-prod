import { Card, Tab, Tabs } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import Image from "next/image";
import React from "react";
import { CoverContainer, CoverPhoto } from "./styled";

const Cover = () => {
  return (
    <CoverContainer>
      <CustomAvatar
        src="https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1"
        name={"test"}
        sx={{
          width: { xs: 80, md: 128 },
          height: { xs: 80, md: 128 },
          position: "absolute",
        }}
      />
      <CoverPhoto>
        
      </CoverPhoto>
      <Tabs
        value={"posts"}
        
      >
        <Tab value="posts" label="Posts" />
        <Tab value="posts" label="Members" />
      </Tabs>
    </CoverContainer>
  );
};

export default Cover;

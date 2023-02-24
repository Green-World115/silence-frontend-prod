import { Card, Divider, Tab, Tabs } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import React from "react";
import { AvatarContainer, CoverContainer, CoverPhoto } from "./styled";

const Cover = ({ activeTab, onChangeTab }) => {
  return (
    <CoverContainer>
      <AvatarContainer>
        <CustomAvatar
          src="https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1"
          name={"test"}
          sx={{
            width: { xs: 100, md: 120 },
            height: { xs: 100, md: 120 },
          }}
        />
      </AvatarContainer>
      <CoverPhoto></CoverPhoto>
      <Divider />
      <Tabs
        value={activeTab}
        onChange={onChangeTab}
        sx={{
          "& .MuiTabs-flexContainer": {
            pl: 5,
            mt: 10,
            justifyContent: {},
          },
        }}
      >
        <Tab value="posts" label="Posts" />
        <Tab value="members" label="Members" />
      </Tabs>
    </CoverContainer>
  );
};

export default Cover;

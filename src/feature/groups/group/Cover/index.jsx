import { Divider, Tab, Tabs, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import React from "react";
import { AvatarContainer, CoverContainer, CoverPhoto, NameContainer } from "./styled";

const Cover = ({ name, category, avatar, activeTab, onChangeTab }) => {
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
        <NameContainer>
          <Typography variant="h5" fontWeight={600}>
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {category}
          </Typography>
        </NameContainer>
      </AvatarContainer>
      <CoverPhoto></CoverPhoto>
      <Divider />
      <Tabs
        value={activeTab}
        onChange={onChangeTab}
        sx={{
          "& .MuiTabs-flexContainer": {
            pl: 5,
            mt: 12,
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

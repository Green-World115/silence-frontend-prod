import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { UserContainer } from "./styled";
import { CustomAvatar } from "components/custom-avatar";
import config from "@config/index";

const Account = ({ user }) => {
  return (
    <UserContainer>
      <CustomAvatar
        name={user?.firstName}
        src={user?.avatar && `${config.supabaseStorageUrl}/public/users/${user?.avatar}`}
      />
      <Box ml={2} sx={{ overflow: "hidden", textOverflow: "ellipsis", color: "#ffffff" }}>
        <Typography variant="body2" color="#ffffff">
          {user?.firstName}
        </Typography>
        <Typography variant="caption">{user?.email}</Typography>
      </Box>
    </UserContainer>
  );
};

export default Account;

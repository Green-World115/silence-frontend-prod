import React from "react";
import { useMembers } from "../hooks/use-group";
import { Card, Divider, Grid, Stack, Typography } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import imageUrls from "constants/image-urls";
import { formatName } from "utils/user";
import roles from "constants/roles";

const Members = () => {
  const membersQuery = useMembers();
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={2}>
            {membersQuery.data?.map((member) => (
              <Stack direction="row" spacing={2}>
                <CustomAvatar
                  src={member.avatar && `${imageUrls.AVATAR_BASE_URL}/${member.avatar}`}
                  alr="avatar"
                  name={formatName(member)}
                />
                <div>
                  <Typography>{formatName(member)}</Typography>
                  <Typography variant="caption" color="text.secondary" component="div">
                    {member.role === roles.ADMIN ? member.role : member.groupRole}
                  </Typography>
                </div>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Members;

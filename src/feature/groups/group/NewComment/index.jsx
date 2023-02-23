import { IconButton, InputBase, Stack } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import React from "react";

const NewComment = () => {
  return (
    <Stack direction="row" spacing={2}>
      <CustomAvatar name="test" />
      <InputBase
        fullWidth
        placeholder="Write a comment...."
        sx={{
          borderRadius: 1,
          border: (theme) => `solid 1px ${theme.palette.grey[300]}`,
          py: 1,
          px: 2,
        }}
      />
      <IconButton>
        
      </IconButton>
    </Stack>
  );
};

export default NewComment;

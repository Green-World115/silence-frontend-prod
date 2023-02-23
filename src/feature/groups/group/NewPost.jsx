import { alpha, Card, InputBase, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Button from "components/Button";
import React from "react";

const NewPost = () => {
  return (
    <Card sx={{ p: 3, mb: 2 }}>
      <InputBase
        multiline
        fullWidth
        rows={4}
        placeholder="Write a new post...."
        sx={{
          borderRadius: 1,
          border: (theme) => `solid 1px ${theme.palette.grey[300]}`,
          p: 2,
        }}
      />
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button>Post</Button>
      </Box>
    </Card>
  );
};

export default NewPost;

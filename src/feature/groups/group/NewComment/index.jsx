import { Box, IconButton, InputBase, Stack } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as postApi from "api/post";
import { useUser } from "feature/auth/context";

const NewComment = ({ postId }) => {
  const [value, setValue] = useState("");
  const user = useUser();
  const queryClient = useQueryClient();

  const comment = useMutation({
    mutationFn: postApi.addComment,
    onError: (e) => console.log(e),
    onSuccess: () => {
      setValue("");
      queryClient.invalidateQueries(["comments", postId]);
    },
  });
  const handleSubmit = () => comment.mutate({ userId: user.id, postId, text: value });
  const handleChange = (e) => setValue(e.target.value);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <CustomAvatar name="test" />
      <InputBase
        fullWidth
        placeholder="Write a comment...."
        value={value}
        sx={{
          borderRadius: 1,
          border: (theme) => `solid 1px ${theme.palette.grey[300]}`,
          py: 1,
          px: 2,
        }}
        onChange={handleChange}
      />
      <Box sx={{ minWidth: 2 }}>
        <IconButton color="primary" disabled={!value} onClick={handleSubmit}>
          <Icon icon="material-symbols:send" fontSize={30} />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default NewComment;

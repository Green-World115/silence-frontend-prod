import React, { useState } from "react";
import { Card, InputBase } from "@mui/material";
import { Box } from "@mui/system";
import Button from "components/Button";
import { useUser } from "feature/auth/context";
import { useRouter } from "next/router";
import * as postApi from "api/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const NewPost = () => {
  const user = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id: groupId } = router.query;
  const [value, setValue] = useState("");

  const handleChange = (e) => setValue(e.target.value);
  const post = useMutation({
    mutationFn: postApi.createPost,
    onError: (e) => console.log(e),
    onSuccess: () => {
      setValue("");

      queryClient.invalidateQueries(["posts", groupId]);
    },
  });
  const handleSubmit = () => post.mutate({ userId: user.id, groupId, text: value, media: [] });

  const handleEnter = (e) => {
    if (e.key === "Enter" && value.trim()) handleSubmit();
  };

  return (
    <Card sx={{ p: 3, mb: 2 }}>
      <InputBase
        multiline
        fullWidth
        rows={4}
        placeholder="Write a new post...."
        value={value}
        sx={{
          borderRadius: 1,
          border: (theme) => `solid 1px ${theme.palette.grey[300]}`,
          p: 2,
        }}
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button disabled={!value || post.isLoading} onClick={handleSubmit} loading={post.isLoading}>
          Post
        </Button>
      </Box>
    </Card>
  );
};

export default NewPost;

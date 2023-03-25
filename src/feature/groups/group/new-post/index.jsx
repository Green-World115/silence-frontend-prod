import React, { useState } from "react";
import { Card, IconButton, InputBase } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box } from "@mui/system";
import Button from "components/Button";
import { useUser } from "feature/auth/context";
import { useRouter } from "next/router";
import { useCreatePost } from "../use-post-action";
import Upload from "./Upload";
import useToggle from "hooks/useToggle";

const NewPost = () => {
  const user = useUser();
  const router = useRouter();

  const { id: groupId } = router.query;
  const [value, setValue] = useState("");
  const [files, setFiles] = useState([]);
  const [showFiles, toggleFiles] = useToggle(false);

  const createPostMutation = useCreatePost(groupId);

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = () =>
    createPostMutation.mutate({ userId: user.id, groupId, text: value, media: [] }, { onSuccess: () => setValue("") });

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
      {!showFiles && (
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <IconButton onClick={toggleFiles}>
            <AddPhotoAlternateIcon />
          </IconButton>
        </Box>
      )}
      {showFiles && <Upload onChangeFiles={setFiles} files={files} />}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          disabled={!value.trim() || createPostMutation.isLoading}
          onClick={handleSubmit}
          loading={createPostMutation.isLoading}
        >
          Post
        </Button>
      </Box>
    </Card>
  );
};

export default NewPost;

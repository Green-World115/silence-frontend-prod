import { Paper, Avatar as MuiAvatar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Content, UplodContainer } from "./styled";
import { useDropzone } from "react-dropzone";
import config from "@config/index";
import { useUpdateAvatar } from "../hooks/use-profile-action";

const Avatar = ({ avatar }) => {
  const [file, setFile] = useState(null);

  const updateAvatarMutation = useUpdateAvatar(avatar);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxFiles: 1,
    accept: { "image/*": [] },
    onDropAccepted: (acceptedFiles) => {
      const aceeptedFile = acceptedFiles[0];
      Object.assign(aceeptedFile, {
        preview: URL.createObjectURL(aceeptedFile),
      });
      setFile(aceeptedFile);
      updateAvatarMutation.mutate(aceeptedFile);
    },
  });

  const image = file?.preview || `${config.supabaseStorageUrl}/public/users/${avatar}`;

  return (
    <Paper elevation={3}>
      <Content>
        <UplodContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <MuiAvatar src={image} sx={{ height: "100%", width: "100%" }} />
        </UplodContainer>
        {updateAvatarMutation.isLoading && (
          <Typography variant="caption" mt={2}>
            Uploading...
          </Typography>
        )}
      </Content>
    </Paper>
  );
};

export default Avatar;

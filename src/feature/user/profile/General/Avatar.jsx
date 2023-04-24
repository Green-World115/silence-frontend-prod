import { Paper, Avatar as MuiAvatar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Content, UploadContainer } from "./styled";
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
      const acceptedFile = acceptedFiles[0];
      Object.assign(acceptedFile, {
        preview: URL.createObjectURL(acceptedFile),
      });
      setFile(acceptedFile);
      updateAvatarMutation.mutate(acceptedFile);
    },
  });

  const image = file?.preview || `${config.avatarBaseUrl}${avatar}`;

  return (
    <Paper elevation={3}>
      <Content>
        <UploadContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <MuiAvatar src={image} sx={{ height: "100%", width: "100%" }} />
        </UploadContainer>
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

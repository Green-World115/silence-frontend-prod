import { IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Container, ImageContainer, UploadContainer } from "./styled";
import uniqueId from "lodash/uniqueId";

const Upload = ({ files, onChangeFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxFiles: 1,
    accept: { "image/*": [] },
    onDropAccepted: (acceptedFiles) => {
      const addedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: uniqueId(file.name),
        })
      );
      onChangeFiles([...files, ...addedFiles]);
    },
  });

  const handleRemove = (id) => onChangeFiles(files.filter((file) => file.id !== id));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Container spacing={2}>
      {files.length !== 1 && (
        <UploadContainer {...getRootProps()}>
          <AddPhotoAlternateIcon />
          <Typography variant="subtitle1">Add photo</Typography>
          <Typography variant="caption" color="text.secondary">
            or drag and drop
          </Typography>
          <input {...getInputProps()} />
        </UploadContainer>
      )}

      {files.length > 0 && (
        <Stack direction="row" spacing={2}>
          {files.map((file) => (
            <ImageContainer key={file.id}>
              <IconButton
                onClick={() => handleRemove(file.id)}
                size="small"
                sx={{ position: "absolute", top: 0, right: 0, zIndex: 50 }}
              >
                <HighlightOffIcon />
              </IconButton>
              <Image src={file.preview} alt="image" fill style={{ objectFit: "cover" }} />
            </ImageContainer>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Upload;

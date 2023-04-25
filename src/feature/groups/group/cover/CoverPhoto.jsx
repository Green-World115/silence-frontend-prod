import React, { useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { CoverPhotoContainer, EditAvatarButton } from "./styled";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import config from "@config/index";
import { useUpdateCover } from "../hooks/use-cover";

const CoverPhoto = ({ groupId, cover }) => {
  const [file, setFile] = useState(null);

  const updateCoverMutation = useUpdateCover(groupId, cover);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    accept: { "image/*": [] },
    onDropAccepted: (acceptedFiles) => {
      const acceptedFile = acceptedFiles[0];
      Object.assign(acceptedFile, {
        preview: URL.createObjectURL(acceptedFile),
      });
      setFile(acceptedFile);
      updateCoverMutation.mutate(acceptedFile);
    },
  });

  const image = file?.preview || (cover && `${config.groupBaseUrl}${cover}`) || null;

  console.log(image);

  return (
    <CoverPhotoContainer>
      <EditAvatarButton
        disabled={updateCoverMutation.isLoading}
        color="inherit"
        startIcon={<AddAPhotoIcon />}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {updateCoverMutation.isLoading ? "Uploading" : "Edit"}
      </EditAvatarButton>
      {image && <Image src={image} alt="cover" fill style={{ objectFit: "cover" }} />}
    </CoverPhotoContainer>
  );
};

export default CoverPhoto;

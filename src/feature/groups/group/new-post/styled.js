import { Stack, styled } from "@mui/material";
import Image from "next/image";

export const Container = styled(Stack)`
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  border: 1px solid;
  margin-top: ${(props) => props.theme.spacing(2)};
  border-color: ${(props) => `${props.theme.palette.divider}`};
  padding: ${(props) => props.theme.spacing(2)};
`;

export const UploadContainer = styled("div")`
  background-color: ${(props) => props.theme.palette.grey[200]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 100%;
  cursor: pointer;
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};

  &:hover {
    background-color: ${(props) => props.theme.palette.grey[300]};
  }
`;

export const ImageContainer = styled("div")`
  position: relative;
  display: flex;
  height: 300px;
  width: 100%;
  overflow: hidden;
  object-fit: contain;
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  border: 1px solid;
  border-color: ${(props) => `${props.theme.palette.divider}`};
`;

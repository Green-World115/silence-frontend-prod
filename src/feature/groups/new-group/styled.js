import { styled } from "@mui/material";

export const UserContainer = styled("div")`
  background-color: ${(props) => props.theme.palette.grey[100]};
  padding: ${(props) => props.theme.spacing(2, 2, 2, 0)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  max-height: 400px;
  overflow-y: auto;
`;

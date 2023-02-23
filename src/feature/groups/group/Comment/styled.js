import { Card, styled } from "@mui/material";

export const Content = styled("div")`
  background-color: ${(props) => props.theme.palette.grey[200]};
  padding: ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  width: 100%;
`;

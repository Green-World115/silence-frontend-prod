import { Card, IconButton, styled } from "@mui/material";

export const Content = styled("div")`
  background-color: ${(props) => props.theme.palette.grey[200]};
  padding: ${(props) => props.theme.spacing(1, 2)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};

  justify-content: space-between;
  align-items: flex-start;
`;

export const Toggle = styled("div")``;

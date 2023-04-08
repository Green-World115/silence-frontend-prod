import { Card, IconButton, styled } from "@mui/material";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export const Content = styled("div")`
  background-color: ${(props) => props.theme.palette.grey[200]};
  padding: ${(props) => props.theme.spacing(1, 2)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};

  justify-content: space-between;
  align-items: flex-start;
`;

export const Toggle = styled("div")``;

export const StyledContentEditable = styled(ContentEditable)`
  border: none;
  outline: none;
  font-size: 14px;
  color: ${(props) => props.theme.palette.text.secondary};
  padding-top: ${(props) => props.theme.spacing(0.5)};
  p {
    margin: 0;
  }
`;

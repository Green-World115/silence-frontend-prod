import { styled } from "@mui/material";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export const StyledContentEditable = styled(ContentEditable)`
  padding: ${(props) => props.theme.spacing(2, 2)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  border: ${(props) => `solid 1px ${props.theme.palette.grey[300]}`};
  outline: none;
  flex-grow: 2;

  &:focus {
    border: ${(props) => `solid 1px ${props.theme.palette.grey[900]}`};
  }

  p {
    margin: 0;
  }
`;

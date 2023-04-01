import { styled } from "@mui/material";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export const InputContainer = styled("div")`
  /* background-color: gray;
  margin: 20px auto 20px auto;
  border-radius: 2px;
  max-width: 600px;
  position: relative;
  line-height: 20px;
  font-weight: 400;
  text-align: left;
  border-radius: 10px; */
  width: 100%;
`;

export const StyledContentEditable = styled(ContentEditable)`
  padding: ${(props) => props.theme.spacing(2, 2)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  border: ${(props) => `solid 1px ${props.theme.palette.grey[300]}`};
  outline: none;

  &:focus {
    border: ${(props) => `solid 1px ${props.theme.palette.grey[900]}`};
  }

  p {
    margin: 0;
  }
`;

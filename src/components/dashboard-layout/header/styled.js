import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material";

export const ToolBar = styled(Toolbar)``;
export const Search = styled("div")`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1)};
  flex-grow: 1;
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
`;

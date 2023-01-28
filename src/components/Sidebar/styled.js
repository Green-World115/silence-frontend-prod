import { styled, darken } from "@mui/material";
import ListItem from "@mui/material/ListItem";

export const Container = styled("div")`
  padding: 20px;
  background-color: ${(props) => props.theme.palette.primary.main};
  height: 100%;
`;
export const UserContainer = styled("div")`
  padding: ${(props) => props.theme.spacing(2)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  background-color: ${(props) => darken(props.theme.palette.primary.main, 0.2)};
  margin-bottom: 50px;
  display: flex;
`;

export const StyledListItem = styled(ListItem)`
  margin-bottom: 10px;
  align-items: center;
`;

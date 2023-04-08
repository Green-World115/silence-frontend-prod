import { Card, styled } from "@mui/material";

export const CoverContainer = styled(Card)`
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;
export const CoverPhoto = styled("div")`
  background-color: ${(props) => props.theme.palette.grey[400]};
  min-height: 200px;
`;
export const AvatarContainer = styled("div")`
  position: absolute;
  left: ${(props) => props.theme.spacing(5)};
  bottom: ${(props) => props.theme.spacing(8)};
  display: flex;
  align-items: flex-end;
`;
export const NameContainer = styled("div")`
  margin-left: ${(props) => props.theme.spacing(2)};
`;

import { Card, styled } from "@mui/material";

export const CoverContainer = styled(Card)`
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;
export const CoverPhoto = styled("div")`
  background-color: gray;
  width: 100%;
  display: flex;
  flex: 1;
  height: 1;
  flex-grow: 1;
  height: 100%;
  min-height: 200px;
`;

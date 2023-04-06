import { styled } from "@mui/material";

export const Content = styled("div")`
  padding: ${(props) => props.theme.spacing(3, 2, 6)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UplodContainer = styled("div")`
  height: 120px;
  width: 120px;
  border-radius: 60px;
  cursor: pointer;
  padding: 5px;
  border: dashed 1px ${(props) => props.theme.palette.divider};
`;

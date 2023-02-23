import { Card, styled } from "@mui/material";

export const Container = styled(Card)`
  padding: ${(props) => props.theme.spacing(3, 2)};
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

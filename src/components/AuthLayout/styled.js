import { Box, styled } from "@mui/material";

export const Wrapper = styled(Box)`
  background-color: ${(props) => props.theme.palette.primary.main};
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

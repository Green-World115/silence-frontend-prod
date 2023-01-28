import { styled } from "@mui/material";
import MuiToggleButton from "@mui/material/ToggleButton";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const Container = styled("div")`
  display: flex;
  align-items: center;
  border: ${(props) => `1px solid ${props.theme.palette.divider}`};
  padding: ${(props) => props.theme.spacing(0.5, 0.5, 0.5, 2)};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
`;

export const ToggleButton = styled(MuiToggleButton)`
  &.MuiToggleButton-root {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: ${(props) => `1px solid ${props.theme.palette.grey[300]}`}!important;
  }
  &.Mui-selected {
    background-color: ${(props) => props.theme.palette.primary.main};
    color: #ffffff;
  }
`;
export const ToggleButtonGroup = styled(MuiToggleButtonGroup)`
  & .MuiToggleButtonGroup-grouped {
    border: 0;
    margin: ${(props) => props.theme.spacing(0.5)};

    &:not(:first-of-type) {
      border-radius: 5px;
    }

    &:first-of-type {
      border-radius: 5px;
    }
  }
`;

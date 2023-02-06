import { styled } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import { lime } from "@mui/material/colors";

export const PaymentContainer = styled("div")`
  margin-top: ${(props) => props.theme.spacing(5)};
`;

export const Accordion = styled(MuiAccordion)`
  border: ${(props) => `1px solid ${props.theme.palette.divider}`};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  box-shadow: none;
  margin-bottom: ${(props) => props.theme.spacing(2)};

  &:before {
    display: none;
  }
`;

export const SummeryContainer = styled("div")`
  border: ${(props) => `1px solid ${props.theme.palette.divider}`};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  padding: ${(props) => props.theme.spacing(3)};
  margin-top: ${(props) => props.theme.spacing(1)};
`;

export const PlansContainer = styled("div")`
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  padding: ${(props) => props.theme.spacing(2)};
  background-color: ${(props) => props.theme.palette.grey[100]};
`;

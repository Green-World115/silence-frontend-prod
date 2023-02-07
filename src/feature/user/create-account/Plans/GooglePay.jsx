import * as React from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion } from "./styled";

const GooglePay = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>Google Pay</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2">
          Services are subscription-based and will automatically renew until you cancel. See subscription and
          cancellation terms. Payments are charged in USD. Payment provider fees may apply.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default GooglePay;

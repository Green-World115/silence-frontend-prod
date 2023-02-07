import * as React from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import { Accordion } from "./styled";
import TextField from "components/mui-form/TextField";
import Button from "components/Button";

const CardPayment = () => {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Card payment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="First name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Last name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Card number" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Expiration date" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="CVV" />
            </Grid>
            <Grid item xs={12}>
              <Button label="CVV" fullWidth>
                Pay
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CardPayment;

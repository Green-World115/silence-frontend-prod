import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Button from "components/Button";
import Slider from "components/mui-form/Slider";
import React from "react";
import CardPayment from "./CardPayment";
import GooglePay from "./GooglePay";
import OrderSummery from "./OrderSummery";
import { PaymentContainer } from "./styled";
import * as userApi from "api/user";
import { useUser } from "feature/auth/context";
import { useRouter } from "next/router";

const Plans = ({ onBack }) => {
  const user = useUser();
  const router = useRouter();

  const handleSave = async () => {
    await userApi.confirmUser(user.id);
    router.push("/");
  };

  return (
    <>
      <Grid container spacing={12}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <div>
              <Typography variant="subtitle1">Select payment amount</Typography>
              <Typography variant="caption">Payment option can be changed a any time with zero penalties</Typography>
            </div>
            <Slider valueLabelDisplay="auto" min={0} max={193} />
          </Stack>
          <PaymentContainer>
            <Typography variant="subtitle1" mb={1}>
              Select a payment method
            </Typography>
            <CardPayment />
            <GooglePay />
          </PaymentContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <OrderSummery />
        </Grid>
      </Grid>
      <Box display="flex" mt={5} justifyContent="space-between">
        <Button onClick={onBack}>Previous</Button>
        <Button onClick={handleSave}>Save</Button>
      </Box>
    </>
  );
};

export default Plans;

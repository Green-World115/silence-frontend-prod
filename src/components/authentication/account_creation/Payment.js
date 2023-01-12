import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./components/Checkout";
import Plans from "./components/Plans";
// const stripePromise = loadStripe(stripePublishableKey);

const Payment = () => {
  const [clientSecrete, setClientSecrete] = useState(null);
  return (
    <div>
      <Plans />
      {/* <Elements stripe={stripePromise} options={{ clientSecret: clientSecrete }}>
        <Checkout />
      </Elements> */}
    </div>
  );
};

export default Payment;

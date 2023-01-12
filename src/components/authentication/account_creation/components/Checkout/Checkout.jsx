import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

import "rc-slider/assets/index.css";
import styles from "./checkout.module.scss";
const Plans = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {},
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
    }
  };

  return (
    <div>
      <h4 className="h2 mb-4">Checkout</h4>
      <Card>
        <Card.Body>
          <div className={styles.descriptionContainer}>
            <span>
              $32 per month 14 day free trial You get: A private members group with access to suppotive and experienced
              members, allowing you to get to silence faster Access to Liam Boehm Video content available no where else
              on the internet, to get the best and most exclusive steps to silence
            </span>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <PaymentElement />
              <Button disabled={!stripe}>Submit</Button>
            </form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Plans;

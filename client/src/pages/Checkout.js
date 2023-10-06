import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import AddressForm from "../components/AddressForm";

const stripePromise = loadStripe("pk_test_51NXRqNBuKh2FTrpXvl7QJdfEGjYnm4wAY5vak3ZsFzFrI5sQ9L0clXfrgG0g6LLebLCgqM25LP8rrCKTTNX22vyY00xj95ZvLg");

function Checkout( { cart }) {
  const [clientSecret, setClientSecret] = useState("");
 
  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));  
  }, [cart]);

  const appearance = {
    theme: 'night',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Checkout">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <AddressForm />
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Checkout;
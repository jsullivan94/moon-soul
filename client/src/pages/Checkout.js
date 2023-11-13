import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Routes, Route } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";
import AddressForm from "../components/AddressForm";

const stripePromise = loadStripe("pk_test_51NXRqNBuKh2FTrpXvl7QJdfEGjYnm4wAY5vak3ZsFzFrI5sQ9L0clXfrgG0g6LLebLCgqM25LP8rrCKTTNX22vyY00xj95ZvLg");


function Checkout( { cart } ) {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an issue:", error);
        setLoading(false);  // You might also want to set some error state here.
      });
      console.log(clientSecret)
  }, []);
  console.log(clientSecret)

 


  const appearance = {
    theme: 'night',
  };
  const options = {
    clientSecret,
    appearance,
  };
  
  if (loading || !clientSecret.includes('_secret_')) {
    return <div>Loading...</div>;
  }


  return (
    <div className="Checkout">
      <Elements options={options} stripe={stripePromise}>
      <AddressForm />
      <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Checkout;







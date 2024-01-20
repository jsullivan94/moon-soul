import React, { useState, useContext, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ClientSecretContext } from "../pages/Checkout";

function CheckoutForm({ totalPrice, localAddress, cart }) {
  const { clientSecret } = useContext(ClientSecretContext);
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tax, setTax] = useState(0)

useEffect(() => {
  fetch('/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {total_price: totalPrice,
      address: localAddress,
      order_items: cart,
      status: "pending",
      tax: tax})
  })
    .then((res) => res.json())
}, [])
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-complete`,
      }
    });
  
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsLoading(false);
      return;
    }

    const paymentIntentResponse = await stripe.retrievePaymentIntent(clientSecret);
    if (paymentIntentResponse.error) {
      setMessage("Failed to retrieve payment intent status.");
      setIsLoading(false);
      return;
    }
 
    switch (paymentIntentResponse.paymentIntent.status) {
      case "succeeded":
        setMessage("Payment succeeded!");
        break;
      case "processing":
        setMessage("Your payment is processing.");
        break;
      case "requires_payment_method":
        setMessage("Your payment was not successful, please try again.");
        break;
      default:
        setMessage("Something went wrong.");
        break;
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button className="pay-button" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutForm;

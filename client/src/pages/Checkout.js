import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Routes, Route, Outlet  } from "react-router-dom";

import AddressForm from "../components/AddressForm";

const stripePromise = loadStripe("pk_test_51NXRqNBuKh2FTrpXvl7QJdfEGjYnm4wAY5vak3ZsFzFrI5sQ9L0clXfrgG0g6LLebLCgqM25LP8rrCKTTNX22vyY00xj95ZvLg");

function Checkout( { localAddress, setLocalAddress, cart, setTotalPrice } ) {
  const [clientSecret, setClientSecret] = useState("");
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false);

  useEffect(() => {
    if (!isAddressSubmitted || cart.length === 0) {
      return;
    }
    
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cart),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setTotalPrice(data.total_price)
        
        
      } catch (error) {
        console.error("There was an issue:", error)
      }
      
    };

    fetchClientSecret();
  }, [cart, isAddressSubmitted, setTotalPrice]);

  const appearance = {
    theme: 'night',
  };
  const options = { clientSecret, appearance };

  return (
    <div className="Checkout">
      <ClientSecretContext.Provider value={{ clientSecret, setClientSecret }}>
        <Routes>
          <Route index element={<AddressForm setLocalAddress={setLocalAddress} localAddress={localAddress} setIsAddressSubmitted={setIsAddressSubmitted} />} />
        </Routes>
        {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Outlet />
        </Elements>
      )}
      </ClientSecretContext.Provider>
    </div>
  );
}

export const ClientSecretContext = React.createContext();
export default Checkout;







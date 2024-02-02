import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Routes, Route, Outlet  } from "react-router-dom";

import AddressForm from "../components/AddressForm";

function Checkout( { setTax, localAddress, setLocalAddress, cart, setTotalPrice } ) {
  const [clientSecret, setClientSecret] = useState("");
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false);
  const [stripe, setStripe] = useState(null);
  

  useEffect(() => {
    fetch('/config/stripe')
      .then((response) => response.json())
      .then((config) => {
        loadStripe(config.stripePublishableKey).then(setStripe);
      })
      .catch((error) => {
        console.error('Error fetching Stripe config:', error);
      });
      
    if (!isAddressSubmitted || cart.length === 0) {
      return;
    }
    
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ localAddress, cart }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setTotalPrice(data.total_price)
        setTax(data.tax_amount)
        
        
      } catch (error) {
        console.error("There was an issue:", error)
      }
      
    };

    fetchClientSecret();
  }, [cart, isAddressSubmitted, setTotalPrice, setTax, localAddress]);

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
        <Elements options={options} stripe={stripe}>
          <Outlet />
        </Elements>
      )}
      </ClientSecretContext.Provider>
    </div>
  );
}

export const ClientSecretContext = React.createContext();
export default Checkout;







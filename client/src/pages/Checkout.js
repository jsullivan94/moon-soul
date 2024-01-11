import { useState, useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Routes, Route, Outlet  } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


import CheckoutForm from "../components/CheckoutForm";
import AddressForm from "../components/AddressForm";

const stripePromise = loadStripe("pk_test_51NXRqNBuKh2FTrpXvl7QJdfEGjYnm4wAY5vak3ZsFzFrI5sQ9L0clXfrgG0g6LLebLCgqM25LP8rrCKTTNX22vyY00xj95ZvLg");


function Checkout( { cart } ) {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart"); // Redirect if cart is empty
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
      } catch (error) {
        console.error("There was an issue:", error);
        // Handle error state here
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [cart, navigate]);

  const appearance = {
    theme: 'night',
  };
  const options = { clientSecret, appearance };

  if (loading || !clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Checkout">
      <Elements options={options} stripe={stripePromise}>
        <Routes>
          <Route index element={<AddressForm />} />
          <Route path="../payment" element={<CheckoutForm clientSecret={clientSecret} />} />
        </Routes>
        <Outlet />
      </Elements>
    </div>
  );
}

export default Checkout;







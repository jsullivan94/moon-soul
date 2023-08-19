
    import React from 'react';
    import ReactDOM from 'react-dom';
    import {Elements} from '@stripe/react-stripe-js';
    import {loadStripe} from '@stripe/stripe-js';
    
    import AddressForm from '../components/AddressForm';
    
    // Make sure to call `loadStripe` outside of a component’s render to avoid
    // recreating the `Stripe` object on every render.
    const stripe = loadStripe('pk_test_51NXRqNBuKh2FTrpXvl7QJdfEGjYnm4wAY5vak3ZsFzFrI5sQ9L0clXfrgG0g6LLebLCgqM25LP8rrCKTTNX22vyY00xj95ZvLg');
    
    function Address() {
      const options = {
        // Fully customizable with appearance API.
        appearance: {night},
      };
    
      return (
        <Elements stripe={stripe} options={options}>
          <AddressForm />
        </Elements>
      );
    };
    

export default Address;
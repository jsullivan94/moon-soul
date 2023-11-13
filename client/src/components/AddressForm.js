    import { Link, useNavigate } from 'react-router-dom';
    import React, { useState }from 'react';
    import {AddressElement} from '@stripe/react-stripe-js';
    
    const AddressForm = () => {
      const [address, setAddress] = useState(null)
      const navigate = useNavigate();

      function handleSubmit(e) {
        e.preventDefault();




        navigate('/checkout/payment');
      }
      
      return (
        <form onSubmit={handleSubmit} id="address-form">
          <div>
          <h3>Shipping</h3>
          </div>
          <AddressElement 
            options={{
            mode: 'shipping',
            allowedCountries: ['US']
          }}
              />
        </form>
      );
    };
    

export default AddressForm;
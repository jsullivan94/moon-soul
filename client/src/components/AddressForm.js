
    import React from 'react';
    import {AddressElement} from '@stripe/react-stripe-js';
    
    const AddressForm = () => {
      return (
        <form id="address-form">
          <div>
          <h3>Shipping</h3>
          </div>
          <AddressElement options={{
            mode: 'shipping',
            allowedCountries: ['US']
          }}
              />
        </form>
      );
    };
    

export default AddressForm;
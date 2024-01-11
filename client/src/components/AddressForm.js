    import { Link, useNavigate, useLocation } from 'react-router-dom';
    import React, { useState }from 'react';
    
    

const AddressForm = () => {
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US', // Default to US, change as needed
  });
  const navigate = useNavigate();
  const location = useLocation();
console.log("Current location:", location.pathname);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can add validation for the address data
    console.log(address); // For debugging, remove in production
    

    navigate('/checkout/payment');
  };

  return (
    <form onSubmit={handleSubmit} id="address-form">
      <div>
        <h3>Shipping</h3>
      </div>
      <input
        type="text"
        name="line1"
        placeholder="Address Line 1"
        value={address.line1}
        onChange={handleChange}
      />
      <input
        type="text"
        name="line2"
        placeholder="Address Line 2"
        value={address.line2}
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
      />
      <input
        type="text"
        name="postal_code"
        placeholder="Zip Code"
        value={address.postal_code}
        onChange={handleChange}
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={address.country}
        onChange={handleChange}
      />
    <button  type="submit" id="submit"></button>
    </form>
  );
};

export default AddressForm;

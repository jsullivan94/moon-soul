import { useNavigate } from 'react-router-dom';

function AddressForm( { setLocalAddress, setIsAddressSubmitted, localAddress } ) {

  console.log(localAddress)
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setLocalAddress({ ...localAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsAddressSubmitted(true)
    navigate('/checkout/payment');
  };

  return (
    <form onSubmit={handleSubmit} id="address-form">
      <div>
        <h3 className='address-form-title'>Shipping</h3>
      </div>
      <input className='address-form-input'
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={localAddress.full_name}
        onChange={handleChange}
      />
      <input className='address-form-input'
        type="text"
        name="email"
        placeholder="Email"
        value={localAddress.email}
        onChange={handleChange}
      />
      <input className='address-form-input'
        type="text"
        name="line1"
        placeholder="Address Line 1"
        value={localAddress.line1}
        onChange={handleChange}
      />
      <input className='address-form-input'
        type="text"
        name="line2"
        placeholder="Address Line 2"
        value={localAddress.line2}
        onChange={handleChange}
      />
      <input className='address-form-input'
        type="text"
        name="city"
        placeholder="City"
        value={localAddress.city}
        onChange={handleChange}
      />
      <input className='address-form-input'
        type="text"
        name="postal_code"
        placeholder="Zip Code"
        value={localAddress.postal_code}
        onChange={handleChange}
      />
      <input className='address-form-input'
        type="text"
        name="country"
        placeholder="Country"
        value={localAddress.country}
        onChange={handleChange}
      />
    <button  type="submit" id="submit">Submit</button>
    </form>
  );
};

export default AddressForm;

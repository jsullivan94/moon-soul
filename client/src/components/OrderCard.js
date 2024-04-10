function Order({ id, order_date, total_price, tax, status, address_id, address }) {
  const updatedStatus = {
    status: "shipped"
  };

  function handleSubmit(e) {
    e.preventDefault();
   
    const isConfirmed = window.confirm("Are you sure you want to update the status to shipped?");
    
    if (isConfirmed) {
        fetch(`/update_order_status/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedStatus)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }
  
}

  const renderAddressDetails = (address) => {
    return Object.entries(address).map(([key, value], index) => (
      <p key={index}><strong>{key.replace(/_/g, ' ')}:</strong> {value}</p>
    ));
  };

  return (
    <div id="orders">
      <h1>Order ID: {id}</h1>
      <h3>Order Date: {order_date}</h3>
      <h3>Total Price: ${total_price}</h3>
      <h2>Status: {status}</h2>
      <h3>Tax: {tax}</h3>
      <h3>Address ID: {address_id}</h3>
      {address && <div>{renderAddressDetails(address)}</div>}
      <button onClick={handleSubmit}>Update Status to Shipped?</button>
    </div>
  );
}

export default Order;

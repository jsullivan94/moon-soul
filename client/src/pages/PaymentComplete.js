import { useEffect } from 'react';
import Cookies from 'js-cookie';

function PaymentComplete() {

  const id = Cookies.get('order_id');
  const updatedStatus = {
    status: "complete"
  }

  useEffect(() => {
    if (id) {
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
  }, [id]); 
 
  return (
    <div className='complete-container'>
          <h1 className='payment-complete'>Thank you!</h1>
          <a className='payment-complete-home' href="/">home</a>
    </div>
  );
}

export default PaymentComplete;

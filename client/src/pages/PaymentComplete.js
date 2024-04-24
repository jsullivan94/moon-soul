import { useEffect } from 'react';
import Cookies from 'js-cookie';

function PaymentComplete() {

  const id = Cookies.get('order_id');
  const updatedStatus = {
    status: "complete"
  }

  const cartCookie = Cookies.get('cart_id')

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
      .then(data => {
        console.log('Order status updated', data);
      

      fetch(`/delete_cart/${cartCookie}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log(data.message);
        }
      })
      .catch(error => {
          console.error('Error deleting cart:', error);
      });
    })
    .catch(error => {
      console.log('Error updating cart status', error)
    })
   
    } 
  }, [id, cartCookie]); 
 
  return (
    <div className='complete-container'>
          <h1 className='payment-complete'>Thank you!</h1>
          <a className='payment-complete-home' href="/">home</a>
    </div>
  );
}

export default PaymentComplete;

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


function PaymentComplete( { stripePromise } ) {
  // const [messageBody, setMessageBody] = useState('');

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
    } else {
      // Handle missing id (cookie) scenario
    }
  }, [id]); 
 
  // useEffect(() => {
  //   if (!stripePromise) return;
  //   stripePromise.then(async (stripe) => {
  //     const url = new URL(window.location);
  //     const clientSecret = url.searchParams.get('payment_intent_client_secret');
  //     const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
  //     console.log(paymentIntent.id)
  //     setMessageBody(
  //       error ? `> ${error.message}` : (
  //         <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
  //       )
  //     );
  //   });
  // }, [[stripePromise]]);

  return (
    <div className='complete-container'>
          <h1 className='payment-complete'>Thank you!</h1>
          <a className='payment-complete-home' href="/">home</a>
          {/* <div id="messages" role="alert" style={messageBody ? { display: 'block' } : {}}>
            {messageBody}
          </div> */}
    </div>
  );
}

export default PaymentComplete;

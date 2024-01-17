import { useEffect, useState } from 'react';

function PaymentComplete( { stripePromise } ) {
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    if (!stripePromise) return;
    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      
      setMessageBody(
        error ? `> ${error.message}` : (
          <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
        )
      );
    });
  }, [stripePromise]);

  return (
    <div className='complete-container'>
          <h1 className='payment-complete'>Thank you!</h1>
          <a className='payment-complete-home' href="/">home</a>
          <div id="messages" role="alert" style={messageBody ? { display: 'block' } : {}}>
            {messageBody}
          </div>
    </div>
  );
}

export default PaymentComplete;

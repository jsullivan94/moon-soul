import { useState } from "react";

function NewsLetter() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [thankYou, setThankYou] = useState(null)

  function handleChange(event) {
    setEmail(event.target.value);
    setIsEmailValid(true)
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      setThankYou(`Thank you for subscribing with ${email}`);

      fetch('/news_letter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(() => {
          setEmail("");
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error.message);
      });
    }
  }

  return (
    <>
      <h2 className="title">Subscribe to our newsletter!</h2>
      <div>
      {!isEmailValid ? <h3>Please enter a valid email address</h3> : null}
      {thankYou && <h3>{thankYou}</h3>}
      </div>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <input 
          type="email"
          placeholder="Enter your email address here"
          value={email}
          onChange={handleChange}
        />
        <button type="submit">Subscribe</button>
      </form>
      
    </>
  );
}

export default NewsLetter;
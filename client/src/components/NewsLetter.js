import { useState } from "react";


function NewsLetter() {
const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  function handleInput(event) {
    setEmail(event.target.value);
    
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      alert(`Thank you for subscribing with ${email}`);

    //   fetch('/news_letter', {
    //     methhod: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({email: email})
    //   })
      setEmail("");
    }
  }

  return (
    <>
      <h2>Subscribe to our newsletter!</h2>
      {!isEmailValid ? <p>Please enter a valid email address</p> : null}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email address here"
          value={email}
          onChange={handleInput}
        />
        <button
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </>
  );
}




export default NewsLetter;
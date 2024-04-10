import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Home from "../pages/Home";
import Navbar from "./Navbar";
import Store from "../pages/Store";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Footer from "./Footer";
import PaymentComplete from "../pages/PaymentComplete";
import AdminSignIn from "../pages/AdminSignIn";
import Media from "../pages/Media";
import CheckoutForm from "./CheckoutForm";
import PrivacyPolicy from "../pages/PrivacyPolicy";

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([]) 
  const [totalPrice, setTotalPrice] = useState(0); 
  const [tax, setTax] = useState(0);
  const [localAddress, setLocalAddress] = useState({
    full_name: '',
    email: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
  });

  useEffect(() => {
    fetch("/get_cart_items")
        .then(r => r.json())
        .then(data => setCart(data))
        .catch(error => {
            console.error("Error fetching cart items:", error);
        });
}, []);

  useEffect(() => {
      fetch('/products')
      .then(r => r.json())
      .then(r => setProducts(r))
      .catch(error => console.error("Error fetching products:", error));
  }, [])

    return (
      <div className='app' >
          <BrowserRouter>
              <div style={{ flex: 1 }}>
              <Navbar />
                  <Routes>  
                      <Route path="/" element={<Home />} />
                      <Route path="/product/:id" element={<ProductDetails cart={cart} products={products} />} />
                      <Route path="/store" element={<Store products={products} />} />
                      <Route path="/payment-complete" element={<PaymentComplete totalPrice={totalPrice} cart={cart} localAddress={localAddress}/>} />
                      <Route path="/checkout" element={<Checkout setTax={setTax} totalPrice={totalPrice} cart={cart} setLocalAddress={setLocalAddress} localAddress={localAddress} setTotalPrice={setTotalPrice} />} >
                            <Route path="payment" element={<CheckoutForm tax={tax} totalPrice={totalPrice} localAddress={localAddress} cart={cart} />} />
                      </Route>
                      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                      <Route path="/admin" element={<AdminSignIn />} />
                      <Route path="/media" element={<Media />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  </Routes>
              </div>
              <Footer />
          </BrowserRouter>
      </div>
  );
}

export default App;

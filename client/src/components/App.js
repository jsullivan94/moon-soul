import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "../pages/Home";
import Navbar from "./Navbar";
import Store from "../pages/Store";
import About from "../pages/About";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Footer from "./Footer";
import Photos from "../pages/Photos";
import PaymentComplete from "../pages/PaymentComplete";
import AdminSignIn from "../pages/AdminSignIn";
import Media from "../pages/Media";
import CheckoutForm from "./CheckoutForm";
import AddressForm from "./AddressForm";

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([]) 
  
  useEffect(() => {
      fetch('/products')
      .then(r => r.json())
      .then(r => setProducts(r))
      .catch(error => console.error("Error fetching products:", error));
  }, [])

    return (
      <div className='app' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'black' }}>
          <BrowserRouter>
              <Navbar />
              <div style={{ flex: 1 }}>
                  <Routes>  
                      <Route path="/" element={<Home />} />
                      <Route path="/product/:id" element={<ProductDetails cart={cart} products={products} />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/store" element={<Store products={products} />} />
                      <Route path="/payment-complete" element={<PaymentComplete />} />
                      <Route path="/checkout" element={<Checkout cart={cart} />} />
                      <Route path="/photos" element={<Photos />} />
                      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                      <Route path="/admin" element={<AdminSignIn />} />
                      <Route path="/media" element={<Media />} />
                  </Routes>
              </div>
              <Footer />
          </BrowserRouter>
      </div>
  );
}

export default App;

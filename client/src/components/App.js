import Home from "../pages/Home";
import Navbar from "./Navbar";
import Store from "../pages/Store";
import About from "../pages/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";
import { useState, useEffect } from "react";
import ProductDetails from "../pages/ProductDetails";
import Footer from "./Footer";
import Photos from "../pages/Photos";
import PaymentComplete from "../pages/PaymentComplete";
import CheckoutForm from "./CheckoutForm";

function App() {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([]) 
  
  useEffect(() => {
      fetch('/products')
      .then(r => r.json())
      .then(r => setProducts(r))
  }, [])

    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'black' }}>
          <BrowserRouter>
              <Navbar />
              <div style={{ flex: 1 }}>
                  <Routes>
                      
                      <Route exact path="/" element={<Home />} />
                      <Route path="/product/:id" element={<ProductDetails products={products} />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/store" element={<Store products={products} />} />
                      <Route path="/payment-complete" element={<PaymentComplete />} />
                      <Route path="/checkout" element={<Checkout cart={cart} />} />
                      <Route path="/photos" element={<Photos />} />
                      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                  </Routes>
              </div>
              <Footer />
          </BrowserRouter>
      </div>
  );
  
}

export default App;

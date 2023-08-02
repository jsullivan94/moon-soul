import Home from "../pages/Home";
// import Events from "../pages/Events";
import Navbar from "./Navbar";
import Store from "../pages/Store";
import About from "../pages/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";
import { useState, useEffect } from "react";
import ProductDetails from "../pages/ProductDetails";


function App() {

  const [cart, setCart] = useState([])  
  const [products, setProducts] = useState([])


  useEffect(() => {
      fetch('/products')
      .then(r => r.json())
      .then(r => setProducts(r))
  }, [])

  return (
    <div >
      <Header />
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails products={products} cart={cart} setCart={setCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store products={products} setCart={setCart} cart={cart} />} />
          {/* <Route path="/events" element={<Events />} /> */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

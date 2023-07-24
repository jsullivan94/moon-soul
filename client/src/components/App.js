import Home from "../pages/Home";
import Calender from "../pages/Calender";
import Navbar from "./Navbar";
import Store from "../pages/Store";
import About from "../pages/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";



function App() {
  return (
    <div >
      <Header />
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
          <Route path="/calender" element={<Calender />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import Nav from './component/navbar/Nav';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Order from './pages/PlaceOrder/PlaceOrder';
import Cart from './pages/Cart/Cart';
import Footer from "./component/footer/Footer";
import Login from './component/Login/Login'
import Verify from "./pages/Verify/Verify";
import Myorders from "./pages/Myorders/Myorders";
function App() {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
     {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}

    <div className="app" >
      <Nav setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path="/verify" element={<Verify />}/>
        <Route path="myorders" element={<Myorders />} />
      </Routes>
    </div>
    <Footer />
    </>
  );
}

export default App;

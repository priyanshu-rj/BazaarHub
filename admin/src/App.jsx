import React from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Navbar from './components/navbar/Navbar'
import { Routes,Route} from 'react-router-dom'
import Add from './components/pages/add/Add'
import List from './components/pages/list/List'
import Orders from './components/pages/orders/Orders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const url = "https://fusion-hub-backend.onrender.com";
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr /> 
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}  />}/>
          <Route path="/list" element={<List url={url} />}/>
          <Route path="/orders" element={<Orders url={url} />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

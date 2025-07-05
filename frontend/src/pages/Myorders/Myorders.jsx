import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './myorders.css';
import { StoreContext } from '../../context/Scontext';
import { assets } from '../../assets/assets';

const Myorders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const previousStatuses = useRef({}); 

 
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, {
        headers: { token }
      });
      const newOrders = response.data.data;

   
      newOrders.forEach(order => {
        const prevStatus = previousStatuses.current[order._id];
        if (prevStatus && prevStatus !== order.status) {
         
          sendNotification(`Your order is now ${order.status}`);
        }

       
        previousStatuses.current[order._id] = order.status;
      });

      setData(newOrders);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  // Send notification
  const sendNotification = (message) => {
    if (Notification.permission === 'granted') {
      new Notification("Order Update", {
        body: message,
        icon: assets.parcel_icon,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
      const interval = setInterval(fetchOrders, 10000); 
      return () => clearInterval(interval);
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  return item.name + " x " + item.quantity + (index !== order.items.length - 1 ? ", " : "");
                })}
              </p>
              <p>Rs {order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b> </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Myorders;

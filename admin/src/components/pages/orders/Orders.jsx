import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './orders.css';
import { toast } from 'react-toastify';
import { assets } from '../../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const previousOrderIds = useRef([]);


  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log("Notification permission granted.");
        }
      });
    }
  }, []);

  // Function to send browser notification
  const sendBrowserNotification = (message) => {
    if (Notification.permission === 'granted') {
      new Notification("New Order Alert", {
        body: message,
        icon: assets.parcel_icon, // optional icon
      });
    }
  };

  // Fetch all orders and detect new ones
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");

      if (response.data.success) {
        const newOrders = response.data.data;
        const reversedOrders = [...newOrders].reverse(); // recent first
        const currentIds = reversedOrders.map((order) => order._id);
        const newIds = currentIds.filter((id) => !previousOrderIds.current.includes(id));

        if (previousOrderIds.current.length > 0 && newIds.length > 0) {
          const message = `${newIds.length} new order${newIds.length > 1 ? 's' : ''} received!`;
          toast.info(message);
          sendBrowserNotification(message);
        }

        previousOrderIds.current = currentIds;
        setOrders(reversedOrders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Server error while fetching orders");
    }
  };

  // Fetch orders on load and then every 10 seconds
  useEffect(() => {
    fetchAllOrders();
    const interval = setInterval(fetchAllOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle order status change
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });

      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="Parcel" />
              <div>
                <p className='order-item-food'>
                  {
                    order.items.map((item, idx) =>
                      item.name + " x " + item.quantity + (idx !== order.items.length - 1 ? ", " : "")
                    )
                  }
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street},</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Rs {order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Item Processing">Item Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Orders;

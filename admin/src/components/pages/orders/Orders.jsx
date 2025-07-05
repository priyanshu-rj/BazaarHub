import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './orders.css';
import { toast } from 'react-toastify';
import { assets } from '../../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const previousOrderIds = useRef([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");

      if (response.data.success) {
        const newOrders = response.data.data;

        // Reverse orders to show recent first
        const reversedOrders = [...newOrders].reverse();

        // Detect new orders
        const currentIds = reversedOrders.map((order) => order._id);
        const newIds = currentIds.filter((id) => !previousOrderIds.current.includes(id));

        if (previousOrderIds.current.length > 0 && newIds.length > 0) {
          toast.info(`${newIds.length} new order${newIds.length > 1 ? 's' : ''} received!`);
        }

        // Update state and previous IDs
        previousOrderIds.current = currentIds;
        setOrders(reversedOrders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Server error while fetching orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
    const interval = setInterval(fetchAllOrders, 10000); // refresh every 10 sec
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

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
                    order.items.map((item, index) => {
                      return item.name + " x " + item.quantity + (index !== order.items.length - 1 ? ", " : "");
                    })
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

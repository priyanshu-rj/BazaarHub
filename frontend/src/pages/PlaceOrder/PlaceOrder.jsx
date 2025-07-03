import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './order.css';
import { StoreContext } from '../../context/Scontext';
import Verify from '../Verify/Verify';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      paymentMethod: "COD"  //Cash on Delivery
    };
    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        setIsVerifying(true);
        setTimeout(() => {
          setIsVerifying(false);
          setOrderPlaced(true);
        }, 2000); //  2 seconds
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert("Error placing order");
    }
  }
  const navigate = useNavigate();
  useEffect(()=>{
       if(!token){
         navigate('/cart')
       }
       else if(getTotalCartAmount()===0){
        navigate('/cart')
       }
  },[token])

  return (
    <div>
      {isVerifying ? (
        <Verify /> // Display the verify.jsx component
      ) : orderPlaced ? (
        <div className="success-message">
          <h2>Order placed successfully!</h2>
          <p>Your order has been placed successfully with Cash on Delivery option.</p>
        </div>
      ) : (
        <form onSubmit={placeOrder} className='place-order'>
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
              <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
            </div>
            <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email address' />
            <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />

            <div className="multi-fields">
              <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
              <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
            </div>
            <div className="multi-fields">
              <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
              <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
            </div>
            <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
          </div>
          <div className="place-order-right">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>{getTotalCartAmount()}</p>
                </div>
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <div className="cart-total-details">
                  <p>Total</p>
                  <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
                </div>
              </div>
              <button type='submit'>PLACE ORDER</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}


export default PlaceOrder;

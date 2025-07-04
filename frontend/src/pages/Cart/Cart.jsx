import React, { useContext } from 'react';
import './cart.css';
import { StoreContext } from '../../context/Scontext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.length > 0 &&
          food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className='cart-items-title cart-items-item'>
                    <img
                      src={
                        item.image.startsWith('http')
                          ? item.image
                          : `${url}/images/${item.image}`
                      }
                      alt={item.name}
                    />
                    <p>{item.name}</p>
                    <p>Rs. {item.price.toFixed(2)}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>Rs. {(item.price * cartItems[item._id]).toFixed(2)}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount().toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs. {getTotalCartAmount() === 0 ? '0.00' : '2.00'}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>Rs. {getTotalCartAmount() === 0 ? '0.00' : (getTotalCartAmount() + 2).toFixed(2)}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECK OUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

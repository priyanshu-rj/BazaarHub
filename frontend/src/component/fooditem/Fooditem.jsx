import React, { useContext } from 'react';
import './fooditem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/Scontext';

const Fooditem = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);


  const imageUrl = image?.startsWith('http') ? image : `${url}/images/${image}`;

  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img className='food-item-image' src={imageUrl} alt={name} />
        
        {!cartItems[id] ? (
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt='Add'
          />
        ) : (
          <div className='food-item-counter'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price">Rs. {price}</p>
      </div>
    </div>
  );
};

export default Fooditem;

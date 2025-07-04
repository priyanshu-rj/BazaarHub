import React from 'react';
import './fooditem.css';

const Fooditem = ({ id, name, descrption, price, image }) => {
  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img src={image} alt={name} className="food-item-image" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <h4>{name}</h4>
        </div>
        <p>{descrption}</p>
        <p>₹{price}</p>
      </div>
    </div>
  );
};

export default Fooditem;

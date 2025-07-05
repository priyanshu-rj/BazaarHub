import React, { useContext, useState } from 'react';
import './food.css';
import { StoreContext } from '../../context/Scontext';
import Fooditem from '../fooditem/Fooditem';

const Food = () => {
  const { food_list } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter items whose name starts with the search term
  const filteredFoodList = food_list.filter(item =>
    item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className='food-display' id='food-display'>
      <h4>Fast Delivery Available within 2 km radius of Partapganj Goal Chawk</h4>

    
      <div className="search-container">
        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="food-search-input"
        />
      </div>

      <div className="food-display-list">
        {
          filteredFoodList.length === 0 ? (
            <p style={{ color: "gray" }}>No matching food items found.</p>
          ) : (
            filteredFoodList.map((item, index) => (
              <Fooditem
                key={index}
                id={item._id}
                name={item.name}
                descrption={item.descrption}
                price={item.price}
                image={item.image}
              />
            ))
          )
        }
      </div>
    </div>
  );
};

export default Food;

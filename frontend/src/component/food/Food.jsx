import React, { useContext } from 'react'
import './food.css'
import { StoreContext } from '../../context/Scontext'
import Fooditem from '../fooditem/Fooditem'
const Food = (category) => {

    const {food_list} = useContext(StoreContext) 


  return (
    <div className='food-display' id='food-display' >
       <h2>Top Prdoduct near you</h2>
       <div className="food-display-list">
        {
            food_list.map((item,index)=>{
               return <Fooditem key={index} id={item._id} name={item.name} descrption={item.descrption} price={item.price} image={item.image}/>
            })
        }
       </div>
    </div>
  )
}

export default Food
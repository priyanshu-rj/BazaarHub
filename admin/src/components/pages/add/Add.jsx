import React, { useState } from 'react'
import './add.css'
import { assets } from '../../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({url}) => {
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Product"
    })
 const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
 }


 const onSubmitHandler = async (event) =>{
        event.preventDefault(); 
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        const response = await axios.post(`${url}/api/food/add`,formData) 
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Product"
            })
            setImage(false)
            toast.success("Product Add Sucessfully")
        }
        else{
            toast.error("Error")
        }
 }



//  useEffect(()=>{
//      console.log(data);
//  },[data])


  return (
    <div className='add' > 
        <form className='flex-col' onSubmit={onSubmitHandler}>
         <div className="add-img-upload flex-col">
             <p>Upload Image</p>
             <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
             </label>
             <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>

         </div>

         <div className="add-product-name flex-col">
               <p>Product name</p>
               <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' />
         </div>
         <div className="add-product-description flex-col">
            <p>Product description </p>
            <textarea  onChange={onChangeHandler} value={data.description} name="description" type="text" rows="6" placeholder='Write Content Here'></textarea>

         </div>
         <div className="add-category-price">
            <div className="add-category flex-col">
                <p> Product category</p>
                <select  onChange={onChangeHandler} name="category">
                    <option value="Product">Product</option>
                    <option value="Toy Item">Toy Item</option>
                    <option value="Book">Book</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Cake">Cake</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Grocery">Grocery</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product price</p>
                <input  onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='Rs20'/>
            </div>
         </div>
         <button type='submit' className='add-b' >ADD</button>
        </form>
    </div>
  )
}

export default Add
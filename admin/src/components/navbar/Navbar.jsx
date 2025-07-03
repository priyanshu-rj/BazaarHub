import React from 'react'
import './navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>
       <img className='logo' src={assets.logo} alt="" />
       <h2>Admin Portal</h2>
        <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
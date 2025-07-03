import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
           <h2>Bazaar<a className='hub'>Now</a> </h2>
           <p> Now you can buy whatever you want.</p>
           <button>View More</button>
      </div>
    </div>
  )
}

export default Header
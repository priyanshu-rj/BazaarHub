import React, { useState } from 'react'
import './home.css'
import Header from '../../component/header/Header'
import Menu from '../../component/menu/Menu'
import Food from '../../component/food/Food'
const Home = () => {
  const [category,setCategory] = useState("All")

  return (
    <div>
      <Header/>
      <Menu category={category} setCategory={setCategory} />
      <Food category={category} />
    </div>
  )
}

export default Home
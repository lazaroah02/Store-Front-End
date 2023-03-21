import React from 'react'
import NavBar from '../components/NavBar'
import CategoriesNavBar from '../components/CategoriesNavBar'
import GenerateCards from '../components/GenerateCards'
import ProductsRecomended from '../components/ProductsRecomended'
import '../App.css';

function Home() {
  return(
    <div className = "App">
        <NavBar/>
        <ProductsRecomended/>
        <CategoriesNavBar/>
        <GenerateCards />
    </div>
  
  )
}

export default Home;

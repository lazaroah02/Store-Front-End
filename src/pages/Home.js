import React, {useRef} from 'react'
import NavBar from '../components/NavBar'
import CategoriesNavBar from '../components/CategoriesNavBar'
import GenerateCards from '../components/GenerateCards'
import ProductsRecomended from '../components/ProductsRecomended'
import ButtonGoTop from "../components/ButtonGoTop";
import '../App.css';

function Home() {
  const startRef = useRef()
  return(
    <div className = "Home">
        <NavBar/>
        <p id = "top"></p>
        <ButtonGoTop/>
        <ProductsRecomended/>
        <CategoriesNavBar/>
        <p ref = {startRef} id = "start"></p>
        <GenerateCards startRef = {startRef}/>
    </div>
  
  )
}

export default Home;

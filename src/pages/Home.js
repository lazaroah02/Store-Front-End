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
    <div className = "App">
        <NavBar/>
        <p ref = {startRef}></p>
        <ButtonGoTop reference = {startRef}/>
        <ProductsRecomended/>
        <CategoriesNavBar/>
        <GenerateCards startRef = {startRef}/>
    </div>
  
  )
}

export default Home;

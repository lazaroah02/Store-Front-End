import React, {useRef} from 'react'
import NavBar from '../components/NavBar'
import FiltersNavBar from '../components/FiltersNavBar'
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
        <p ref = {startRef} id = "start"></p>
        <FiltersNavBar/>
        <GenerateCards startRef = {startRef}/>
    </div>
  
  )
}

export default Home;

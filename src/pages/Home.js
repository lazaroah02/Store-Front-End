import React, {useRef} from 'react'
import NavBar from '../components/NavBar'
//import FiltersNavBar from '../components/FiltersNavBar'
//import GenerateCards from '../components/GenerateCards'
import ProductsRecomended from '../components/ProductsRecomended'
import HomeScreenCategories from '../components/HomeScreenCategories'
import ButtonGoTop from "../components/ButtonGoTop";
import Footer from "../components/Footer"
import Promociones from '../components/Promociones';
import PromocionesEspeciales from '../components/PromocionesEspeciales';
import './pagesStyles/home.css';

function Home() {
  const startRef = useRef()
  return(
    <div className = "Home">
        <NavBar startRef = {startRef}/>
        <ButtonGoTop/>
        <div className = "promociones-container">
          <PromocionesEspeciales/>
          <Promociones/>
        </div>
        <ProductsRecomended/>
        <HomeScreenCategories/>
        <Footer/>
    </div>
  
  )
}

export default Home;

import React from 'react'
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
  return(
    <div className = "Home">
        <NavBar/>
        <ButtonGoTop/>
        <div className = "promociones-container">
          <PromocionesEspeciales/>
          <Promociones/>
        </div>
        <div className = "recomended-products-title-container">
          <div className = "recomended-products-title">
              <p>Productos Recomendados</p>
          </div>
        </div>
        <ProductsRecomended/>
        <HomeScreenCategories/>
        <Footer/>
    </div>
  
  )
}

export default Home;

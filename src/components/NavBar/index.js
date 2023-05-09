import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import SearchProductForm from '../SearchProductForm'
import Cart from "../Cart";
import LogoProfile from "../LogoProfile"
import OtherOptionsOfNavbar from '../OthersOptionsOfNavbar';
import LoginNavbarLink from '../LoginNavbarLink';
import './index.css'

//images import
import Logo from '../../assets/navBarIcons/logo-store.png'
import HomeIcon from '../../assets/navBarIcons/home-icon.svg'


export default function NavBar(){
  const [expandNavBar, setExpandNavBar] = useState(true)
  const styleNavBar = expandNavBar? "new-navbar":"new-navbar-short"
  const navigate = useNavigate()
  
  //function that detect when the user make scroll and hide the top part of the nav bar
  document.onscroll = function(){
    if(window.scrollY >= 100){
      setExpandNavBar(false)
    }
    else{
      setExpandNavBar(true)
    }
  }
  return(
    <div className = {styleNavBar}>
      <section className = "top-navbar">
          <div className = "home-link" onClick={() => navigate("/")}><img src = {Logo} alt = "Logo"/></div>
          <LoginNavbarLink/>
      </section>

        <section className = "bottom-navbar">
          <div className = "home-icon-container" onClick={() => navigate("/")}>
            <div className = "home-icon">
              <img alt = "home" src = {HomeIcon}/>
              <div>Inicio</div>
            </div>
          </div>
          <SearchProductForm/>
        <section className = "items-container">
          <Cart/>
          <LogoProfile/>
          <OtherOptionsOfNavbar/>
        </section>

      </section>
    </div>
    )
}
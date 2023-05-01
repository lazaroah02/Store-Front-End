import React, {useState} from 'react'
import './index.css'
import {redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import SearchProductForm from '../SearchProductForm'
import Cart from "../Cart";
import LogoProfile from "../LogoProfile"

//images import
import homeIcon from '../../assets/navBarIcons/home-icon.svg'
import contactIcon from '../../assets/navBarIcons/mail-icon.svg'
import LogoChat from '../../assets/navBarIcons/chat-icon.svg'
import Logo from '../../assets/navBarIcons/logo-store.png'


export default function NavBar({startRef}){
  const [expandNavBar, setExpandNavBar] = useState(true)
  const styleNavBar = expandNavBar? "new-navbar":"new-navbar-short"
  
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
          <div className = "home-link" onClick={() => redirect("/")}><Link to = "/"><img src = {Logo} alt = "Logo"/></Link></div>
          <div className = "chat-link">
            <Link to = "/chat">
              <img src = {LogoChat} alt = "Chat"/>
            </Link>
          </div>
      </section>
      <section className = "items-navbar justify-content-center">
        <div>
          <Link to = "/">
            <img src = {homeIcon} alt = "home"/>
          </Link>
        </div>
        <div><SearchProductForm/></div>
        <div>
          <Link to = "/contact">
            <img src = {contactIcon} alt = "home"/>
          </Link>
        </div>
        <div><Cart/></div>
        <div><LogoProfile/></div>
      </section>
    </div>
    )
}
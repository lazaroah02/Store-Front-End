import React, {useState} from 'react'
import './index.css'
import {Link} from 'wouter'
import SearchProductForm from '../SearchProductForm'
import Cart from "../Cart";
import LogoProfile from "../LogoProfile"

//images import
import homeIcon from '../../assets/navBarIcons/home-icon.svg'
import contactIcon from '../../assets/navBarIcons/mail-icon.svg'
import LogoChat from '../../assets/navBarIcons/chat-icon.svg'


export default function NavBar(){
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
        <Link to = "/">
          <div className = "home-link"><h4>Store</h4></div>
        </Link>
        <Link to = "/chat">
          <div className = "chat-link"><img src = {LogoChat} alt = "Chat"/></div>
        </Link>
      </section>
      <section className = "items-navbar justify-content-center">
        <Link to = "/"><div><img src = {homeIcon} alt = "home"></img></div></Link>
        <div><SearchProductForm/></div>
        <Link to = "/contact"><div><img src = {contactIcon} alt = "home"></img></div></Link>
        <div><Cart/></div>
        <div><LogoProfile/></div>
      </section>
    </div>
    )
}
import React from 'react'
import './index.css'
import {redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import SearchProductForm from '../../SearchProductForm'
import Cart from "../../Cart";
import LogoProfile from "../../LogoProfile"

//images import
import homeIcon from '../../../assets/navBarIcons/home-icon.svg'
import contactIcon from '../../../assets/navBarIcons/mail-icon.svg'
import LogoChat from '../../../assets/navBarIcons/chat-icon.svg'
import Logo from "../../../assets/navBarIcons/logo-store.jpg"


export default function PhoneNavBar(){
  
  return(
    <div className = "desktop-nav-bar">
        <div className = "desktop-home-link" onClick={() => redirect("/")}><Link to = "/"><img src = {Logo} alt = "Store"/></Link></div>
        <section className = "desktop-items-navbar">
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
          <div className = "desktop-chat-link">
              <Link to = "/chat">
                <img src = {LogoChat} alt = "Chat"/>
              </Link>
          </div>
        </section>
    </div>
    )
}
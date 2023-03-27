import React from 'react'
import './index.css'
import {Link} from 'wouter'
import SearchProductForm from '../SearchProductForm'
import Cart from "../Cart";
import LogoProfile from "../LogoProfile"

//images import
import homeIcon from '../../assets/navBarIcons/home-regular-24.png'
import contactIcon from '../../assets/navBarIcons/envelope-regular-24.png'


export default function NavBar(){
  return(
    <div className = "new-navbar justify-content-center">
      <Link to = "/"><div><img src = {homeIcon} alt = "home"></img></div></Link>
      <div><SearchProductForm/></div>
      <Link to = "/contact"><div><img src = {contactIcon} alt = "home"></img></div></Link>
      <div><Cart/></div>
      <div><LogoProfile/></div>
    </div>
  )
}
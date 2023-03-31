import React, {useState} from 'react';
import makeUserSeller from '../../../../services/makeUserSeller'
import quitUserSeller from '../../../../services/quitUserSeller'
import LogoutLink from '../../../LogoutLink'
import {useLocation} from 'wouter'
import './index.css'

//icons import
import LeftArrow from '../../../../assets/left-arrow-alt-regular-24.png' 
import RightArrow from '../../../../assets/right-arrow-alt-regular-24.png' 
import LogoProfile from '../../../../assets/navBarIcons/LogoProfile.png' 
import YourProductsIcon from '../../../../assets/dashboard-solid-24.png' 
import ListOfOrdersIcon from '../../../../assets/bar-chart-alt-2-solid-24.png' 
import ProductsSoldIcon from '../../../../assets/bar-chart-alt-2-solid-24.png' 
import MakeYouSellerIcon from '../../../../assets/navBarIcons/LogoProfile.png' 
import DejarDeSerVendedorIcon from '../../../../assets/spreadsheet-regular-24.png' 

export default function OptionsNavBar({is_seller = null}){
    const [expanded, setExpanded] = useState(false)
    const [,setLocation] = useLocation()

    function handleMakeUserSeller(){
      makeUserSeller()
      .then(res =>{
        if(res.status === 200){
          alert('Action Successfully')
          window.location.reload()
        }
      })
    }
    function handleQuitUserSeller(){
      quitUserSeller()
      .then(res =>{
        if(res.status === 200){
          alert('Action Successfully')
          window.location.reload()
        }
      })
    }

    return(
        <div>
          {expanded?
            <div className = 'options-nav-bar-expanded'>
              <LogoutLink/> 
              <button className = 'btn button-expanded' onClick={() => setExpanded(false)}><img alt = "icon" src = {LeftArrow}/></button>
              <button className = 'btn button-show-info-expanded' onClick = {() => {
                setLocation("/user-profile/info")
                setExpanded(false)
                }}><img alt = "icon" src = {LogoProfile}/>Your Info</button>
              
              {is_seller === true?
              <div>
              <button className = 'btn button-show-info-expanded' onClick = {() => {
                setLocation('/user-profile/your-products')
                setExpanded(false)
                }}><img alt = "icon" src = {YourProductsIcon}/>Your Products</button>
              <button className = 'btn button-show-info-expanded' onClick = {() => {
                setLocation('/user-profile/your-products')
                setExpanded(false)
                }}><img alt = "icon" src = {ProductsSoldIcon}/>Sold products</button>
              <button className = 'btn button-show-info-expanded' onClick = {() => {
                setLocation('/user-profile/list-of-orders')
                setExpanded(false)
                }}><img alt = "icon" src = {ListOfOrdersIcon}/>List of orders</button>
              <button className = 'btn button-show-info-expanded' onClick = {() => handleQuitUserSeller()}><img alt = "icon" src = {DejarDeSerVendedorIcon}/>Dejar de ser vendedor</button>
              </div>
              :
              <button className = 'btn button-show-info-expanded' onClick = {() => handleMakeUserSeller()}><img alt = "icon" src = {MakeYouSellerIcon}/>Make you seller</button>
              } 
            </div>
          :
            <div className = 'options-nav-bar'>
              <button className = 'btn button-expand' onClick={() => setExpanded(true)}><img alt = "icon" src = {RightArrow}/></button>
            </div>
          }
        </div>
    )
}
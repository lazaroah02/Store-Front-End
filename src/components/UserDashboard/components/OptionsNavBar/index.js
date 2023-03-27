import React, {useState, useContext} from 'react';
import ActualComponentContext from '../../context/actualComponentContext'
import InfoUserContext from '../../../../context/InfoUserContext'
import makeUserSeller from '../../../../services/makeUserSeller'
import quitUserSeller from '../../../../services/quitUserSeller'
import LogoutLink from '../../../LogoutLink'
import './index.css'

export default function OptionsNavBar(){
    const {setComponent} = useContext(ActualComponentContext)
    const [expanded, setExpanded] = useState(false)
    const {infoUser, } = useContext(InfoUserContext)

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
              <button className = 'btn button-expanded' onClick={() => setExpanded(false)}><img alt = "icon" src = 'icons/left-arrow-alt-regular-24.png'/></button>
              <button className = 'btn button-show-info-expanded' onClick = {() => {
                setComponent('info-user')
                setExpanded(false)
                }}><img alt = "icon" src = 'icons/LogoProfile.png'/>Your Info</button>
              
              {infoUser !== undefined && infoUser[0].is_seller === true?
              <div>
              <button className = 'btn button-show-info-expanded' onClick = {() => {
                setComponent('your-products')
                setExpanded(false)
                }}><img alt = "icon" src = 'icons/dashboard-solid-24.png'/>Your Products</button>
              <button className = 'btn button-show-info-expanded' onClick = {() => {
                setComponent('products-sold')
                setExpanded(false)
                }}><img alt = "icon" src = 'icons/bar-chart-alt-2-solid-24.png'/>Sold products</button>
              <button className = 'btn button-show-info-expanded' onClick = {() => {
                setComponent('list-of-orders')
                setExpanded(false)
                }}><img alt = "icon" src = 'icons/spreadsheet-regular-24.png'/>List of orders</button>
              <button className = 'btn button-show-info-expanded' onClick = {() => handleQuitUserSeller()}><img alt = "icon" src = 'icons/spreadsheet-regular-24.png'/>Dejar de ser vendedor</button>
              </div>
              :
              <button className = 'btn button-show-info-expanded' onClick = {() => handleMakeUserSeller()}><img alt = "icon" src = 'icons/LogoProfile.png'/>Make you seller</button>
              } 
            </div>
          :
            <div className = 'options-nav-bar'>
              <button className = 'btn button-expand' onClick={() => setExpanded(true)}><img alt = "icon" src = 'icons/right-arrow-alt-regular-24.png'/></button>
            </div>
          }
        </div>
    )
}
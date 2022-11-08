import React, {useState} from 'react'
import './index.css'
import ShowItemsLinks from '../ShowLoginLogoutLink'
import {Link} from 'wouter'
import SearchProductForm from '../SearchProductForm'

export default function NavBar(){
  const [collSpanPressed, setPressed] =useState(false)
  return(
    <div className = 'navBarDivContainer'>
    <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Store</a>
    
    {collSpanPressed?
      <span className="navbar-toggler colspam-pressed" onClick = {() => setPressed(false)} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <div></div>
        <div></div>
        <div></div>
      </span>
      :
      <span className="navbar-toggler colspam-no-pressed" onClick = {() => setPressed(true)} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <div></div>
        <div></div>
        <div></div>
      </span>
    }

    <div class="collapse navbar-collapse NavBarColapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/About_us">About us</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link " to = "/contact">Contacto</Link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/">Action</a></li>
            <li><a class="dropdown-item" href="/">Another action</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="/">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <SearchProductForm/>
      <ShowItemsLinks/>
    </div>
  </div>
</nav>
</div>
  )
}
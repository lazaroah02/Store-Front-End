import React, {useEffect} from "react";
import searchIcon from '../../../../assets/navBarIcons/search-icon.svg'
import {useNavigate, useLocation} from 'react-router-dom'
import {createNewPathName} from '../../createNewPathName'

export default function PriceFilter({filterToRemove}) {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    useEffect(() => {
      if(filterToRemove === "precio"){
        navigate(createNewPathName(pathname, "precio", ""))
      }
    },[filterToRemove])

    function handleSetPrice(e){
        e.preventDefault();
        let price = e.target[0].value
        if(isNaN(price)) return alert('The price must be a number')
        //inserto el filtro en la nueva ruta
        navigate(createNewPathName(pathname, "precio", price))
    }

  return (
    <div>
      <li className="nav-item dropdown">
        <button
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Precio
        </button>
        <ul className="dropdown-menu">
            <form className="d-flex set-price-filter" onSubmit = {(e) => handleSetPrice(e)}>
                <input className="form-control me-2" placeholder="Set a price"/>
                <button className="btn"><img alt = "buscar" src = {searchIcon}/></button>
            </form>
        </ul>
      </li>
    </div>
  );
}

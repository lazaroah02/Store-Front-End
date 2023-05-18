import React, {useEffect, useState} from "react";
import searchIcon from '../../../../assets/navBarIcons/search-icon.svg'
import {useNavigate, useLocation} from 'react-router-dom'
import {createNewPathName} from '../../../../helpFunctions/createNewPathName'
import Modal from 'react-bootstrap/Modal'
import './index.css'

export default function PriceFilter({activeFilters}) {
    const navigate = useNavigate()
    const [actualPrice, setActualPrice] = useState("Todos")
    const {pathname} = useLocation()
    const [showModal, setShowModal] = useState(false)

    //useEffect to see the actual price 
    useEffect(() => {
      let precioUrl = "Todos"
      for(let i = 0; i < activeFilters.length; i++){
        if(activeFilters[i].filter === "precio"){
          precioUrl = activeFilters[i].value
        }
      }
      setActualPrice(precioUrl)
    },[activeFilters])

    //inyecta en la url el precio seleccionado para filtrar
    function handleSetPrice(e){
        e.preventDefault();
        setShowModal(false)
        let price = e.target[0].value
        if(isNaN(price)) return alert('The price must be a number')
        //inserto el filtro en la nueva ruta
        navigate(createNewPathName(pathname, "precio", price))
    }

  return (
    <div className = "filter">
        <button
          className="btn"
          onClick={() => setShowModal(true)}
        >
          Precio: {actualPrice}
        </button>
        <Modal show = {showModal}>
          <Modal.Header className = "price-modal-header">
            <div>Filtrar por precio</div>
            <button className="btn close-price-modal-button" onClick = {() => setShowModal(false)}>X</button>
          </Modal.Header>
          <Modal.Body>
            <form className="d-flex set-price-filter" onSubmit = {(e) => handleSetPrice(e)}>
                <input className="form-control me-2" placeholder="price"/>
                <button className="btn filter-price-button"><img alt = "buscar" src = {searchIcon}/></button>
            </form>
          </Modal.Body>
        </Modal>
    </div>
  );
}

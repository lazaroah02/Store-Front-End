import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom'
import { createNewPathName } from "../../../../helpFunctions/createNewPathName";
import Modal from 'react-bootstrap/Modal'
import './index.css'

export default function OrderBy({activeFilters}) {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const [showModal, setShowModal] = useState(false)
  const [actualOrder, setActualOrder] = useState("Ninguno")

  const orderByList = [
    {id:1, value : "precio", buttonText : "Menor Precio"},
    {id:2, value : "-precio", buttonText : "Mayor Precio"},
    {id:3, value : "-updated_at", buttonText : "Mas recientes"},
    {id:4, value : "updated_at", buttonText : "Menos recientes"},
    {id:5, value : "product_name", buttonText : "Alfabeticamente [A-Z]"},
    {id:6, value : "-product_name", buttonText : "Alfabeticamente [Z-A]"},
  ]
  
  //useEffect para recuperar el order by activo
  useEffect(() => {
    let orderByUrlValue = ""
    let order = "Ninguno"
    //recorro la lista de filtros actuales para ver si esta ordenamiento
    for(let i = 0; i < activeFilters.length; i++){
      if(activeFilters[i].filter === "ordering") orderByUrlValue = activeFilters[i].value
    }
    //recupero de orderByList el valor del filtro para mostrarlo
    for(let i = 0; i < orderByList.length; i++){
      if(orderByList[i].value === orderByUrlValue) order = orderByList[i].buttonText
    }
    setActualOrder(order)
  },[activeFilters])

  //inyecta en la url lel orden seleccionado para filtrar
  function handleSetOrderBy(value){
    setShowModal(false)
    navigate(createNewPathName(pathname, "ordering", value))
  }
  return (
    <div className = "filter">
        <button
          className="btn"
          onClick={()=> setShowModal(true)}
        >
          Ordenar por: {actualOrder}
        </button>
        <Modal show = {showModal}>
          <Modal.Header className = "order-modal-header">
            <div>Ordenar por</div>
            <button className = "btn close-order-modal-button" onClick={()=> setShowModal(false)}>X</button>
          </Modal.Header>
          <Modal.Body>
            <div className = "orden" onClick={() => handleSetOrderBy("")}>No ordenar</div>
            {orderByList.map(orderBy => 
                <div 
                  key = {orderBy.id} 
                  className="orden"
                  onClick={() => handleSetOrderBy(orderBy.value)}
                  >{orderBy.buttonText}
                </div>
              )}
          </Modal.Body>
        </Modal>
    </div>
  );
}

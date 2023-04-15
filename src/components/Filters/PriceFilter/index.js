import React, { useState, useContext} from "react";
import Modal from 'react-bootstrap/modal'
import "./index.css";
import { ModalBody, ModalTitle } from "react-bootstrap";
import PriceFilterContext from '../../../context/PriceFilterContext'
import PaginationContext from "../../../context/PaginationContext"

export default function CategoriesFilter() {
  const [prices,] = useState(["0-100","100-300","300-500","500-1000","1000-2000",">2000"]);
  const [showModal, setShowModal] = useState(false)
  const {setPrice} = useContext(PriceFilterContext)
  const {setDesde, setHasta} = useContext(PaginationContext)

  function handleSetPrice(price){
    if(price === ">2000"){
      return setPrice([2000, 0])
    }
    else{
      let minMaxPrice = price.split("-")
      return setPrice([minMaxPrice[0], minMaxPrice[1]])
    }
  }
  return (
    <div className = "price-container">
       <button className = "PriceFilter" onClick = {() => setShowModal(true)}>Price</button>
       <Modal show = {showModal}>
          <Modal.Header>
              <ModalTitle>Prices</ModalTitle>
              <button className = "btn btn-danger" onClick = {() => setShowModal(false)}>X</button>
          </Modal.Header>
          <ModalBody>
            <ul>
              {prices.map(price => 
              <li key = {price} className = "price" onClick = {() => {
                setDesde(0)
                setHasta(24)
                handleSetPrice(price)
                setShowModal(false)
                }}>
                {price}
              </li>)}
            </ul>
          </ModalBody>
       </Modal>
    </div>

  );
}
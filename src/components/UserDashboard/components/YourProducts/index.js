import React, { useState} from "react";
import GenerateCardsOfProducts from "../GenerateCardsOfProducts";
import CreateProductModal from "../CreateProductModal"
import NavBar from '../../../NavBar'
import OptionsNavBar from "../OptionsNavBar";

import "./index.css";

export default function InfoUser() {
  const [updateProductList, setUpdateProductList] = useState(0)
  const [showModal, setShowModal] = useState(false)
  
  return (
    <div className="your-products">
      <NavBar/>
      <OptionsNavBar/>
        <div className = 'div-container-button'>
            <button className = 'btn btn-primary' onClick={() => {
              setShowModal(true)
            }}>Add new product</button>
        </div>
      <GenerateCardsOfProducts updateProducts = {updateProductList}/>
      <CreateProductModal 
        showModal = {showModal} 
        setShowModal = {setShowModal}
        updateProductList={updateProductList}
        setUpdateProductList={setUpdateProductList}
        />
    </div>
  );
}

import React, { useState, useEffect, useContext} from "react";
import GenerateCardsOfProducts from "../GenerateCardsOfProducts";
import ShowCreateProductModalContext from "../../context/showCreateProductModalContext";
import UpdateProductsList from '../../context/updateProductsList'
import CreateProductModal from "../CreateProductModal"
import NavBar from '../../../NavBar'
import OptionsNavBar from "../OptionsNavBar";
import InfoUserContext from '../../../../context/InfoUserContext'

import "./index.css";

export default function InfoUser() {
  const [updateProducts, setUpdateProducts] = useState(true);
  const {setShowCreateProductModal} = useContext(ShowCreateProductModalContext)
  const {updateProductsList} = useContext(UpdateProductsList)

  const {infoUser} = useContext(InfoUserContext)

  useEffect(() => {
    setUpdateProducts(true)
  },[updateProductsList])
  
  return (
    <div className="your-products">
      <NavBar/>
      <OptionsNavBar is_seller = {infoUser.is_seller}/>
        <div className = 'div-container-button'>
            <button className = 'btn btn-primary' onClick={() => {
              setShowCreateProductModal(true)
              setUpdateProducts(false)
            }}>Add new product</button>
        </div>
      <GenerateCardsOfProducts updateProducts = {updateProducts}/>
      <CreateProductModal/>
    </div>
  );
}

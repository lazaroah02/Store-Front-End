import React, { useState, useEffect, useContext} from "react";
import GenerateCardsOfProducts from "../GenerateCardsOfProducts";
import ShowCreateProductModalContext from "../../context/showCreateProductModalContext";
import UpdateProductsList from '../../context/updateProductsList'
import CreateProductModal from "../CreateProductModal"
import NavBar from '../../../NavBar'
import OptionsNavBar from "../OptionsNavBar";
import UserTokenContext from '../../../../context/UserTokenContext'
import InfoUserContext from '../../../../context/InfoUserContext'
import getInfoUser from '../../../../services/getInfoUser'

import "./index.css";

export default function InfoUser() {
  const [updateProducts, setUpdateProducts] = useState(true);
  const {setShowCreateProductModal} = useContext(ShowCreateProductModalContext)
  const {updateProductsList} = useContext(UpdateProductsList)

  const {token} = useContext(UserTokenContext)
  const {setInfoUser} = useContext(InfoUserContext)
  const [info, setInfo] = useState(null)

    useEffect(() => {
        getInfoUser(token)
        .then(data => {
            setInfoUser(data)
            setInfo(data)
        })
    },[token])

  useEffect(() => {
    setUpdateProducts(true)
  },[updateProductsList])
  
  return (
    <div className="your-products">
      <NavBar/>
      {info !== null? <OptionsNavBar is_seller = {info.is_seller}/>:null}
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

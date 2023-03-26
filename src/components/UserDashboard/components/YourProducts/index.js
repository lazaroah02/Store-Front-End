import React, { useState, useEffect, useContext} from "react";
import GenerateCardsOfProducts from "../GenerateCardsOfProducts";
import ShowCreateProductModalContext from "../../context/showCreateProductModalContext";
import UpdateProductsList from '../../context/updateProductsList'
import CreateProductModal from "../CreateProductModal"
import "./index.css";

export default function InfoUser() {
  const [updateProducts, setUpdateProducts] = useState(true);
  const {setShowCreateProductModal} = useContext(ShowCreateProductModalContext)
  const {updateProductsList} = useContext(UpdateProductsList)

  useEffect(() => {
    setUpdateProducts(true)
  },[updateProductsList])
  
  return (
    <div className="your-products">
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

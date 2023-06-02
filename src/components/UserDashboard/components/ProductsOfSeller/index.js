import React, { useState, useEffect, useContext} from "react";
import ListOfProducts from "../ListOfProducts";
import CreateProductModal from "../CreateProductModal"
import NavBar from '../../../NavBar'
import OptionsNavBar from "../OptionsNavBar";
import InfoUserContext from "../../../../context/InfoUserContext";
import {getProductsOfSeller} from '../../../../services/getProductsOfSeller'
import Loader from '../../../Loader'
import TrashWhite from '../../../../assets/trash-white.svg'
import AddIcon from '../../../../assets/add.svg'
import CancelIcon from '../../../../assets/cancel.svg'
import ShowFloatMessage from '../../../ShowFloatMessage'
import {deleteProduct} from '../../../../services/deleteAnProduct'
import "./index.css";
import "../user-dashboard-panel-styles.css"

export default function ProductsOfSeller() {
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const {infoUser} = useContext(InfoUserContext)
  const [showSelectButtons, setShowSelectButtons] = useState(false)
  const [productsToDelete, setProductsToDelete] = useState([])

  //Float message states handler
  const [showFloatMessage, setShowFloatMessage] = useState(false)
  const [message, setMessage] = useState({title:"", message:"", type:"success"})

  useEffect(() => {
      getProducts()
  }, []);

  function getProducts(){
    setLoading(true);
    getProductsOfSeller({token:infoUser.token}).then((data) => {
      setProducts(data);
      setLoading(false);
    }); 
  }

  //add a product to the delete list
  function addProductsToDelete(product){
    let productsToDeletCopy = [...productsToDelete]
    if(productsToDeletCopy.indexOf(product) === -1){
      productsToDeletCopy.push(product)
      setProductsToDelete(productsToDeletCopy);
    }
    else{
      productsToDeletCopy.splice(productsToDeletCopy.indexOf(product), 1)
      setProductsToDelete(productsToDeletCopy);
    }
  }

  //delete the products selected
  function deleteProducts(){
    if(productsToDelete.length > 0){
      let choice = window.confirm("Estas segur@ que desea eliminar?. El resultado es irreversible!")
      if(choice){
        try{
          deleteProduct({products:productsToDelete, token:infoUser.token})
          .then(res => {
            if(res.status === 200){
              setMessage({title:"!", message:"Operación Exitosa!", type:"success"})
              setShowFloatMessage(true)
              setProductsToDelete([])
              setShowSelectButtons(false)
              getProducts()
            }
            else{
              setMessage({title:"!", message:"Error al efectuar la operación!", type:"angry"})
              setShowFloatMessage(true)
            }
          })
        }
        catch{
          setMessage({title:"!", message:"Error al efectuar la operación!", type:"angry"})
          setShowFloatMessage(true)
        }
      }
    }
    else{
      setMessage({title:"!", message:"No has seleccionado ningun producto!", type:"angry"})
      setShowFloatMessage(true)
    }
  }
  
  return (
    <div className="user-dashboard-panel-container">
      <NavBar/>
      <OptionsNavBar/>
      <section className = "user-dashboard-panel">
        {infoUser.info === null
        ?
        <div className = "user-not-seller-message">
          Debes iniciar session
        </div>
        :
        <>
          {!infoUser.info.is_seller
          ?
            <div className = "user-not-seller-message">
              Debes ser vendedor para ver esta seccion
            </div>
            :
            <>
              <ShowFloatMessage 
              show={showFloatMessage} 
              setShow={setShowFloatMessage}
              message={message.message}
              title={message.title}
              type = {message.type}
              />
            {loading?
              <div className = "loader-container">
                <Loader/>
              </div>
              :
              <>
                <ListOfProducts 
                  products = {products} 
                  showSelectButtons={showSelectButtons} 
                  setSelectButtons={setShowSelectButtons}
                  addProductsToDelete = {addProductsToDelete}
                  />
                <div className = 'div-buttons-container'>
                  <section className = "delete-buttons-container">
                    <button className = {showSelectButtons?'btn button-cancel-delete-product':'btn button-delete-product'} onClick={() => {
                      setShowSelectButtons(!showSelectButtons)
                      }}><img alt = "Trash" src = {showSelectButtons?CancelIcon:TrashWhite}/><span>{showSelectButtons?"Cancelar":"Eliminar Producto"}</span>
                    </button>
                    <button className = {showSelectButtons?'btn button-confirm-delete-product':"btn button-confirm-delete-product-hidden"} 
                      onClick={() => {
                      deleteProducts()
                      }}><img alt = "trash" src = {TrashWhite}/><span>Confirmar</span>
                    </button>
                  </section>
                  <button className = 'btn button-add-product' onClick={() => {
                    setShowModal(true)
                  }}><img alt = "add" src = {AddIcon}/><span>Agregar nuevo producto</span></button>
                </div>
              </>
            }
            <CreateProductModal 
              showModal = {showModal} 
              setShowModal = {setShowModal}
              getProducts = {getProducts}
              />
            </>
          }
        </>
        }
      </section>
    </div>
  );
}

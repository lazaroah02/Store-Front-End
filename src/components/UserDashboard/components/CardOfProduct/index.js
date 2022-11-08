import React, {useRef} from 'react'
import {BASE_URL} from '../../../../settings'
import deleteAnProduct from '../../../../services/deleteAnProduct'
import './index.css'

export default function Card({id, name, precio, foto}){
  const ref = useRef()
  function handleDeleteAnProduct(){
    let selection = window.confirm("Are you sure you want to delete")
    if(selection){
      deleteAnProduct(id)
      .then(res => {
        if(res.status === 200){
          (ref.current).remove()
        }
      })
    }
  }
    return(
       <div className="SellerProductCard" ref = {ref} >
        <div className = 'image-container'>
          <img src={`${BASE_URL}${foto}`} className="card-img-top " alt={"imagen"}/>
        </div>
       <div className="seller-card-body">
         <h5 className="card-title" >{name}</h5>
         <p className="card-title" >${precio}</p>
         <button className="btn btn-danger delete-product-button" onClick={() => handleDeleteAnProduct()}><img src = 'icons/trash-regular-24.png'/></button>
         <button className="btn btn-primary update-product-button"><img src = 'icons/edit-alt-regular-24.png' /></button>
       </div>
     </div>

    )
}

import React, {useRef} from 'react'
import {BASE_URL} from '../../../../settings'
import deleteAnProduct from '../../../../services/deleteAnProduct'
import './index.css'
import {useNavigate} from 'react-router-dom'

//icons import
import EditButtonIcon from '../../../../assets/edit-alt-regular-24.png'
import DeleteButtonIcon from '../../../../assets/trash-regular-24.png'

export default function Card({id, product_name, precio, product_img1}){
  const ref = useRef()
  const navigate = useNavigate()

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
          <img src={`${BASE_URL}${product_img1}`} className="card-img-top " alt={product_name}/>
        </div>
       <div className="seller-card-body">
         <h5 className="card-title" >{product_name.length > 20?`${product_name.substr(0,20)}...`:product_name}</h5>
         <p className="card-title" >${precio}</p>
         <button className="btn btn-danger delete-product-button" onClick={() => handleDeleteAnProduct()}><img alt = "icon" src = {DeleteButtonIcon}/></button>
         <button className="btn btn-primary update-product-button" onClick={() => {
          navigate(`/user/seller/product/${id}`)
          }}><img src = {EditButtonIcon} alt = "icon"/></button>
       </div>
     </div>

    )
}

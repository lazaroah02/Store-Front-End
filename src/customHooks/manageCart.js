import {useContext, useEffect, useState} from 'react'
import ProductsCartContext from '../context/ProductsCartContext'

export function addProduct(){
    const {productsCart, setProductCart} = useContext(ProductsCartContext)
    const [product, add] = useState(undefined)
    
    useEffect(() => {
        let flag = 0 //identify if the product is added for the first time or not
        if(product !== undefined){
            productsCart.map((element) => {
                if(element.id === product.id){
                    element.cantidad += 1
                    element.subtotal = element.cantidad * element.price
                    flag = 1
                    return setProductCart(productsCart)
                }
                return null
            })
            if(flag === 0){
                product['subtotal'] = product.price 
                productsCart.push(product)
                flag = 0
            }
        }    
    },[product])

    return(
        [product,add]
    )
}


export function deleteProduct(){
    const {productsCart, setProductCart} = useContext(ProductsCartContext)
    const [product, rest] = useState(undefined)

    useEffect(() => {
        if(product !== undefined){
            productsCart.map(element => {
                if(element.id === product.id){
                    if(element.cantidad > 0){
                        element.cantidad -= 1
                        element.subtotal = element.cantidad * element.price
                        return setProductCart(productsCart)
                    }
                    else{
                        productsCart.splice(element, 1)
                    }
                }
                return null
            })
        }    
    },[product])

    return [product, rest]
}
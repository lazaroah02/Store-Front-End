import {useContext} from 'react'
import ProductsCartContext from '../context/ProductsCartContext'

export function useManageCart(){
    const {productsCart, setProductCart} = useContext(ProductsCartContext)

    function addProduct(newProduct){
        let productsCartCopy = [...productsCart]
        let productIsInCart = false
        if(newProduct !== undefined && newProduct !== null){
            productsCartCopy.forEach((product) => {
                if(newProduct.id === product.id){
                    product.cantidad += 1
                    product.subtotal = product.cantidad * product.price
                    setProductCart(productsCartCopy)
                    productIsInCart = true
                }
            })
            if(!productIsInCart){
                newProduct['subtotal'] = newProduct.price 
                productsCartCopy.push(newProduct)
                setProductCart(productsCartCopy)
            }
        }    
    }

    function restProduct(newProduct){
        let productsCartCopy = Array(...productsCart)
        if(newProduct !== undefined && newProduct !== null){
            for(let i = 0; i < productsCartCopy.length; i++){
                if(newProduct.id === productsCartCopy[i].id){
                    productsCartCopy[i].cantidad -= 1
                    productsCartCopy[i].subtotal = productsCartCopy[i].cantidad * productsCartCopy[i].price
                    if(productsCartCopy[i].cantidad <= 0){
                        productsCartCopy.splice(i, 1)
                    }
                    break
                }
            }
            setProductCart(productsCartCopy)
        }    
    }

    function deleteProduct(product){
        let productsCartCopy = [...productsCart]
        for(let i = 0; i < productsCartCopy.length; i++){
            if(productsCartCopy[i].id === product.id){
                productsCartCopy.splice(i, 1)
                break
            }
        }
        return setProductCart(productsCartCopy)
    }

    function cleanCart(){
        setProductCart([])
    }

    function calculateTotal(){
        let total = 0
        productsCart.forEach((product) => {
            total += product.subtotal
        })
        return total
    }

    function checkProductInCart(id){
        let inCart = false
        for (let i = 0; i < productsCart.length; i++){
            if(productsCart[i].id === id){
                inCart = true
                break
            }
        }
        return inCart
    }

    return {productsCart, addProduct, restProduct, deleteProduct, checkProductInCart, cleanCart, calculateTotal}
}
import React, { useEffect, useState, useContext} from "react";
import ProgresGif from "../ProgresGif";
import ActualFilterContext from "../../context/ActualFilterContext"
import InfoSearchedProduct from "../../context/InfoSearchedProduct";
import Card from '../Card'
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "./index.css";
import {useIsNear} from "../../customHooks/useIsNear";

//import all filters services
import getAllProducts from '../../services/Filters/getAllProducts'
import getProductsByCategory from '../../services/Filters/getProductsByCategory'
import getProductsByPrice from '../../services/Filters/getProductsByPrice'

export default function GenerateCard() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { infoSearchedProduct } = useContext(InfoSearchedProduct);
  const {actualFilter} = useContext(ActualFilterContext)
  const [pagination, setPagination] = useState([0, 24]);
  const [isNear, reference, setStopObserving] = useIsNear()
  const [noMoreProducts, setNoMoreProducts] = useState(false)

  //effect to get the products without pagination(when the user active some filter, 
  //we set pagination to the first page and start observing again for infinite scroll)
  useEffect(() => {
    setLoading(true)
    setStopObserving(false)
    setNoMoreProducts(false)
    setPagination([0, 24])
    switch(actualFilter.filter){
      case "category": //filtrado por categoria
        Promise.resolve(getProductsByCategory(actualFilter.value))
        .then(data => {
        setProduct(data)
        setLoading(false)
        })  
        break

      case "price": //filtrado es por precio
        Promise.resolve(getProductsByPrice(actualFilter.value))
        .then(data => {
        setProduct(data)
        setLoading(false)
        })  
        break
        
      default: //obtener todos los productos
        Promise.resolve(getAllProducts())
        .then(data => {
        setProduct(data)
        setLoading(false)})
    }
  },[actualFilter])

  /*effect to get the products with the pagination(when the user gets the end of the list of products, we get the next page of products.
    If the array of data that we get from the server is empty ,means that there is'n more products to show 
    and we stop observing for the next pagination)*/
  useEffect(() => {
    if(pagination[0] !== 0){
      setLoading(true)
      switch(actualFilter.filter){
        case "category": //filtrado por categoria
          Promise.resolve(getProductsByCategory(actualFilter.value, pagination[0], pagination[1]))
          .then(data => {
            if(data.length === 0){
              setStopObserving(true)
              setNoMoreProducts(true)
              setLoading(false)
            }
            else{
              setProduct(products.concat(data))
              setLoading(false)
            }
          })  
          break
  
        case "price": //filtrado es por precio
          Promise.resolve(getProductsByPrice(actualFilter.value, pagination[0], pagination[1]))
          .then(data => {
            if(data.length === 0){
              setStopObserving(true)
              setNoMoreProducts(true)
              setLoading(false)
            }
            else{
              setProduct(products.concat(data))
              setLoading(false)
            }
          })  
          break
          
        default: //obtener todos los productos
          Promise.resolve(getAllProducts(pagination[0], pagination[1]))
          .then(data => {
            if(data.length === 0){
              setStopObserving(true)
              setNoMoreProducts(true)
              setLoading(false)
            }
            else{
              setProduct(products.concat(data))
              setLoading(false)
            }
        })
      }
    }
  },[pagination])

  //search the product that the user input on search field
  useEffect(() => {
    setProduct(infoSearchedProduct);
  }, [infoSearchedProduct]);

  //efect to detect if isNear the point to get the next page of products
  useEffect(() => {
    if(isNear){
      setPagination([pagination[1] + 1, pagination[1] + 24])
    }
  },[isNear])

  return (
    <div>
      {loading ? (
        <div className="cargando">
          <ProgresGif />
        </div>
      ) : null}
      <div className=" ProductsContainer row justify-content-center">
        {products.length > 0?products.map((product) => <Card key={product.id} {...product} />)
        :
        <div className = 'NotFoundMessage'><strong>No hay productos</strong></div>}
      </div>
      {loading ? (
        <div className="cargando">
          <ProgresGif />
        </div>
      ) : null}
      {noMoreProducts?<div className = "no-more-products">No more Products</div>:null}
      <div ref = {reference}>.</div>
    </div>
  );
}

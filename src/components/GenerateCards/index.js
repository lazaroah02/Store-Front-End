import React, { useEffect, useState, useContext} from "react";
import ProgresGif from "../ProgresGif";
import CategoriesContext from "../../context/CategoriesContext";
import PriceFilterContext from "../../context/PriceFilterContext";
import GetAllProductsContext from "../../context/GetAllProductsContext";
import InfoSearchedProduct from "../../context/InfoSearchedProduct";
import PaginationContext from "../../context/PaginationContext";
import Card from '../Card'
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "./index.css";
import {useIsNear } from "../../customHooks/useIsNear";

//import all filters services
import getAllProducts from '../../services/Filters/getAllProducts'
import getProductsByCategory from '../../services/Filters/getProductsByCategory'
import getProductsByPrice from '../../services/Filters/getProductsByPrice'

export default function GenerateCard() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { infoSearchedProduct } = useContext(InfoSearchedProduct);
  const {category, setCategory } = useContext(CategoriesContext);
  const {price, setPrice} = useContext(PriceFilterContext);
  const {getAll, setGetAll} = useContext(GetAllProductsContext);
  const {desde, hasta, setDesde, setHasta} = useContext(PaginationContext)
  const [isNear, reference, setStopObserving] = useIsNear()
  const [noMoreProducts, setNoMoreProducts] = useState(false)

  //get all products
  useEffect(() => {
    if(getAll){
      setLoading(true);
      getAllProducts(desde, hasta).then((data) => {
        if(desde === 0)setStopObserving(false)
        if(desde === 0 && data.length === 0){ //si estamos en la primera pagina y no hay productos
          setProduct([])
          setStopObserving(true)  
        }
        if(desde !== 0 && data.length === 0){ //si no estamos en la primera pagina y no hay productos
            setNoMoreProducts(true)
            setStopObserving(true)
        }
        if(desde !== 0 && data.length > 0){ //si no estamos en la primera pagina y no hay productos
          setProduct(products.concat(data))
        }
        if(desde === 0 && data.length > 0){  //si estamos en la primera pagina y hay productos
          setProduct(data)
        }
        setLoading(false);
        setPrice(null)
        setCategory(null)
      });
    }
  }, [getAll, desde]);

   //get the products by category
   useEffect(() => {
    if(category !== null){
    setLoading(true);
      getProductsByCategory(category, desde, hasta).then((data) => {
        if(desde === 0)setStopObserving(false)
        if(desde === 0 && data.length === 0){ //si estamos en la primera pagina y no hay productos
          setProduct([])
          setStopObserving(true)  
        }
        if(desde !== 0 && data.length === 0){ //si no estamos en la primera pagina y no hay productos
            setNoMoreProducts(true)
            setStopObserving(true)
        }
        if(desde !== 0 && data.length > 0){ //si no estamos en la primera pagina y hay productos
          setProduct(products.concat(data))
        }
        if(desde === 0 && data.length > 0){ //si estamos en la primera pagina y hay productos
          setProduct(data)
        }
        setLoading(false);
        setPrice(null)
        setGetAll(false)
      })
    }
  },[category, desde]);

  //get the products by price
  useEffect(() => {
    if(price !== null){
      setLoading(true);
        getProductsByPrice(price, desde, hasta).then((data) => {
          if(desde === 0)setStopObserving(false)
          if(desde === 0 && data.length === 0){ //si estamos en la primera pagina y no hay productos
            setProduct([])
            setStopObserving(true)  
          }
          if(desde !== 0 && data.length === 0){ //si no estamos en la primera pagina y no hay productos
              setNoMoreProducts(true)
              setStopObserving(true)
          }
          if(desde !== 0 && data.length > 0){ //si no estamos en la primera pagina y hay productos
            setProduct(products.concat(data))
          }
          if(desde === 0 && data.length > 0){ 
            setProduct(data)
          }
          setLoading(false);
          setCategory(null)
          setGetAll(false)
        })
    }
  },[price, desde]);

  //search the product that the user input on search field
  useEffect(() => {
    setProduct(infoSearchedProduct);
  }, [infoSearchedProduct]);

  useEffect(() => {
    if(isNear){
      handleNextPage()
    }
  },[isNear])

  function handleNextPage(){
    setDesde(desde + 24)
    setHasta(hasta + 24)
  }

  return (
    <div>
      {loading ? (
        <div className="cargando">
          <ProgresGif />
        </div>
      ) : null}
      <div className=" ProductsContainer row justify-content-center">
        {products[0] === "Not Found" || products.length === 0
          ? <div className = 'NotFoundMessage'><strong>No hay productos</strong></div>
          : products.map((product) => <Card key={product.id} {...product} />)}
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

import React, { useEffect, useState, useContext} from "react";
import ProgresGif from "../ProgresGif";
import CategoriesContext from "../../context/CategoriesContext";
import PriceFilterContext from "../../context/PriceFilterContext";
import GetAllProductsContext from "../../context/GetAllProductsContext";
import InfoSearchedProduct from "../../context/InfoSearchedProduct";
import Card from '../Card'
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "./index.css";
//import all filters services
import getAllProducts from '../../services/Filters/getAllProducts'
import getProductsByCategory from '../../services/Filters/getProductsByCategory'
import getProductsByPrice from '../../services/Filters/getProductsByPrice'

export default function GenerateCard({startRef}) {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { infoSearchedProduct } = useContext(InfoSearchedProduct);
  const {category, setCategory } = useContext(CategoriesContext);
  const {price, setPrice} = useContext(PriceFilterContext);
  const {getAll, setGetAll} = useContext(GetAllProductsContext);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(24);

  //get all products
  useEffect(() => {
    if(getAll){
      setLoading(true);
      getAllProducts(desde, hasta).then((data) => {
        setProduct(data);
        setLoading(false);
        setPrice(null)
        setCategory(null)
        startRef.current.scrollIntoView({block:'center',inline:"center"});
      });
    }
  }, [getAll, desde]);

   //get the products by category
   useEffect(() => {
    if(category !== null){
    setLoading(true);
      getProductsByCategory(category, desde, hasta).then((data) => {
        setProduct(data);
        setLoading(false);
        setPrice(null)
        setGetAll(false)
        startRef.current.scrollIntoView({block:'center',inline:"center"});
      })
    }
  },[category, desde]);

  //get the products by price
  useEffect(() => {
    if(price !== null){
      setLoading(true);
        getProductsByPrice(price, desde, hasta).then((data) => {
          setProduct(data);
          setLoading(false);
          setCategory(null)
          setGetAll(false)
          startRef.current.scrollIntoView({block:'center',inline:"center"});
        })
    }
  },[price, desde]);

  //search the product that the user input on search field
  useEffect(() => {
    setProduct(infoSearchedProduct);
  }, [infoSearchedProduct]);

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
      <div className = 'next-page-button-container'>
        {hasta > 24 ? (
          <button className = 'btn btn-primary next-page-button' onClick={() => {
            setDesde(desde - 24)
            setHasta(hasta - 24)
          }}>Preview Page</button>
        ) : null}
        {products.length >= 24 ? (
          <button
            className = 'btn btn-primary next-page-button'
            onClick={() => {
              setDesde(desde + 24);
              setHasta(hasta + 24)
            }}
          >
            Next Page
          </button>
        ) : null}
      </div>
    </div>
  );
}

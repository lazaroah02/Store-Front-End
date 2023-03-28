import React, { useEffect, useState, useContext} from "react";
import GetProducts from "../../services/getProducts";
import ProgresGif from "../ProgresGif";
import CategoriesContext from "../../context/CategoriesContext";
import InfoSearchedProduct from "../../context/InfoSearchedProduct";
import Card from '../Card'
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "./index.css";

export default function GenerateCard({startRef}) {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useContext(CategoriesContext);
  const { infoSearchedProduct } = useContext(InfoSearchedProduct);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(25);
  //get all products of the store and then put on the state
  useEffect(() => {
    setLoading(true);
    GetProducts(category, desde, hasta).then((data) => {
      setProduct(data);
      setLoading(false);
      startRef.current.scrollIntoView({block:'center',inline:"center"});
    });
  }, [category, desde]);

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
        {hasta > 25 ? (
          <button className = 'btn btn-primary next-page-button' onClick={() => {
            setDesde(desde - 25)
            setHasta(hasta - 25)
          }}>Preview Page</button>
        ) : null}
        {products.length >= 25 ? (
          <button
            className = 'btn btn-primary next-page-button'
            onClick={() => {
              setDesde(desde + 25);
              setHasta(hasta + 25)
            }}
          >
            Next Page
          </button>
        ) : null}
      </div>
    </div>
  );
}

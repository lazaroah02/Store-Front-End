import React, { useEffect, useState, useContext, Suspense } from "react";
import GetProducts from "../../services/getProducts";
import ProgresGif from "../ProgresGif";
import Chargincards from '../CharginCards'
import CategoriesContext from "../../context/CategoriesContext";
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "./index.css";
import InfoSearchedProduct from "../../context/InfoSearchedProduct";

export default function GenerateCard() {
  const Card = React.lazy(() => import('../Card'))
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useContext(CategoriesContext);
  const { infoSearchedProduct } = useContext(InfoSearchedProduct);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(25);

  useEffect(() => {
    setLoading(true);
    GetProducts(category, desde, hasta).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [category, desde]);

  useEffect(() => {
    setProduct(infoSearchedProduct);
  }, [infoSearchedProduct]);

  return (
    <div>
      <p id = 'start'></p>
      {loading ? (
        <div className="cargando">
          <ProgresGif />
        </div>
      ) : null}
      <div className=" ProductsContainer row justify-content-center">
        {products[0] === "Not Found" || products.length === 0
          ? <div className = 'NotFoundMessage'><strong>No hay productos</strong></div>
          : products.map((product) => <Suspense fallback = {<Chargincards/>}><Card key={product.id} {...product} /></Suspense>)}
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

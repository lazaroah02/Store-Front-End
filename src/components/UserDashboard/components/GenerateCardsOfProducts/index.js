import React, { useEffect, useState, useContext, Suspense } from "react";
import GetProductsOfSeller from "../../../../services/getProductsOfSeller";
import ProgresGif from "../../../ProgresGif";
import Chargincards from '../../../CharginCards'
import "./index.css";

export default function GenerateCard({updateProducts}){
  const Card = React.lazy(() => import('../CardOfProduct'))
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(25);

  useEffect(() => {
    if(updateProducts === true){
      setLoading(true);
      GetProductsOfSeller(desde, hasta).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }   
  }, [desde, updateProducts]);

  return (
    <div>
      {loading ? (
        <div className="cargando">
          <ProgresGif />
        </div>
      ) : null}
      <div className=" SellerProductsContainer">
        {products[0] === "Not Found" || products.length === 0 || products === undefined || products === null || products.detail === 'Invalid token.'
          ? <div className = 'NotFoundMessage'><strong>No tienes porductos</strong></div>
          : products.map((product) => <Suspense key={product.id} fallback = {<Chargincards/>}><Card key={product.id} {...product} /></Suspense>)}
      </div>
      <div className = 'next-page-button-container'>
        {hasta > 25 ? (
          <button className = 'btn btn-primary' onClick={() => {
            setDesde(desde - 25)
            setHasta(hasta - 25)
          }}>Preview Page</button>
        ) : null}
        {products.length >= 25 ? (
          <button
            className = 'btn btn-primary'
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

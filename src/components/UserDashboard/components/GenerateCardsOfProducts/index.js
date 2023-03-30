import React, { useEffect, useState} from "react";
import GetProductsOfSeller from "../../../../services/getProductsOfSeller";
import ProgresGif from "../../../ProgresGif";
import Card from '../CardOfProduct'
import "./index.css";

export default function GenerateCard({updateProducts}){
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(24);

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
      <div className=" SellerProductsContainer row justify-content-center">
        {products[0] === "Not Found" || products.length === 0 || products === undefined || products === null || products.detail === 'Invalid token.'
          ? <div className = 'NotFoundMessage'><strong>No tienes porductos</strong></div>
          : products.map((product) =><Card key={product.id} {...product} />)}
      </div>
      <div className = 'next-page-button-container'>
        {hasta > 24 ? (
          <button className = 'btn btn-primary' onClick={() => {
            setDesde(desde - 24)
            setHasta(hasta - 24)
          }}>Preview Page</button>
        ) : null}
        {products.length >= 24 ? (
          <button
            className = 'btn btn-primary'
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

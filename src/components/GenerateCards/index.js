import React from "react";
import Loader from "../Loader";
import Card from '../Card'
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "./index.css";

export default function GenerateCard({products, loading, favoriteProducts = null}) {
  return (
    <>
      {loading ? (
        <div className="cargando">
          <Loader />
        </div>
      ) : null}
      <div className=" ProductsContainer row justify-content-center">
        {products !== null && products !== undefined?
          <>
            {products.length > 0?products.map((product) => <Card key={product.id} {...product} favoriteProducts = {favoriteProducts}/>)
            :
            <div className = 'NotFoundMessage'><strong>No hay productos</strong></div>}
          </>
          :<div className = 'NotFoundMessage'><strong>No hay productos</strong></div>
        }
      </div>
      {loading ? (
        <div className="cargando">
          <Loader />
        </div>
      ) : null}
    </>
  );
}

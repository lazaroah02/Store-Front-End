import React, { useEffect, useState} from "react";
import ProgresGif from "../ProgresGif";
import Card from '../Card'
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "./index.css";
import getProducts from "../../services/getProducts";


export default function GenerateCard({keyword}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    getProducts(keyword.filters)
    .then(data => {
      setProducts(data.results)
      setLoading(false)
    })
  }, [keyword])

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
    </div>
  );
}

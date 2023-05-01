import React, { useEffect, useState} from "react";
import Loader from "../Loader";
import Card from '../Card'
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "./index.css";
import getProducts from "../../services/getProducts";


export default function GenerateCard({keyword, setPageSize, startRef}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    getProducts(keyword.filters)
    .then(data => {
      setPageSize(data.count)
      setProducts(data.results)
      setLoading(false)
      startRef.current.scrollIntoView({block:'center',inline:"center"})
    })
    .catch(() => {
      setLoading(false)
      setPageSize(0)
    })
  }, [keyword])

  return (
    <div>
      {loading ? (
        <div className="cargando">
          <Loader />
        </div>
      ) : null}
      <div className=" ProductsContainer row justify-content-center">
        {products.length > 0?products.map((product) => <Card key={product.id} {...product} />)
        :
        <div className = 'NotFoundMessage'><strong>No hay productos</strong></div>}
      </div>
      {loading ? (
        <div className="cargando">
          <Loader />
        </div>
      ) : null}
    </div>
  );
}

import React, { useEffect, useState, useContext } from "react";
import GetProducts from "../../services/getProducts";
import ProgresGif from "../ProgresGif";
import Card from "../Card";
import CategoriesContext from "../../context/CategoriesContext";
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "./index.css";
import InfoSearchedProduct from "../../context/InfoSearchedProduct";

export default function GenerateCard() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useContext(CategoriesContext);
  const { infoSearchedProduct } = useContext(InfoSearchedProduct);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    GetProducts(category, page).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [category, page]);

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
          ? <div className = 'NotFoundMessage'><strong>Not Found</strong></div>
          : products.map((product) => <Card key={product.id} {...product} />)}
      </div>
      <div className = 'next-page-button-container'>
        {page > 1 ? (
          <button className = 'btn btn-primary' onClick={() => setPage(page - 1)}>Preview Page</button>
        ) : null}
        {products.length >= 20 ? (
          <button
            className = 'btn btn-primary'
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next Page
          </button>
        ) : null}
      </div>
    </div>
  );
}

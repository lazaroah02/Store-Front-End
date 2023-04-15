import React, {useContext} from "react";
import "./index.css";
import GetAllProductsContext from '../../../context/GetAllProductsContext'
import PaginationContext from "../../../context/PaginationContext"

export default function AllFilter() {
  const {setGetAll} = useContext(GetAllProductsContext)
  const {setDesde, setHasta} = useContext(PaginationContext)
  return (
    <div className = "all-container">
       <button className = "AllFilter" onClick = {() => {
        setDesde(0)
        setHasta(24)
        setGetAll(true)}
        }>All</button>
    </div>
  );
}
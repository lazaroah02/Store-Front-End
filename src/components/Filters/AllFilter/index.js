import React, {useContext} from "react";
import "./index.css";
import GetAllProductsContext from '../../../context/GetAllProductsContext'

export default function AllFilter() {
  const {setGetAll} = useContext(GetAllProductsContext)
  return (
    <div className = "all-container">
       <button className = "AllFilter" onClick = {() => setGetAll(true)}>All</button>
    </div>
  );
}
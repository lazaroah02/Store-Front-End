import React, {useContext} from "react";
import "./index.css";
import CategoriesContext from '../../../context/CategoriesContext'

export default function AllFilter() {
  const {setCategory} = useContext(CategoriesContext)
  return (
    <div className = "all-container">
       <button className = "AllFilter" onClick = {() => setCategory(0)}>All</button>
    </div>
  );
}
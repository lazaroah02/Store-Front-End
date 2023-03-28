import React, {useContext} from "react";
import "./index.css";
import CategoriesContext from '../../../context/CategoriesContext'

export default function AllFilter() {
  const {category, setCategory} = useContext(CategoriesContext)

  function handleSetCategory(){
    if(category === null){
      setCategory(0)
    }
    else{
      setCategory(null)
    }
  }

  return (
    <div className = "all-container">
       <button className = "AllFilter" onClick = {() => handleSetCategory(0)}>All</button>
    </div>
  );
}
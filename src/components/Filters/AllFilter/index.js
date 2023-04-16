import React, {useContext} from "react";
import "./index.css";
import ActualFilterContext from "../../../context/ActualFilterContext"

export default function AllFilter() {
  const {setActualFilter} = useContext(ActualFilterContext)
  return (
    <div className = "all-container">
       <button className = "AllFilter" onClick = {() => {setActualFilter({filter:null, value:null})}}>All</button>
    </div>
  );
}
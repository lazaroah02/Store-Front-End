import React, {useEffect} from "react";
import {useLocation, useNavigate} from 'react-router-dom'
import { createNewPathName } from "../../createNewPathName";

export default function OrderBy({filterToRemove}) {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const orderByList = [
    {id:1, value : "precio", buttonText : "Menor Precio"},
    {id:2, value : "-precio", buttonText : "Mayor Precio"},
    {id:3, value : "-updated_at", buttonText : "Mas recientes"},
    {id:4, value : "updated_at", buttonText : "Menos recientes"},
    {id:5, value : "product_name", buttonText : "Alfabeticamente [A-Z]"},
    {id:6, value : "-product_name", buttonText : "Alfabeticamente [Z-A]"},
  ]
  
  useEffect(() => {
    if(filterToRemove === "ordering"){
      handleSetOrderBy("")
    }
  },[filterToRemove])

  function handleSetOrderBy(value){
    navigate(createNewPathName(pathname, "ordering", value))
  }
  return (
    <div>
      <li className="nav-item dropdown">
        <button
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Ordenar por
        </button>
        <ul className="dropdown-menu">
          <li>
            <button onClick={() => handleSetOrderBy("")} className="dropdown-item">None</button>
          </li>
          {orderByList.map(orderBy => 
            <li key = {orderBy.id}>
              <button onClick={() => handleSetOrderBy(orderBy.value)} className="dropdown-item">{orderBy.buttonText}</button>
            </li>)}
        </ul>
      </li>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import getCategories from "../../../../services/getCategories";
import ProgresGif from "../../../ProgresGif";
import { useNavigate, useLocation } from "react-router-dom";
import {createNewPathName} from '../../createNewPathName'

export default function CategoriesFilter({filterToRemove}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const {pathname} = useLocation()

  useEffect(() => {
    if(filterToRemove === "categoria"){
      handleSetCategory("")
    }
  },[filterToRemove])

  function handleGetCategories() {
    if(categories.length === 0){
        getCategories().then((data) => {
          setLoading(false);
          setCategories(data);
        });
    }
  }

  function handleSetCategory(category_id) {
    //inserto el filtro en la nueva ruta
    navigate(createNewPathName(pathname, "categoria", category_id));
  }

  return (
    <div>
      <li className="nav-item dropdown">
        <button
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={() => handleGetCategories()}
        >
          Categorias
        </button>
        <ul className="dropdown-menu">
          {loading ? (
            <ProgresGif />
          ) : (
            <>
              {categories.length > 0 ? (
                <div>
                  <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleSetCategory("")}
                      >
                        All
                      </button>
                    </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleSetCategory(category.id)}
                      >
                        {category.nombre}
                      </button>
                    </li>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </ul>
      </li>
    </div>
  );
}

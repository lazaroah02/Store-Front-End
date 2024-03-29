import React, { useState, useEffect } from "react";
import Loader from "../../../Loader";
import { useNavigate, useLocation } from "react-router-dom";
import {createNewPathName} from '../../../../helpFunctions/createNewPathName'
import Modal from 'react-bootstrap/Modal'
import {useCategories} from '../../../../customHooks/useCategories'
import './index.css'

export default function CategoriesFilter({activeFilters}) {
  const {categories, loadingCategories} = useCategories()
  const [showModal, setShowModal] = useState(false)
  const [actualCategory, setActualCategory] = useState("Todas")
  const navigate = useNavigate()
  const {pathname} = useLocation()

  //useEffect para recuperar la categoria actual
  useEffect(() => {
    if(categories.length > 0){
      let categoryUrlId = ""
      let category = "Todas"
      //recorro la lista de filtros actuales para ver si esta categoria
      for(let i = 0; i < activeFilters.length; i++){
        if(activeFilters[i].filter === "categoria") categoryUrlId = activeFilters[i].value
      }
      //recupero de la lista de categorias el nombre para mostrarlo
      for(let i = 0; i < categories.length; i++){
        if(`${categories[i].id}` === categoryUrlId) category = categories[i].nombre
      }
      setActualCategory(category)
    }
  },[activeFilters, categories])

  //funcion para inyectar en la url la categoria seleccionada para filtrar
  function handleSetCategory(category_id) {
    //inserto el filtro en la nueva ruta
    setShowModal(false)
    let pathNameWithPage1 = createNewPathName(pathname, "page", 1)
    navigate(createNewPathName(pathNameWithPage1, "categoria", category_id));
  }

  return (
    <div className = "filter">
        <button className = "btn" onClick={() => setShowModal(true)}
        >
          Categoria: {actualCategory}
        </button>

        <Modal show={showModal}>
          <Modal.Header className="categories-modal-header">
            <div>Categorias</div>
            <button className = "btn close-categories-modal-button" onClick={() => setShowModal(false)}>X</button>
          </Modal.Header>

          <Modal.Body>
            {loadingCategories ? 
            <div className = "loader-container">
              <Loader/>
            </div>
             : (
              <>
                {categories.length > 0 ? (
                  <div>
                      <div className = "category"
                        onClick={() => handleSetCategory("")}>
                        Todas
                      </div>
                    
                    {categories.map((category) => (
                        <div
                          className="category"
                          key={category.id}
                          onClick={() => handleSetCategory(category.id)}>
                          {category.nombre}
                        </div>
                    ))}
                  </div>
                ) : null}
              </>
            )}
          </Modal.Body>
        </Modal>
    </div>
  );
}

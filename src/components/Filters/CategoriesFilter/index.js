import getCategories from "../../../services/getCategories";
import React, { useState, useEffect, useContext} from "react";
import Modal from 'react-bootstrap/modal'
import "./index.css";
import { ModalBody, ModalTitle } from "react-bootstrap";
import CategoriesContext from '../../../context/CategoriesContext'
import PaginationContext from "../../../context/PaginationContext"

export default function CategoriesFilter() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const {setCategory} = useContext(CategoriesContext)
  const {setDesde, setHasta} = useContext(PaginationContext)
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <div className = "category-container">
       <button className = "CategoriesFilter" onClick = {() => setShowModal(true)}>Categories</button>
       <Modal show = {showModal}>
          <Modal.Header>
              <ModalTitle>Categories</ModalTitle>
              <button className = "btn btn-danger" onClick = {() => setShowModal(false)}>X</button>
          </Modal.Header>
          <ModalBody>
            <ul>
              {categories.map(category => 
              <li key = {category.id} className = "category" onClick = {() => {
                setDesde(0)
                setHasta(24)
                setCategory(category.id)
                setShowModal(false)
                }}>
                {category.nombre}
              </li>)}
            </ul>
          </ModalBody>
       </Modal>
    </div>

  );
}
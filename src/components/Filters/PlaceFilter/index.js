import getCategories from "../../../services/getCategories";
import React, { useState, useEffect, useContext} from "react";
import Modal from 'react-bootstrap/modal'
import "./index.css";
import { ModalBody, ModalTitle } from "react-bootstrap";
import CategoriesContext from '../../../context/CategoriesContext'

export default function PlaceFilter() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const {setCategory} = useContext(CategoriesContext)
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <div className = "place-container">
       <button className = "PlaceFilter" onClick = {() => setShowModal(true)}>Place</button>
       <Modal show = {showModal}>
          <Modal.Header>
              <ModalTitle>Categories</ModalTitle>
              <button className = "btn btn-danger" onClick = {() => setShowModal(false)}>X</button>
          </Modal.Header>
          <ModalBody>
            <ul>
              {categories.map(category => 
              <li key = {category.id} className = "place" onClick = {() => {
                setCategory(category.id)
                setShowModal(false)
                }}>
                {category.name}
              </li>)}
            </ul>
          </ModalBody>
       </Modal>
    </div>

  );
}
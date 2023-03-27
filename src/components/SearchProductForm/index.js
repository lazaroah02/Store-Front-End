import React, {useContext, useState} from 'react';
import {useLocation} from 'wouter'
import searchAnProduct from '../../services/searchAnProduct'
import InfoSearchedProduct from '../../context/InfoSearchedProduct'
import CategoriesContext from '../../context/CategoriesContext'
import Modal from 'react-bootstrap/Modal'
import './index.css'
import { ModalHeader } from 'react-bootstrap';
import searchIcon from '../../assets/navBarIcons/search-regular-24.png'

export default function SearchProductForm(){
    const [showModal, setShowModal] = useState(false)
    const {setInfoSearchedProduct} = useContext(InfoSearchedProduct)
    const {setCategory} = useContext(CategoriesContext)
    const [location, setLocation] = useLocation()
    const [loading, setLoading] = useState(false)
    
    function handleSearchSubmit(e){
        e.preventDefault()
        let nameProduct = e.target[0].value
        if(nameProduct === ''){
            if(location === '/About_us' || location === '/login' || location === '/register'){
                setLocation('/')
            }
            else{
                setCategory()
            }
        }
        else{
            setLoading(true)
            searchAnProduct(nameProduct)
            .then(data => {
                setInfoSearchedProduct(data)
                setLoading(false)
            })
            .catch(err => {
                setInfoSearchedProduct(['Not Found'])
                setLoading(false)
            })
        } 
    }
    function goTop(){
        let start = document.getElementById('start')
        start.scrollIntoView({behavior:"smooth", block:'center',inline:"center"})
    }
    return(
        <div>
            <div onClick = {() => setShowModal(true)}>
                <img alt = "buscar" src = {searchIcon}/>
            </div>
            <Modal show = {showModal}>
                <ModalHeader>
                    <Modal.Title>
                        Search
                    </Modal.Title>
                    <button className = "CloseModalButton btn btn-danger" onClick={() => setShowModal(false)}>X</button>
                </ModalHeader>
                <Modal.Body>
                    <form className="d-flex SearchForm" onSubmit = {(e) => handleSearchSubmit(e)}>
                        <input className="form-control me-2" placeholder="Search a product" />
                        <button className="btn btn-success" onClick = {() => 
                            {setShowModal(false) 
                            goTop()}}>
                                {loading?'Cargando...':'Search'}</button>
                    </form>
                </Modal.Body>
            </Modal> 
      </div>
    )
}
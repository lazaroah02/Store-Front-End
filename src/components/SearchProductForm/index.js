import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import './index.css'
import { ModalHeader } from 'react-bootstrap';
import searchIcon from '../../assets/navBarIcons/search-icon.svg'

export default function SearchProductForm(){
    const [showModal, setShowModal] = useState(false)
    const [searchMode, setSearchMode] = useState("Desktop")
    const navigate = useNavigate()

    useEffect(() => {
        if(window.innerWidth <= 1000){
            setSearchMode("Mobile")
        }
    },[])
    
    function handleSearchSubmit(e){
        e.preventDefault()
        let nameProduct = e.target[0].value
        navigate(`/products/search=${nameProduct}`)
    }
    return(
        <div>
            {searchMode === "Desktop"? 
            <>
            {/*Desktop Search*/}
                <div className = "search-form-desktop-container">
                    <form className="d-flex SearchForm" onSubmit = {(e) => handleSearchSubmit(e)}>
                        <input className="form-control me-2" placeholder="Search a product"/>
                        <button className="btn" onClick = {() => {
                            setShowModal(false) 
                            }}><img alt = "buscar" src = {searchIcon}/></button>
                    </form>
                </div>
            </>
            :
            <>
            {/*Mobile search*/}
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
                            <input className="form-control me-2" placeholder="Search a product"/>
                            <button className="btn" onClick = {() => {
                                setShowModal(false) 
                                }}>Search</button>
                        </form>
                    </Modal.Body>
                </Modal> 
            </>}
      </div>
    )
}
import React, {useContext, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import ActualFilterContext from '../../context/ActualFilterContext'
import Modal from 'react-bootstrap/Modal'
import './index.css'
import { ModalHeader } from 'react-bootstrap';
import searchIcon from '../../assets/navBarIcons/search-icon.svg'

export default function SearchProductForm(){
    const [showModal, setShowModal] = useState(false)
    const {setActualFilter} = useContext(ActualFilterContext)
    const navigate = useNavigate()
    const location = useLocation()
    
    function handleSearchSubmit(e){
        e.preventDefault()
        let nameProduct = e.target[0].value
        if(nameProduct === ""){
            if(location.pathname !== ""){
                navigate('/')
            }
            else{
                setActualFilter({filter:null, value:null})
                goTop()
            }
        }
        else{
            if(location.pathname !== ""){
                navigate('/')
            }
            else{
                setActualFilter({filter:"search", value: nameProduct})
                goTop()
            }
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
                        <input className="form-control me-2" placeholder="Search a product"/>
                        <button className="btn btn-success" onClick = {() => {
                            setShowModal(false) 
                            }}>Search</button>
                    </form>
                </Modal.Body>
            </Modal> 
      </div>
    )
}
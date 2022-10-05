import React, {useState, useContext, useEffect} from 'react'
import './index.css'
import Modal from 'react-bootstrap/Modal'
import InfoUserContext from '../../context/InfoUserContext'
import getInfoUser from '../../services/getInfoUser'
import Cart from '../Cart'

export default function LogoProfile(){
    const [showModal, setShowModal] = useState(false)
    const [infoUser, setInfoUser] = useState({})
    const {token} = useContext(InfoUserContext)

    useEffect(function(){
        getInfoUser(token)
        .then(data => {
            setInfoUser(data)    
        })
    },[token])

    return(
        <div>
            <div >
                <Cart/>
                <div className = "LogoProfile" onClick = {() => setShowModal(true)}></div>
                
            </div>
            <Modal show = {showModal}>
            <Modal.Header>
                <Modal.Title>
                    Info User
                </Modal.Title>
                <button class = "CloseModalButton btn btn-danger" onClick={() => setShowModal(false)}>X</button>
            </Modal.Header>
            <Modal.Body>
                <div>
                <p>Name: {infoUser?infoUser.username:""}</p> 
                <p>Last name: Altedill</p>
                <p>Email: {infoUser?infoUser.email:""}</p>
                <p>Phone: +53 51706583</p>
                </div>
                <button className = "btn btn-primary" onClick={() => alert("Cuidao")}>Edit info</button>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
        </div>
    )
}
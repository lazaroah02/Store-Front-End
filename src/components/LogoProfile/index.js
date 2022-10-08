import React, {useState, useContext, useEffect} from 'react'
import './index.css'
import Modal from 'react-bootstrap/Modal'
import InfoUserContext from '../../context/InfoUserContext'
import UserTokenContext from '../../context/UserTokenContext'
import getInfoUser from '../../services/getInfoUser'
import Cart from '../Cart'

export default function LogoProfile(){
    const [showModal, setShowModal] = useState(false)
    const [info, setInfo] = useState({})
    const {infoUser, setInfoUser} = useContext(InfoUserContext)
    const {token} = useContext(UserTokenContext)

    useEffect(function(){
        if(infoUser == undefined || infoUser == null){
            getInfoUser(token)
            .then(data => {
                setInfo(data)
                setInfoUser(data)    
            })
        }
        else{
            setInfo(infoUser)
        }    
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
                <p>Username: {info?info.username:""}</p> 
                <p>Name: {info?info.first_name:""}</p> 
                <p>Last Name:{info?info.last_name:""}</p>
                <p>Email: {info?info.email:""}</p>
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
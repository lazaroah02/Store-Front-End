import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import InfoIcon from '../../../assets/info-icon.svg'
import './index.css'

export default function StartAChatInformation(){
    const [showModal, setShowModal] = useState(false)
    return(
        <div className = "show-info-start-a-chat">
            <img src = {InfoIcon} alt = "info-icon" onClick={() => setShowModal(true)}/>
            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>
                        Info
                    </Modal.Title>
                    <button className = "btn btn-danger" onClick={() =>setShowModal(false)}>X</button>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Dialog>Para iniciar una conversacion con un vendedor dirigete al detalle del 
                        producto que deseas comprar y veras un boton para iniciar una conversacion con el vendedor.
                    </Modal.Dialog>
                    <Modal.Dialog>Si eres vendedor, dirigete a tu lista de ordenes en tu panel de usuario y ahi veras los clientes con los que puedes hablar.
                    </Modal.Dialog>
                </Modal.Body>
            </Modal>
        </div>
    )
}
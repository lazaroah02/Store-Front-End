import React, {useState ,useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import InfoUserContext from '../../../../context/InfoUserContext'
import Modal from 'react-bootstrap/Modal'
import './index.css'
import editInfoUser from '../../../../services/editInfoUser'

export default function EditInfoUser(){
    const {infoUser, setInfoUser} = useContext(InfoUserContext)
    const [info, setInfo] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [editingField, setEditing] = useState([])
    
    useEffect(() => {
      setInfo(infoUser.info)
    },[infoUser])

    function saveInfo(){
      let temporalInfo = Object.create(info)
      temporalInfo[editingField[0]] = editingField[1]

      editInfoUser('PUT', temporalInfo)
      .then(res => {
        if(res.status === 200){
          setInfo(temporalInfo)
          setInfoUser({info:temporalInfo, token:infoUser.token})
          setShowModal(false)
        }
      })
    }

    return (
        <div style={{paddingTop:'3rem'}}>
          <div className="card Foot">
                <p>
                  <span className="align-center">Go back to home</span>
                  <Link className="GoHomeLink align-center" to="/">
                    Home
                  </Link>
                </p>
              </div>
          <div className="card FormInfoContainer container">
            <div className="card-body">
              <div className="FormInfoTitle">
                <h4>Info User</h4>
              </div>
              <div className = 'infoContainer'>
                <p>Username: {info !== null?info.username: ''}</p>
                <p>Email: {info !== null?info.email: ''}</p>
                <br/>
                <strong>Information of Contact</strong>
                <hr/>
                <p>Name: {info !== null?info.name: ''} 
                  {info !== null?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setEditing(['name',info.name])
                    setShowModal(true)
                  }}><span>Edit</span></button>
                  :null}
                </p>
                <p>Last name:  {info !== null?info.last_name: ''}
                  {info !== null?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setShowModal(true)
                    setEditing(['last_name',info.last_name])}}><span>Edit</span></button>
                  :null}
                </p>
                <p>Country:  {info !== null? info.country: ''}
                  {info !== null?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setShowModal(true)
                    setEditing(['country',info.country])
                  }}><span>Edit</span></button>
                  :null}
                </p>
                <p>State:  {info !== null?info.state: ''}
                  {info !== null?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setShowModal(true)
                    setEditing(['state',info.state])}}><span>Edit</span></button>
                  :null}
                </p>
                <p>Address: {info !== null?info.address: ''}
                  {info !== null?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setShowModal(true)
                    setEditing(['address',info.address])}}><span>Edit</span></button>
                  :null}
                </p>
                <p>Zip Code: {info !== null? info.zip_code: ''}
                  {info !== null?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setShowModal(true)
                    setEditing(['zip_code',info.zip_code])}}><span>Edit</span></button>
                  :null}
                </p>
                <p>Phone: {info !== null? info.phone: ''}
                  {info !== null?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setShowModal(true)
                    setEditing(['phone',info.phone])}}><span>Edit</span></button>
                  :null}
                </p>
                
              </div>
            </div>
          </div>

          <Modal show = {showModal} >
            <Modal.Header>
              <Modal.Title></Modal.Title>
              <button className = 'btn btn-danger' onClick = {() => setShowModal(false)}>X</button>
            </Modal.Header>
            <Modal.Body className = 'ModalEditInfoBody'>
              <input value = {editingField[1]} onChange = {(e) => setEditing([editingField[0],e.target.value])}></input>
              <button className = 'btn btn-primary' onClick = {() => saveInfo()}>Save</button>
            </Modal.Body>
          </Modal>          

        </div>
      );
}
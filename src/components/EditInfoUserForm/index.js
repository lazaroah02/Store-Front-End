import React, {useState ,useContext, useEffect} from 'react';
import {Link} from 'wouter'
import InfoUserContext from '../../context/InfoUserContext'
import Modal from 'react-bootstrap/Modal'
import './index.css'
import editInfoUser from '../../services/editInfoUser'

export default function EditInfoUser(){
    const {infoUser, setInfoUser} = useContext(InfoUserContext)
    const [info, setInfo] = useState(undefined)
    const [showModal, setShowModal] = useState(false)
    const [editingField, setEditing] = useState([])

    useEffect(() => {
      setInfo(infoUser)
    },[infoUser])

    function saveInfo(){
      let temporalInfo = Object.create(info)
      temporalInfo[editingField[0]] = editingField[1]

      editInfoUser('POST', temporalInfo)
      .then(res => {
        if(res.status == 400){
          editInfoUser('PUT', temporalInfo)
          .then(res => {
            if(res.status == 200){
              setInfo(temporalInfo)
              setInfoUser(temporalInfo)
              setShowModal(false)
            }
          })
        }
      })
    }

    return (
        <div >
          <div className="card Foot">
                <p>
                  <span className="align-center">Go back to home</span>
                  <Link className="GoHomeLink align-center" to="/">
                    Home
                  </Link>
                </p>
              </div>
          <div className="card FormInfoContainer container">
            <div class="card-body">
              <div className="FormInfoTitle">
                <h4>Info User</h4>
              </div>
              <div className = 'infoContainer'>
                <p>Username: {info != undefined?info.username: ''}</p>
                <p>Email: {info != undefined?info.email: ''}</p>
                <br/>
                <strong>Information of Contact</strong>
                <hr/>
                <p>Name: {info != undefined?info.name: ''} 
                  {info != undefined?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setEditing(['name',info.name])
                    setShowModal(true)
                  }}><span>Edit</span></button>
                  :null}
                </p>
                <p>Last name:  {info != undefined?info.last_name: ''}
                  {info != undefined?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setShowModal(true)
                    setEditing(['last_name',info.last_name])}}><span>Edit</span></button>
                  :null}
                </p>
                <p>Country:  {info != undefined? info.country: ''}
                  {info != undefined?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setShowModal(true)
                    setEditing(['country',info.country])
                  }}><span>Edit</span></button>
                  :null}
                </p>
                <p>State:  {info != undefined?info.state: ''}
                  {info != undefined?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setShowModal(true)
                    setEditing(['state',info.state])}}><span>Edit</span></button>
                  :null}
                </p>
                <p>Address: {info != undefined?info.address: ''}
                  {info != undefined?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setShowModal(true)
                    setEditing(['address',info.address])}}><span>Edit</span></button>
                  :null}
                </p>
                <p>Zip Code: {info != undefined? info.zip_code: ''}
                  {info != undefined?
                  <button className = 'btn btn-primary' onClick = {() => {
                    setShowModal(true)
                    setEditing(['zip_code',info.zip_code])}}><span>Edit</span></button>
                  :null}
                </p>
                <p>Phone: {info != undefined? info.phone: ''}
                  {info != undefined?
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
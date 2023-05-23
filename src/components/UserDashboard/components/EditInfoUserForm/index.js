import React, {useState ,useContext, useEffect} from 'react';
import InfoUserContext from '../../../../context/InfoUserContext'
import editInfoUser from '../../../../services/editInfoUser'
import Verified from '../../../../assets/verified.svg'
import CheckConfirm from '../../../../assets/check-confirm.svg'
import ShowFloatMessage from '../../../ShowFloatMessage';
import Heart from "../../../../assets/heart.svg"
import History from "../../../../assets/history.svg"
import './index.css'
import '../user-dashboard-panel-styles.css'

export default function EditInfoUser(){
    const {infoUser, setInfoUser} = useContext(InfoUserContext)
    const [info, setInfo] = useState(null)
    const [editingInfo, setEditingInfo] = useState(false)

    //state to show a toast with a message
    const [showToast, setShowToast] = useState(false)
    const [message, showMessage] = useState({title: "", message:""})
    
    useEffect(() => {
      setInfo(infoUser.info)
    },[infoUser])

    function updateInfo({field, value}){
        let temporalInfo = Object.create(info)
        temporalInfo[field] = value
        setInfo(temporalInfo)
    }

    function saveInfo(){
      editInfoUser('PUT', info)
      .then(res => {
        if(res.status === 200){
          setInfoUser({info:info, token:infoUser.token})
          setEditingInfo(false)
          showMessage({title: "!", message: "Informacion Editada Correctamente"})
          setShowToast(true)
        }
        else{
          showMessage({title: "!", message: "Error al editar la información"})
          setShowToast(true)
        }
      })
    }

    return (
        <div className = "user-dashboard-panel-container">
          <ShowFloatMessage show={showToast} setShow = {setShowToast} title = {message.title} message = {message.message}/>
          <main className = "user-dashboard-panel">
            <header className = "info-user-header">
              <div className = "username-and-email-container">
                  <h5>Nombre de usuario: 
                    {info?
                      <>
                        <span>
                          {info.username}
                        </span>
                        {info.is_seller?
                          <img alt = "verified" src = {Verified}/>
                        :null}
                      </>
                    :null}
                  </h5>
                  <h5>Email:<span>{info?info.email:null}</span></h5>
              </div>
              <div className = "historial-and-wishlist-container">
                  <div><span>Lista de Deseos</span><img alt = "wish-list" src = {Heart}/></div>
                  <div><span>Historial de Pedidos</span><img alt = "pedidos" src = {History}/></div>
              </div>
            </header>
              <div className = "separator"></div>
              <form className = "form-info-user" onSubmit={(e) => saveInfo(e)}>
                <div>
                  <label>Nombre Completo</label>
                  <br/>
                  <input className = "input-form name-input" disabled = {!editingInfo} value = {info?info.name:""} onChange = {(e) => updateInfo({field:"name", value:e.target.value})}/>
                </div>
                <section className = "country-and-city-container">
                  <div>
                    <label>Pais:</label>
                    <br/>
                    <input className = "input-form" disabled = {!editingInfo} value = {info?info.country:""} onChange = {(e) => updateInfo({field:"country", value:e.target.value})}/>
                  </div>
                  <div>
                    <label>Ciudad:</label>
                    <br/>
                    <input className = "input-form" disabled = {!editingInfo} value = {info?info.state:""} onChange = {(e) => updateInfo({field:"state", value:e.target.value})}/>
                  </div>
                </section>
                <div>
                  <label>Dirección:</label>
                  <br/>
                  <input className = "address-input input-form" disabled = {!editingInfo} value = {info?info.address:""} onChange = {(e) => updateInfo({field:"address", value:e.target.value})}/>
                </div>
                <section className = "phone-and-zip-code-container">
                  <div>
                    <label>Telefono:</label>
                    <br/>
                    <input className = "input-form" disabled = {!editingInfo} value = {info?info.phone:""} onChange = {(e) => updateInfo({field:"phone", value:e.target.value})}/>
                  </div>
                  <div>
                    <label>Codigo Postal:</label>
                    <br/>
                    <input className = "input-form" disabled = {!editingInfo} value = {info?info.zip_code:""} onChange = {(e) => updateInfo({field:"zip_code", value:e.target.value})}/>
                  </div>
                </section>
              </form>
              <div className = "buttons-container">
                <button className = "btn btn-edit-info" onClick={() => setEditingInfo(!editingInfo)}>{!editingInfo?'Editar Info':'Cancelar'}</button>
                <button className = "btn btn-success btn-save-info" style = {!editingInfo?{display:"none"}:null} onClick = {() => saveInfo()}>
                  Guardar
                  <img alt = "check" src = {CheckConfirm}/>
                </button>
              </div>
          </main>
        </div>
      );
}
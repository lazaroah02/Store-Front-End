import React, {useState} from "react";
import "./index.css";
import sendEmail from '../../services/sendEmail'
import ProgresGif from '../ProgresGif'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false)
  const idioma = 'es';

  const [showErrorEmail, setErrorEmail] = useState(true)
  const [showErrorTopic, setErrorTopic] = useState(true)
  const [showErrorMessage, setErrorMessage] = useState(true)

  function handleSubmit(event) {
    event.preventDefault();
    if(email === ''){
      setErrorEmail(false)
    }
    else if(topic.length > 200 || topic.length === 0){
      setErrorTopic(false)
    }
    else if(message.length > 10000 || message.length === 0){
      setErrorMessage(false)
    }
    else{
      setLoading(true)
      sendEmail({email:email, topic:topic, message:message})
      .then(data => {
        setLoading(false)
        if(data.status != 200){
          if(idioma === 'es' || idioma === 'undefined' || idioma === 'null'){
           alert('Error al enviar el correo. Si el error persiste, use los links de el pie de la página')
           }
          if(idioma === 'en'){
           alert("Error to send the email. If the error persists, use the links below on the page")
           }
          if(idioma === 'turk'){
           alert('Fehler beim Mailversand. Wenn der Fehler weiterhin besteht, verwenden Sie die Links unten auf der Seite')
           }
        }
        else{
          
          if(idioma === 'es' || idioma === 'undefined' || idioma === 'null'){
            alert('El correo se envió correctamente')
            }
          if(idioma === 'en'){
            alert("The email was send successfully")
            }
          if(idioma === 'turk'){
            alert('Die Mail wurde erfolgreich versendet')
            }
          setEmail('')
          setTopic('')
          setMessage('')
        }
      })
    }
  }
  return (
    <div>
      <div className="card FormContainer container">
        <div className="card-body">
          <div className="SignTitle">
              {idioma === 'es' || idioma === 'undefined' || idioma === 'null'? 'Contacte con nosotros ':null}
              {idioma === 'en'? 'Contact with us ':null}
              {idioma === 'turk'? 'Kontaktiere uns':null} 
          </div>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="container "
          >
    
            <label>
              {idioma === 'es' || idioma === 'undefined' || idioma === 'null'? 'Tu correo ':null}
              {idioma === 'en'? 'Your email ':null}
              {idioma === 'turk'? 'Deine E-Mail':null}
              </label>
            <input className="Input" type="email" value = {email} onChange={(event) => {setEmail(event.target.value);setErrorEmail(true)}}/>
            <p className = 'error-message' hidden = {showErrorEmail}>
              {idioma === 'es' || idioma === 'undefined' || idioma === 'null'? 'Debes llenar el campo Correo':null}
              {idioma === 'en'? 'The Email field can not be empty ':null}
              {idioma === 'turk'? 'Sie müssen das Feld E-Mail ausfüllen':null}
            </p>

            <br />

            <label>
              {idioma === 'es' || idioma === 'undefined' || idioma === 'null'? 'Asunto ':null}
              {idioma === 'en'? 'Subject ':null}
              {idioma === 'turk'? 'Thema':null}
            </label>
            <input className="Input" type="text" value = {topic} onChange={(event) => {setTopic(event.target.value);setErrorTopic(true)}}/>
            <p className = 'error-message' hidden = {showErrorTopic}>
              {idioma === 'es' || idioma === 'undefined' || idioma === 'null'? 'Debes llenar el campo Asunto':null}
              {idioma === 'en'? 'The Topic field can not be empty ':null}
              {idioma === 'turk'? 'Sie müssen das Feld Betreff ausfüllen':null}
            </p>

            <br/>

            <label>
              {idioma === 'es' || idioma === 'undefined' || idioma === 'null'? 'Mensaje ':null}
              {idioma === 'en'? 'Message ':null}
              {idioma === 'turk'? 'Botschaft':null}
            </label>
            <textarea className="Input message" type="text" value = {message} onChange={(event) => {setMessage(event.target.value);setErrorMessage(true)}}></textarea>
            <p className = 'error-message' hidden = {showErrorMessage}>
              {idioma === 'es' || idioma === 'undefined' || idioma === 'null'? 'Debes llenar el campo Mensaje':null}
              {idioma === 'en'? 'The Message field can not be empty ':null}
              {idioma === 'turk'? 'Sie müssen das Feld Nachricht ausfüllen':null}
            </p>

            <br/>

            <button className="btn btn-primary FormButton" type="submit">
                {idioma === 'es' || idioma === 'undefined' || idioma === 'null'? 'Enviar ':null}
                {idioma === 'en'? 'Send ':null}
                {idioma === 'turk'? 'Einreichen':null}
            </button>
            {loading?<ProgresGif/>:null}
          </form>
        </div>
      </div>
    </div>
  );
}

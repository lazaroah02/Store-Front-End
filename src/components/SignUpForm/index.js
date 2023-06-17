import React, {useState, useContext} from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import register from "../../services/register";
import InfoUserContext from '../../context/InfoUserContext'

export default function SignUpForm() {
  const navigate = useNavigate();
  const {setInfoUser} = useContext(InfoUserContext)

  //error messages
  const [errorEmailExist, setErrorEmailExist] = useState(false)
  const [errorEmailWrong, setErrorEmailWrong] = useState(false)
  const [errorPasswordShort, setErrorPasswordShort] = useState(false)
  const [errorPasswordDontMatch, setErrorPasswordDontMatch] = useState(false)
  const [errorPasswordTooEasy, setErrorPasswrodTooEasy] = useState(false)
  const [errorPasswordNotNaN, setErrorPasswordNotNaN] = useState(false)

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target[0].value;
    const password1 = event.target[1].value;
    const password2 = event.target[2].value;

    //form's validation
    const badPass1 = '12345678'
    const badPass2 = '123456789'

    if(email.substring(email.length - 4,email.length) !== '.com'){
        setErrorEmailWrong(true)
    }
    else if(password1 !== password2){
        setErrorPasswordDontMatch(true)
    }
    else if(password1.length < 8){
        setErrorPasswordShort(true)
    }
    else if(password1 === badPass1 || password1 === badPass2){
        setErrorPasswrodTooEasy(true)
    }
    else if(password1.replace(/[^0-9]/g,"").length === password1.length){
      setErrorPasswordNotNaN(true)
    }
    else {
      register(email, password1, password2)
      .then((key) => {
        window.localStorage.setItem('SessionToken',key.key)
        setInfoUser({info:{}, token:key.key})
        navigate("/");
      })
      .catch(error => setErrorEmailExist(true))
    }
  }
  return (
    <div className = "RegisterContainer">
      <div className="card SignUpFormContainer container">
        <div className="card-body SignUpFormBody">
          <div className="SignUpTitle">
            <h4>Sign up to Bestore</h4>
          </div>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="container "
          >
            <label>Email</label>
            <br />
            <input className="SignUpInput" type="email" onChange={() => {
              setErrorEmailExist(false)
              setErrorEmailWrong(false)
              setErrorPasswordNotNaN(false)
            }}></input>
            {errorEmailWrong?
            <p className = 'error-message'>Enter a valid email address eg: email@example.com'</p>
            :null}
            {errorEmailExist?
            <p className = 'error-message'>The email already exist</p>
            :null}
            <br />
            <label>Password</label>
            <br />
            <input className="SignUpInput" type="password" onChange={() => {
              setErrorPasswordDontMatch(false)
              setErrorPasswordShort(false)
              setErrorPasswrodTooEasy(false)
              setErrorPasswordNotNaN(false)
            }}></input>
            {errorPasswordShort?
            <p className = 'error-message'>The password is too short</p>
            :null}
             {errorPasswordTooEasy?
            <p className = 'error-message'>The password is too easy</p>
            :null}
             {errorPasswordDontMatch?
            <p className = 'error-message'>The passwords dont match</p>
            :null}
            {errorPasswordNotNaN?
            <p className = 'error-message'>The passwords most contain numbers and letters</p>
            :null}

            <label>Confirm password</label>
            <br />
            <input className="SignUpInput" type="password" onChange={() => {
              setErrorPasswordDontMatch(false)
              setErrorPasswordShort(false)
              setErrorPasswrodTooEasy(false)
            }}></input>
            <button className="btn SignUpFormButton" type="submit">
              Register
            </button>
          </form>
          <div className="card SignUpFet">
            <p>
              <span className="SignUpSpan align-center">Have already an account?</span>
              <Link className="SignUpLink align-center" to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

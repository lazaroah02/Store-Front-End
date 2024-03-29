import React from "react";
import "./index.css";
import {Link, useNavigate} from 'react-router-dom'
import login from "../../services/login";


export default function SignInForm() {
  const setNavigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    login(email, password)
    .then((key) => {
      window.localStorage.setItem('SessionToken',key.key)
      setNavigate("/");
      window.location.reload();
    })
    .catch(error => alert(error));
  }

  return (
    <div className = "LoginContainer">
      <div className="card SignInFormContainer container">
        <div className="card-body SignInFormBody">
          <div className="SignInTitle">
            <h4>Sign in to Bestore</h4>
          </div>
          <form
            className="container "
            onSubmit={(event) => handleSubmit(event)}
          >
            <label>Email</label>
            <br />
            <input className="SignInInput" type="email"></input>
            <br />
            <label>Password</label>
            <a className="SignInForgotPasswordMessage" href="/">
              Forgot password?
            </a>
            <br />
            <input className="SignInInput" type="password"></input>
            <button className="btn SignInFormButton" type="submit">
              Enter
            </button>
          </form>
          <div className="card SignInFet">
            <p>
              <span className="SignInSpan align-center">Don't have an account?</span>
              <Link className="SignInLink align-center" to="/register">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

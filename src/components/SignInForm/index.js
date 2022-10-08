import React, {useContext} from "react";
import "./index.css";
import { Link, useLocation } from "wouter";
import login from "../../services/login";
import UserTokenContext from '../../context/UserTokenContext'


export default function SignInForm() {
  const [, setLocation] = useLocation();
  const {setToken} = useContext(UserTokenContext)

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    login(email, password)
    .then((key) => {
      window.localStorage.setItem('SessionToken',key.key)
      setToken(key.key)
      setLocation("/");
    })
    .catch(error => alert(error));
  }

  return (
    <div>
      <div className="card FormContainer container">
        <div class="card-body">
          <div className="SignTitle">
            <h4>Sign in to Store</h4>
          </div>
          <form
            className="container "
            onSubmit={(event) => handleSubmit(event)}
          >
            <label>Email</label>
            <br />
            <input className="Input" type="email"></input>
            <br />
            <label>Password</label>
            <a className="ForgotPasswordMessage" href="/">
              Forgot password?
            </a>
            <br />
            <input className="Input" type="password"></input>
            <button className="btn btn-primary FormButton" type="submit">
              Enter
            </button>
          </form>
          <div className="card LoginFet">
            <p>
              <span className="align-center">Dont have an account?</span>
              <Link className="SignUpLink align-center" to="/register">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import "./index.css";
import { Link, useLocation } from "wouter";
import register from "../../services/register";
import validateRegisterForm from '../../customHooks/validateRegisterForm'

export default function SignInForm() {
  const [, setLocation] = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target[0].value;
    const password1 = event.target[1].value;
    const password2 = event.target[2].value;

    const validation = validateRegisterForm(email, password1, password2)
    if(validation === true){
    register(email, password1, password2)
    .then((key) => {
      window.localStorage.setItem('SessionToken',key.key)
      setLocation("/");
    })
    .catch(error => alert(error))
    }else{alert(validation)}
  }
  return (
    <div>
      <div className="card FormContainer container">
        <div class="card-body">
          <div className="SignTitle">
            <h4>Sign up to Store</h4>
          </div>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="container "
          >
            <label>Email</label>
            <br />
            <input className="Input" type="email"></input>
            <br />
            <label>Password</label>
            <br />
            <input className="Input" type="password"></input>
            <label>Confirm password</label>
            <br />
            <input className="Input" type="password"></input>
            <button className="btn btn-primary FormButton" type="submit">
              Register
            </button>
          </form>
          <div className="card Fet">
            <p>
              <span className="align-center">Have already an account?</span>
              <Link className="SignInLink align-center" to="/login">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

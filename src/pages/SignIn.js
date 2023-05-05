import React from 'react';
import SignInForm from '../components/SignInForm'
import './pagesStyles/signIn.css'

export default function SignIn(){
    return (
        <div className = "sign-in-page">    
            <SignInForm/>
        </div>
    )
}
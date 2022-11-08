import React, {useContext, useEffect} from 'react';
import ContactForm from '../components/ContactForm'
import NavBar from '../components/NavBar'

export default function Contact(){

    return(
        <div>
            <NavBar/>
            <ContactForm/>
        </div>
    )
}
import React from 'react'
import EditInfoUserForm from '../EditInfoUserForm'
import NavBar from '../../../NavBar'
import OptionsNavBar from '../OptionsNavBar'
import './index.css'

export default function InfoUser(){
    return(
        <div className = 'info-user-dashboard'>
            <NavBar/>
            <OptionsNavBar/>
            <div>
                <EditInfoUserForm/>
            </div>
        </div>
    )
}
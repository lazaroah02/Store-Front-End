import React from 'react';
import ListItemsIcons from '../../assets/navBarIcons/list-items-icon.svg'
import LogoutLink from '../LogoutLink'
import {useMyNavigate} from '../../customHooks/useMyNavigate'
import './index.css'

function OtherOptionsOfNavbar() {
    const myNavigate = useMyNavigate()
    return ( 
        <div className="dropdown options-dropdown">
            <div className = "options-dropdown-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img alt = "cat" src = {ListItemsIcons}/>
                <div>Mas</div>
            </div>
            <ul className="dropdown-menu options-dropdown-menu">
                <li className="dropdown-item btn" onClick={() => myNavigate("/about-us")}>Acerca de nosotros</li>
                <li className="dropdown-item"><LogoutLink/></li>
            </ul>
        </div>
    );
}

export default OtherOptionsOfNavbar;
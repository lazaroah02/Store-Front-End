import React from 'react';
import ListItemsIcons from '../../assets/navBarIcons/list-items-icon.svg'
import './index.css'

function OtherOptionsOfNavbar() {
    return ( 
        <div className="dropdown options-dropdown">
            <div className = "options-dropdown-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img alt = "cat" src = {ListItemsIcons}/>
                <div>Mas</div>
            </div>
            <ul className="dropdown-menu options-dropdown-menu">
                <li className="dropdown-item">Action</li>
                <li className="dropdown-item">Another action</li>
                <li className="dropdown-item">Something else here</li>
            </ul>
        </div>
    );
}

export default OtherOptionsOfNavbar;
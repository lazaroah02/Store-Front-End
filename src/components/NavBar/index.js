import React, {useState, useEffect} from "react"
import PhoneNavBar from './PhoneNavBar'
import DesktopNavBar from './DesktopNavBar'
import './index.css'

export default function NavBar({startRef}){
    const [navBarToShow, setNavBarToShow] = useState("PhoneNavBar")

    useEffect(() =>{
        if(window.innerWidth >= 800)setNavBarToShow("DesktopNavBar")
    }, [])

    return(
        <>
            {navBarToShow === "DesktopNavBar"?<DesktopNavBar/>:<PhoneNavBar/>}
            <div className = "sub-bar" id = "top" ref = {startRef}></div>
        </>
    )
}
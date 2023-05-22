import React, {useState} from 'react'
import './index.css'
import UpArrow from '../../assets/up-arrow.svg'


export default function ButtonGoTop(){
    const [showButtonScrollTop, setShowButtonScrollTop] = useState(false)

    //function that focus on the start of the page
    function goTop(){
        window.scrollTo({top:0, left:0, behavior:"smooth"})
    }
    //function that detect when scroll is higher than x and show the button go top
    window.onscroll = function(){
        if(window.scrollY >= 100){
        setShowButtonScrollTop(true)
        }
        else{
        setShowButtonScrollTop(false)
        }
    }
    return(
        <div>
            {showButtonScrollTop?
            <button className = 'button-scroll-top' onClick={() => goTop()}><img alt = {"up arrow"} src = {UpArrow}/></button>
            :null}
        </div>
    )
}
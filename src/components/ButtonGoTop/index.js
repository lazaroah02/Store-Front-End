import React, {useState} from 'react'

export default function ButtonGoTop({reference}){
    const [showButtonScrollTop, setShowButtonScrollTop] = useState(false)

    //function that focus on the start of the page
    function goTop(){
        reference.current.scrollIntoView({behavior:"smooth", block:'center',inline:"center"})
    }
    //function that detect when scroll is higher than x and show the button go top
    window.onscroll = function(){
        if(window.scrollY >= 300){
        setShowButtonScrollTop(true)
        }
        else{
        setShowButtonScrollTop(false)
        }
    }
    return(
        <div>
            {showButtonScrollTop?
            <button className = 'btn btn-primary button-scroll-top' onClick={() => goTop()}><img alt = {"up arrow"} src = 'icons/up-arrow-alt-regular-24.png'/></button>
            :null}
        </div>
    )
}
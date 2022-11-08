import {URL_QUIT_USER_SELLER} from "../settings"

const key = localStorage.getItem('SessionToken')
const cok = document.cookie
const token = cok.substring(10,cok.length)

export default function quitUserSeller(){
    return(
        fetch(URL_QUIT_USER_SELLER,{
            method: 'POST',
            headers: {
                Authorization: `Token ${key}`,
                "X-CSRFToken": token,
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            return response
        })
    )
}
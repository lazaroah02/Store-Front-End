import {URL_CONTACT} from "../settings"

const cok = document.cookie
const token = cok.substring(10,cok.length)

export default function sendEmail(info){
    return(
        fetch(`${URL_CONTACT}`,{
            method: 'POST',
            headers: {
                "X-CSRFToken": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:info.email, 
                topic:info.topic,
                message:info.message,
            })
        })
         .then(response => {return response})

    )
}
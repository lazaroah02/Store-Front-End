import {URL_CREATE_CATEGORY} from "../settings"

const key = localStorage.getItem('SessionToken')
const cok = document.cookie
const token = cok.substring(10,cok.length)

export default function createNewCategory(nombre = ''){
    return(
        fetch(URL_CREATE_CATEGORY,{
            method: 'POST',
            headers: {
                Authorization: `Token ${key}`,
                "X-CSRFToken": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: nombre,
            })
        })
        .then(response => {
            return response
        })
    )
}